import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);
export default function Magnetic({ children, className = "" }) {
  const root = useRef(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const element = root.current.firstElementChild;
          const xTo = gsap.quickTo(element, "x", {
            duration: 0.55,
            ease: "power3.out",
          });
          const yTo = gsap.quickTo(element, "y", {
            duration: 0.55,
            ease: "power3.out",
          });
          const move = (event) => {
            const rect = root.current.getBoundingClientRect();
            xTo((event.clientX - rect.left - rect.width / 2) * 0.2);
            yTo((event.clientY - rect.top - rect.height / 2) * 0.2);
          };
          const reset = () => {
            xTo(0);
            yTo(0);
          };
          const target = root.current;
          target.addEventListener("pointermove", move);
          target.addEventListener("pointerleave", reset);
          target.addEventListener("focusout", reset);
          return () => {
            target.removeEventListener("pointermove", move);
            target.removeEventListener("pointerleave", reset);
            target.removeEventListener("focusout", reset);
          };
        },
      );
      return () => media.revert();
    },
    { scope: root },
  );
  return (
    <span ref={root} className={`magnetic ${className}`}>
      {children}
    </span>
  );
}
