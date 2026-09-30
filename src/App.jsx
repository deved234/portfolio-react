import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import IntroLoader from "./components/motion/IntroLoader";
import SiteFooter from "./components/SiteFooter";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Project from "./pages/Project";
import NotFound from "./pages/NotFound";
import { projects } from "./data/projects";
import useReducedMotion from "./hooks/useReducedMotion";
import useSmoothScroll from "./hooks/useSmoothScroll";
import "./site.css";
import { updateSeo } from "./data/seo.js";
const useClientLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;
gsap.registerPlugin(useGSAP, ScrollTrigger);
const introKey = "david-portfolio:intro:v2";
const positions = new Map();
function needsIntro() {
  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    location.hash
  )
    return false;
  try {
    return sessionStorage.getItem(introKey) !== "seen";
  } catch {
    return true;
  }
}
export default function App() {
  const [loading, setLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
    if (!needsIntro()) setLoading(false);
  }, []);
  const reduced = useReducedMotion(),
    location = useLocation(),
    navigationType = useNavigationType();
  useSmoothScroll(reduced, location.key, loading);
  const root = useRef(null),
    curtain = useRef(null),
    first = useRef(true),
    lastPath = useRef(location.pathname);
  const contact = location.pathname === "/contact";
  const project = projects.find(
    (p) => location.pathname === `/projects/${p.slug}`,
  );
  const pageName =
    project?.name ||
    { "/": "Home", "/about": "About", "/contact": "Contact" }[
      location.pathname
    ] ||
    "Page not found";
  const completeIntro = useCallback(() => {
    try {
      sessionStorage.setItem(introKey, "seen");
    } catch {}
    setLoading(false);
  }, []);
  useEffect(() => {
    if (reduced && loading) completeIntro();
  }, [reduced, loading, completeIntro]);
  useEffect(() => {
    if (!loading) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
    };
  }, [loading]);
  useEffect(() => {
    updateSeo(location.pathname);
  }, [location.pathname]);
  useClientLayoutEffect(() => {
    const old = history.scrollRestoration;
    history.scrollRestoration = "manual";
    return () => {
      history.scrollRestoration = old;
    };
  }, []);
  useClientLayoutEffect(() => {
    const restore = navigationType === "POP" && positions.has(location.key);
    if (restore)
      window.scrollTo({
        top: positions.get(location.key),
        behavior: "instant",
      });
    else if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "instant" });
        target.tabIndex = -1;
        target.focus({ preventScroll: true });
      }
    } else window.scrollTo({ top: 0, behavior: "instant" });
    if (!first.current && !location.hash) {
      const heading = root.current?.querySelector("h1");
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
    }
    first.current = false;
    const record = () => positions.set(location.key, window.scrollY);
    window.addEventListener("scroll", record, { passive: true });
    return () => window.removeEventListener("scroll", record);
  }, [location.key, navigationType]);
  useGSAP(
    () => {
      if (loading || reduced) return;
      gsap.utils.toArray("[data-reveal]").forEach((el) =>
        gsap.fromTo(
          el,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            clearProps: "all",
            scrollTrigger: { trigger: el, start: "top 94%", once: true },
          },
        ),
      );
      if (lastPath.current !== location.pathname)
        gsap.fromTo(
          curtain.current,
          { yPercent: 0 },
          { yPercent: -115, duration: 0.8, ease: "power4.inOut", delay: 0.12 },
        );
      lastPath.current = location.pathname;
      const observer = new ResizeObserver(() => ScrollTrigger.refresh());
      observer.observe(root.current);
      return () => observer.disconnect();
    },
    {
      scope: root,
      dependencies: [location.pathname, loading, reduced],
      revertOnUpdate: true,
    },
  );
  return (
    <>
      {loading && <IntroLoader onComplete={completeIntro} />}
      <div
        ref={root}
        inert={loading && hydrated ? "" : undefined}
        className={contact ? "dark-page" : ""}
      >
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<Home ready={!loading} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects/:slug" element={<Project />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <SiteFooter compact={contact} />
        <div ref={curtain} className="page-curtain" aria-hidden="true">
          <span>• {pageName}</span>
        </div>
      </div>
    </>
  );
}
