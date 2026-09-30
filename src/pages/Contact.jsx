import { useState } from "react";
import { profile } from "../data/profile";
import Magnetic from "../components/motion/Magnetic";
export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  async function submit(event) {
    event.preventDefault();
    if (status === "submitting") return;
    const form = event.currentTarget;
    setStatus("submitting");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
        signal: AbortSignal.timeout(15000),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(
          data.error ||
            "Your message could not be sent. Please email me directly.",
        );
      setStatus("success");
      setMessage("Thanks for reaching out. Your message has been sent.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error.name === "TimeoutError"
          ? "The request timed out. Please try again or email me directly."
          : error.message.startsWith("Unexpected")
            ? "The form is not available here yet. Please email me directly or use WhatsApp."
            : error.message,
      );
    }
  }
  return (
    <article className="contact-page">
      <div className="section-shell">
        <header className="contact-heading">
          <h1 data-reveal>
            Let’s start a<br />
            conversation.
          </h1>
          <img src={profile.photo} alt="David Atef" width="120" height="120" />
        </header>
        <div className="contact-layout">
          <form
            onSubmit={submit}
            className="contact-form"
            aria-label="Contact David"
          >
            <div className="form-row">
              <span>01</span>
              <div>
                <label htmlFor="contact-name">What’s your name?</label>
                <input
                  id="contact-name"
                  name="name"
                  placeholder="Your name *"
                  autoComplete="name"
                  required
                  maxLength={100}
                />
              </div>
            </div>
            <div className="form-row">
              <span>02</span>
              <div>
                <label htmlFor="contact-email">What’s your email?</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="you@example.com *"
                  autoComplete="email"
                  required
                  maxLength={254}
                />
              </div>
            </div>
            <div className="form-row">
              <span>03</span>
              <div>
                <label htmlFor="contact-company">Who do you represent?</label>
                <input
                  id="contact-company"
                  name="company"
                  placeholder="Company or organisation (optional)"
                  autoComplete="organization"
                  maxLength={150}
                />
              </div>
            </div>
            <div className="form-row">
              <span>04</span>
              <div>
                <label htmlFor="contact-service">How can I help?</label>
                <select
                  id="contact-service"
                  name="service"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Select an opportunity *
                  </option>
                  <option>Full-time role</option>
                  <option>Contract / Freelance</option>
                  <option>Frontend development</option>
                  <option>Something else</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <span>05</span>
              <div>
                <label htmlFor="contact-message">Your message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell me a little about the opportunity… *"
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={4}
                />
              </div>
            </div>
            <div className="honeypot" aria-hidden="true">
              <label htmlFor="contact-website">Leave this empty</label>
              <input
                id="contact-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <div className="send-row">
              <p
                className={`form-status ${status}`}
                role="status"
                aria-live="polite"
              >
                {message}
              </p>
              <Magnetic>
                <button
                  className="circle-button blue"
                  disabled={status === "submitting"}
                  type="submit"
                >
                  {status === "submitting" ? "Sending…" : "Send message ↗"}
                </button>
              </Magnetic>
            </div>
            <p className="form-note">
              Prefer email?{" "}
              <a href={`mailto:${profile.email}`}>Write to me directly ↗</a>
            </p>
          </form>
          <aside className="contact-aside">
            <span className="large-arrow" aria-hidden="true">
              ↙
            </span>
            <div>
              <h2 className="eyebrow">Contact details</h2>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href={profile.phoneHref}>{profile.phone}</a>
              <a href={profile.whatsapp} target="_blank" rel="noreferrer">
                WhatsApp ↗
              </a>
            </div>
            <div>
              <h2 className="eyebrow">Based in</h2>
              <p>{profile.location}</p>
              <p>Remote & on-site</p>
              <p>Open to relocation</p>
            </div>
            <div>
              <h2 className="eyebrow">Socials</h2>
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
