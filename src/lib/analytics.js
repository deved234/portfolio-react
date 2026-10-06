export const measurementId = import.meta.env?.VITE_GA_MEASUREMENT_ID || "G-8CF6F9426E";
export const consentKey = "david-portfolio:analytics-consent:v1";
const productionHost = "portfolio-react-theta-hazel-94.vercel.app";

// Public campaign labels only; arbitrary query parameters never reach Analytics.
export function readCampaign(url) {
  const fields = {
    utm_source: "campaign_source",
    utm_medium: "campaign_medium",
    utm_campaign: "campaign_name",
    utm_content: "campaign_content",
    utm_term: "campaign_term",
    utm_id: "campaign_id",
  };
  let parameters;
  try { parameters = new URL(url).searchParams; } catch { return {}; }
  const campaign = {};
  for (const [query, field] of Object.entries(fields)) {
    const value = parameters.get(query)?.trim();
    if (value && /^[\p{L}\p{N}][\p{L}\p{N}._ -]{0,99}$/u.test(value)
      && !/^[\d .()-]{7,}$/.test(value)) campaign[field] = value;
  }
  return campaign;
}

// Keep tracking isolated from React renders, StrictMode and server rendering.
export function createAnalytics(win, doc, id, enabled) {
  let active = false;
  let initialized = false;
  let lastPage = null;
  // Capture the entry campaign before consent or SPA navigation changes the URL.
  const entryCampaign = readCampaign(win.location.href);
  const cleanUrl = (value) => {
    try {
      const url = new URL(value, win.location.origin);
      return `${url.origin}${url.pathname}`;
    } catch { return ""; }
  };
  function event(name, parameters = {}) {
    if (!enabled || !active) return;
    win.gtag("event", name, { ...parameters, send_to: id });
  }
  function page() {
    if (!enabled || !active) return;
    const url = cleanUrl(win.location.href);
    if (lastPage === url) return;
    const referrer = lastPage || cleanUrl(doc.referrer);
    event("page_view", {
      page_location: url,
      page_title: doc.title,
      page_referrer: referrer,
    });
    lastPage = url;
  }
  function start() {
    if (!enabled || active || !/^G-[A-Z0-9]+$/.test(id)) return;
    win[`ga-disable-${id}`] = false;
    win.dataLayer = win.dataLayer || [];
    win.gtag = win.gtag || function () { win.dataLayer.push(arguments); };
    if (!initialized) {
      win.gtag("consent", "default", {
        analytics_storage: "denied", ad_storage: "denied",
        ad_user_data: "denied", ad_personalization: "denied",
      });
      win.gtag("js", new Date());
      win.gtag("config", id, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        page_location: cleanUrl(win.location.href),
        page_referrer: cleanUrl(doc.referrer),
        ...entryCampaign,
      });
      const script = doc.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      doc.head.appendChild(script);
      initialized = true;
    }
    win.gtag("consent", "update", { analytics_storage: "granted" });
    active = true;
    page();
  }
  function stop() {
    active = false;
    lastPage = null;
    win[`ga-disable-${id}`] = true;
    if (initialized) win.gtag("consent", "update", { analytics_storage: "denied" });
    for (const cookie of doc.cookie.split(";")) {
      const name = cookie.trim().split("=")[0];
      if (!/^_ga(?:_|$)/.test(name)) continue;
      for (const domain of ["", win.location.hostname, `.${win.location.hostname}`]) {
        doc.cookie = `${name}=; Max-Age=0; Path=/;${domain ? ` Domain=${domain};` : ""}`;
      }
    }
  }
  return { start, stop, page, event };
}

let tracker;
function getTracker() {
  if (typeof window === "undefined") return null;
  return tracker ||= createAnalytics(window, document, measurementId,
    window.location.hostname === productionHost && document.documentElement.dataset.preview !== "true");
}
export function trackPage() { getTracker()?.page(); }
export function trackEvent(name, parameters) { getTracker()?.event(name, parameters); }
export function setAnalyticsConsent(accepted) {
  try { localStorage.setItem(consentKey, accepted ? "accepted" : "rejected"); } catch {}
  if (accepted) getTracker()?.start();
  else getTracker()?.stop();
}
export function readAnalyticsConsent() {
  try {
    const choice = localStorage.getItem(consentKey);
    return choice === "accepted" || choice === "rejected" ? choice : null;
  } catch { return null; }
}

// Classify public links; never send form values, emails or phone numbers.
export function classifyLink(href, pathname, origin) {
  if (href.startsWith("mailto:")) return ["contact_click", { method: "email" }];
  if (href.startsWith("tel:")) return ["contact_click", { method: "phone" }];
  let url;
  try { url = new URL(href, origin); } catch { return null; }
  if (!/^https?:$/.test(url.protocol)) return null;
  if (url.origin === origin && url.pathname === "/documents/David-Atef-CV.pdf")
    return ["cv_download", { file_name: "David-Atef-CV.pdf" }];
  if (url.hostname === "wa.me") return ["contact_click", { method: "whatsapp" }];
  const project = pathname.match(/^\/projects\/([a-z0-9-]+)$/)?.[1];
  if (project && url.origin !== origin)
    return ["project_link_click", { project_slug: project, link_type: url.hostname === "github.com" ? "source" : "live" }];
  if (["github.com", "www.linkedin.com", "linkedin.com"].includes(url.hostname))
    return ["social_click", { platform: url.hostname === "github.com" ? "github" : "linkedin" }];
  return null;
}
