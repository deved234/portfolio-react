import { Link } from "react-router-dom";
import {
  Code2,
  Palette,
  Database,
  ListChecks,
  GitBranch,
  ArrowUpRight,
} from "lucide-react";
import { projects } from "../data/projects";
import "./Toolkit.css";

const core = [
  {
    name: "React",
    mark: "Re",
    description: "Reusable components and connected interfaces.",
    slug: "luxe-retail",
  },
  {
    name: "Next.js",
    mark: "N",
    description: "Multi-page applications with the App Router.",
    slug: "shopzone",
  },
  {
    name: "JavaScript",
    mark: "JS",
    description: "The language behind my application logic and interactions.",
    slug: "gaming-hub",
  },
];
const groups = [
  {
    title: "Frontend foundations",
    icon: Code2,
    tools: ["HTML", "CSS", "React Router"],
    proof: [
      ["medinest", "Semantic HTML and responsive CSS."],
      ["speak-english", "Page navigation with React Router."],
    ],
  },
  {
    title: "Styling & motion",
    icon: Palette,
    tools: ["Tailwind CSS", "GSAP"],
    proof: [
      ["luxe-retail", "Responsive styling and animated shopping interfaces."],
    ],
  },
  {
    title: "State & API integration",
    icon: Database,
    tools: ["Zustand", "TanStack Query", "Redux Toolkit", "Axios", "REST APIs"],
    proof: [
      ["luxe-retail", "Zustand for cart state; TanStack Query for API data."],
      [
        "saint-george-market",
        "Redux Toolkit state and API integration with Axios.",
      ],
    ],
  },
  {
    title: "Forms & localisation",
    icon: ListChecks,
    tools: ["React Hook Form", "Zod", "next-intl"],
    proof: [
      [
        "shopzone",
        "Validated forms and Arabic / English interfaces with RTL support.",
      ],
    ],
  },
  {
    title: "Development & delivery",
    icon: GitBranch,
    tools: ["Git", "GitHub", "Vite", "Vercel"],
    proof: [
      [
        "luxe-retail",
        "A Vite application with source on GitHub and a live Vercel deployment.",
      ],
    ],
  },
];
function ProjectLink({ slug, children }) {
  const project = projects.find((item) => item.slug === slug);
  return (
    <Link to={`/projects/${slug}`} className="toolkit-proof">
      <span>
        {project.name}
        <ArrowUpRight size={15} aria-hidden="true" />
      </span>
      {children && <p>{children}</p>}
    </Link>
  );
}
export default function Toolkit() {
  return (
    <section
      id="toolkit"
      className="toolkit section-shell"
      aria-labelledby="toolkit-heading"
    >
      <div className="toolkit-heading" data-reveal>
        <div>
          <p className="eyebrow">The tools behind the work</p>
          <h2 id="toolkit-heading">
            My development
            <br />
            toolkit.
          </h2>
        </div>
        <p>
          Focused on React, Next.js and JavaScript. Explore the tools I use, and
          the projects where I put them to work.
        </p>
      </div>
      <div className="toolkit-core">
        {core.map((tool) => (
          <article key={tool.name} data-reveal>
            <span className="toolkit-mark" aria-hidden="true">
              {tool.mark}
            </span>
            <h3>{tool.name}</h3>
            <p>{tool.description}</p>
            <ProjectLink slug={tool.slug} />
          </article>
        ))}
      </div>
      <div className="toolkit-groups">
        {groups.map(({ title, icon: Icon, tools, proof }, index) => (
          <article className="toolkit-group" key={title}>
            <div className="toolkit-group-title">
              <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
              <h3>{title}</h3>
              <span aria-hidden="true">0{index + 1}</span>
            </div>
            <ul className="toolkit-tools" aria-label={`${title} technologies`}>
              {tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
            <div className="toolkit-evidence">
              {proof.map(([slug, copy]) => (
                <ProjectLink key={slug} slug={slug}>
                  {copy}
                </ProjectLink>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
