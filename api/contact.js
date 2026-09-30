// Best-effort per-instance throttling; use host firewall rate limits across instances.
const attempts = new Map();
// Server-only handler. Vercel discovers /api functions automatically.
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }
  const origin = req.headers.origin;
  const local =
    /^(127\.0\.0\.1|localhost)(:\d+)?$/.test(req.headers.host || "") &&
    process.env.NODE_ENV !== "production";
  const host =
    process.env.CONTACT_ORIGIN ||
    `${local ? "http" : "https"}://${req.headers.host}`;
  if (origin && origin !== host)
    return res.status(403).json({ error: "This request is not allowed." });
  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: "Invalid request." });
  }
  if (!body || typeof body !== "object" || JSON.stringify(body).length > 12000)
    return res.status(400).json({ error: "Invalid request." });
  if (body.website)
    return res
      .status(400)
      .json({ error: "Please leave the website field empty." });
  const clean = (key) =>
    typeof body[key] === "string" ? body[key].trim() : "";
  const name = clean("name"),
    email = clean("email"),
    company = clean("company"),
    service = clean("service"),
    message = clean("message");
  if (
    !name ||
    name.length > 100 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 254 ||
    company.length > 150 ||
    ![
      "Full-time role",
      "Contract / Freelance",
      "Frontend development",
      "Something else",
    ].includes(service) ||
    message.length < 10 ||
    message.length > 5000
  )
    return res
      .status(400)
      .json({
        error: "Please check your name, email, opportunity and message.",
      });
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM)
    return res
      .status(503)
      .json({
        error:
          "Online sending is not connected yet. Please email deved.tefa123456@gmail.com or use WhatsApp.",
      });
  const now = Date.now();
  for (const [key, record] of attempts)
    if (record.until < now) attempts.delete(key);
  const ip =
    req.headers["x-vercel-forwarded-for"] ||
    req.socket?.remoteAddress ||
    "unknown";
  const record = attempts.get(ip) || { count: 0, until: now + 600000 };
  if (record.count >= 3 || attempts.size > 5000) {
    res.setHeader("Retry-After", "600");
    return res
      .status(429)
      .json({
        error: "Please wait a few minutes before sending another message.",
      });
  }
  record.count++;
  attempts.set(ip, record);
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM,
        to: [process.env.CONTACT_TO || "deved.tefa123456@gmail.com"],
        reply_to: email,
        subject: `Portfolio enquiry: ${service}`,
        text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "Not provided"}\nOpportunity: ${service}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok)
      return res
        .status(502)
        .json({
          error:
            "The email service could not accept your message. Please try again or email me directly.",
        });
    const accepted = await response.json();
    if (!accepted.id)
      return res
        .status(502)
        .json({
          error: "Delivery could not be confirmed. Please email me directly.",
        });
    return res.status(200).json({ ok: true });
  } catch {
    return res
      .status(502)
      .json({
        error:
          "The email service is temporarily unavailable. Please email me directly.",
      });
  }
}
