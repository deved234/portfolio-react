import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./IntroLoader.module.css";
const greetings = ["Hello", "Bonjour", "Ciao", "Olá", "Hallo", "مرحبًا"];
export default function IntroLoader({ onComplete }) {
  const root = useRef(null);
  const word = useRef(null);
  useGSAP(
    () => {
      const timeline = gsap.timeline({ onComplete });
      greetings.forEach((greeting, index) => {
        timeline.set(
          word.current,
          { textContent: greeting },
          index === 0 ? 0 : 0.5 + index * 0.16,
        );
      });
      timeline
        .to(word.current, { opacity: 0, duration: 0.18 }, 1.55)
        .to(
          root.current,
          { yPercent: -115, duration: 0.95, ease: "power4.inOut" },
          1.6,
        );
      const fallback = window.setTimeout(onComplete, 4000);
      return () => window.clearTimeout(fallback);
    },
    { scope: root },
  );
  return (
    <div ref={root} data-intro className={styles.loader} aria-hidden="true">
      <span className={styles.greeting}>
        <i />
        <span ref={word}>Hello</span>
      </span>
    </div>
  );
}
