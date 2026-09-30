import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { profile } from "../data/profile";
import useReducedMotion from "../hooks/useReducedMotion";
import styles from "./Hero.module.css";

function Globe() {
  return (
    <svg
      viewBox="0 0 50 50"
      fill="none"
      aria-hidden="true"
      className={styles.globe}
    >
      <circle cx="25" cy="25" r="21" />
      <ellipse className={styles.meridian} cx="25" cy="25" rx="11" ry="21" />
      <path d="M4 25h42M7 14c12 6 24 6 36 0M7 36c12-6 24-6 36 0" />
    </svg>
  );
}

export default function Hero({ ready }) {
  const root = useRef(null);
  const track = useRef(null);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  useGSAP(
    () => {
      if (!ready || reduced) return;
      gsap.from("[data-hero-reveal]", {
        y: 30,
        opacity: 0,
        duration: 1.05,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "all",
      });
    },
    { scope: root, dependencies: [ready, reduced], revertOnUpdate: true },
  );
  useGSAP(
    () => {
      if (!ready || reduced || paused) return;
      const element = track.current;
      const setX = gsap.quickSetter(element, "x", "px");
      let width = element.firstElementChild.getBoundingClientRect().width;
      let position = 0;
      let previousScroll = window.scrollY;
      let direction = -1;
      let inView = true;
      const resize = new ResizeObserver(() => {
        width = element.firstElementChild.getBoundingClientRect().width;
      });
      resize.observe(element.firstElementChild);
      const observer = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
      });
      observer.observe(root.current);
      const onScroll = () => {
        const current = window.scrollY;
        if (Math.abs(current - previousScroll) > 2)
          direction = current > previousScroll ? -1 : 1;
        previousScroll = current;
      };
      const tick = (_time, delta) => {
        if (!inView || document.hidden || !width) return;
        position += direction * Math.min(delta, 40) * 0.05;
        position = ((position % width) - width) % width;
        setX(position);
      };
      gsap.ticker.add(tick);
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        gsap.ticker.remove(tick);
        window.removeEventListener("scroll", onScroll);
        resize.disconnect();
        observer.disconnect();
        setX(0);
      };
    },
    {
      scope: root,
      dependencies: [ready, reduced, paused],
      revertOnUpdate: true,
    },
  );
  return (
    <section
      ref={root}
      id="home"
      className={`${styles.hero} ${paused || reduced ? styles.paused : ""}`}
      aria-labelledby="hero-title"
    >
      <img
        className={styles.portrait}
        src={profile.photo}
        alt="David Atef"
        width="1084"
        height="1301"
        fetchpriority="high"
      />
      <div className={styles.location} data-hero-reveal>
        <span>
          Located
          <br />
          in Egypt
        </span>
        <span className={styles.globeDisk}>
          <Globe />
        </span>
      </div>
      <div className={styles.role} data-hero-reveal>
        <svg
          className={styles.arrow}
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden="true"
        >
          <path d="M5 5l22 22M10 27h17V10" />
        </svg>
        <p>
          {profile.title}
          <br />
          {profile.specialty}
        </p>
      </div>
      <h1 id="hero-title" className="sr-only">
        {profile.name} — {profile.title}, {profile.specialty}
      </h1>
      <div className={styles.marquee} aria-hidden="true">
        <div ref={track} className={styles.track}>
          {[0, 1, 2].map((index) => (
            <span key={index}>
              {profile.name}
              <span className={styles.dash}> — </span>
            </span>
          ))}
        </div>
      </div>
      <span className={styles.mobileGlobe}>
        <Globe />
      </span>
      <div className={styles.bottom}>
        <span>Based in {profile.location}</span>
        {!reduced && (
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-pressed={paused}
            className={styles.motionToggle}
          >
            <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>{" "}
            {paused ? "Resume motion" : "Pause motion"}
          </button>
        )}
      </div>
    </section>
  );
}
