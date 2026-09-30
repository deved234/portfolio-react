import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LayoutGrid, List } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { projects } from "../data/projects";
import ProjectMedia from "./ProjectMedia";
import useReducedMotion from "../hooks/useReducedMotion";

const filters = ["All", "React", "Next.js", "HTML / CSS"];
function stored(key, fallback) {
  try {
    const value = sessionStorage.getItem(key);
    const allowed = key === "work-filter" ? filters : ["list", "grid"];
    return allowed.includes(value) ? value : fallback;
  } catch {
    return fallback;
  }
}
export default function Work() {
  const [filter, setFilter] = useState(() => stored("work-filter", "All"));
  const [view, setView] = useState(() => stored("work-view", "list"));
  const [hovered, setHovered] = useState(null);
  const root = useRef(null),
    preview = useRef(null),
    move = useRef(null);
  const reduced = useReducedMotion();
  const visible = projects.filter(
    (p) => filter === "All" || p.category === filter,
  );
  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        "[data-work-item]",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.04, clearProps: "all" },
      );
    },
    {
      scope: root,
      dependencies: [filter, view, reduced],
      revertOnUpdate: true,
    },
  );
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const x = gsap.quickTo(preview.current, "x", {
            duration: 0.35,
            ease: "power3.out",
          });
          const y = gsap.quickTo(preview.current, "y", {
            duration: 0.35,
            ease: "power3.out",
          });
          move.current = (event) => {
            x(Math.max(175, Math.min(innerWidth - 175, event.clientX)));
            y(Math.max(150, Math.min(innerHeight - 150, event.clientY)));
          };
          return () => {
            move.current = null;
          };
        },
      );
      return () => media.revert();
    },
    { scope: root },
  );
  function choose(key, value, setter) {
    setter(value);
    setHovered(null);
    try {
      sessionStorage.setItem(key, value);
    } catch {}
  }
  return (
    <section
      id="work"
      className="work section-shell"
      ref={root}
      aria-labelledby="work-heading"
    >
      <div className="work-heading">
        <p className="eyebrow">Selected work / All projects</p>
        <h2 id="work-heading">Built with purpose.</h2>
      </div>
      <div className="work-controls">
        <div className="filters" aria-label="Filter projects">
          {filters.map((f) => (
            <button
              key={f}
              className={`pill ${filter === f ? "selected" : ""}`}
              aria-pressed={filter === f}
              onClick={() => choose("work-filter", f, setFilter)}
            >
              {f}
              <sup>
                {f === "All"
                  ? projects.length
                  : projects.filter((p) => p.category === f).length}
              </sup>
            </button>
          ))}
        </div>
        <div className="view-switch" aria-label="Project layout">
          {[
            ["list", List],
            ["grid", LayoutGrid],
          ].map(([v, Icon]) => (
            <button
              className={`pill ${view === v ? "selected" : ""}`}
              key={v}
              aria-label={`${v === "list" ? "List" : "Grid"} view`}
              aria-pressed={view === v}
              onClick={() => choose("work-view", v, setView)}
            >
              <Icon size={21} />
            </button>
          ))}
        </div>
      </div>
      <p className="sr-only" role="status">
        Showing {visible.length} projects
      </p>
      <div
        className={`work-items ${view}`}
        onPointerLeave={() => setHovered(null)}
      >
        {view === "list" && (
          <div className="work-columns">
            <span>Project</span>
            <span>Role</span>
            <span>Frontend stack</span>
            <span />
          </div>
        )}
        {visible.map((p) => (
          <Link
            key={p.slug}
            to={`/projects/${p.slug}`}
            className="work-item"
            data-work-item
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse" && move.current) {
                move.current(event);
                setHovered(p);
              }
            }}
            onPointerMove={(event) => move.current?.(event)}
            onClick={() => setHovered(null)}
            onBlur={() => setHovered(null)}
          >
            <div className="work-image">
              <ProjectMedia project={p} />
              <span className="view-badge">View project ↗</span>
            </div>
            <h3>{p.name}</h3>
            <span className="work-role">{p.role}</span>
            <span className="work-stack">{p.category}</span>
            <span className="work-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        ))}
      </div>
      <div
        ref={preview}
        aria-hidden="true"
        className={`cursor-preview ${hovered && view === "list" ? "visible" : ""}`}
      >
        {hovered && (
          <>
            <ProjectMedia project={hovered} />
            <span>View</span>
          </>
        )}
      </div>
      <div className="work-end">
        <span>Different projects. The same attention to detail.</span>
        <a
          href="https://github.com/deved234"
          target="_blank"
          rel="noreferrer"
          className="text-link"
        >
          Explore GitHub ↗
        </a>
      </div>
    </section>
  );
}
