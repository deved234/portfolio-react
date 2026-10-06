import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { classifyLink, readAnalyticsConsent, setAnalyticsConsent, trackEvent } from "../lib/analytics.js";
import "./AnalyticsConsent.css";

export default function AnalyticsConsent({ ready }) {
  const [choice, setChoice] = useState(undefined);
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    const saved = readAnalyticsConsent();
    setChoice(saved);
    if (saved) setAnalyticsConsent(saved === "accepted");
    const open = () => setEditing(true);
    const sync = (event) => {
      if (event.key !== "david-portfolio:analytics-consent:v1") return;
      const next = readAnalyticsConsent();
      setChoice(next);
      setAnalyticsConsent(next === "accepted");
    };
    const click = (event) => {
      const link = event.target.closest?.("a[href]");
      if (!link) return;
      const result = classifyLink(link.getAttribute("href"), window.location.pathname, window.location.origin);
      if (result) trackEvent(...result);
    };
    window.addEventListener("portfolio:analytics-settings", open);
    window.addEventListener("storage", sync);
    document.addEventListener("click", click, true);
    return () => {
      window.removeEventListener("portfolio:analytics-settings", open);
      window.removeEventListener("storage", sync);
      document.removeEventListener("click", click, true);
    };
  }, []);
  function choose(accepted) {
    setAnalyticsConsent(accepted);
    setChoice(accepted ? "accepted" : "rejected");
    setEditing(false);
  }
  if (!ready || choice === undefined || (choice !== null && !editing)) return null;
  return (
    <section className="analytics-consent" aria-label="Analytics preferences">
      <div>
        <h2>A little insight, with your permission.</h2>
        <p>I use Google Analytics to understand visits and improve this portfolio. Optional analytics cookies only load if you accept. <Link to="/privacy">Privacy policy ↗</Link></p>
      </div>
      <div className="analytics-actions">
        <button type="button" onClick={() => choose(false)}>Reject analytics</button>
        <button type="button" className="analytics-accept" onClick={() => choose(true)}>Accept analytics</button>
      </div>
    </section>
  );
}
