import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Magnetic from "./motion/Magnetic";
import { profile } from "../data/profile";
export default function SiteFooter({ compact = false }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Africa/Cairo",
          timeZoneName: "short",
        }).format(new Date()),
      );
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);
  return (
    <footer className={`site-footer ${compact ? "compact" : ""}`}>
      {!compact && (
        <div className="footer-main section-shell">
          <h2>
            <img
              src={profile.photo}
              alt=""
              width="85"
              height="85"
              loading="lazy"
            />
            Let’s work
            <br />
            together<span aria-hidden="true">↘</span>
          </h2>
          <div className="footer-rule">
            <Magnetic>
              <Link className="circle-button blue" to="/contact">
                Get in touch
              </Link>
            </Magnetic>
          </div>
          <div className="footer-contact">
            <Magnetic>
              <a className="pill" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </Magnetic>
            <Magnetic>
              <a className="pill" href={profile.phoneHref}>
                {profile.phone}
              </a>
            </Magnetic>
          </div>
        </div>
      )}
      <div className="footer-bottom">
        <div>
          <span className="eyebrow">Version</span>
          <p>{new Date().getFullYear()} © David Atef</p>
        </div>
        <div>
          <span className="eyebrow">Local time · Egypt</span>
          <p>{time}</p>
        </div>
        <div className="footer-social">
          <span className="eyebrow">Socials</span>
          <div>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a href={profile.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
