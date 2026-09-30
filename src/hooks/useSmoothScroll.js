import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";
export default function useSmoothScroll(reduced, key, loading) {
  useEffect(() => {
    if (
      reduced ||
      loading ||
      !matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.05,
      syncTouch: false,
      anchors: true,
      prevent: (node) => node.closest?.("dialog, textarea, select"),
    });
    lenis.on("scroll", ScrollTrigger.update);
    const sync = () => {
      if (document.body.style.overflow === "hidden") lenis.stop();
      else lenis.start();
    };
    const observer = new MutationObserver(sync);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });
    sync();
    return () => {
      observer.disconnect();
      lenis.destroy();
    };
  }, [reduced, key, loading]);
}
