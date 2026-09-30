import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";
import ProjectMedia from "../components/ProjectMedia";
import NotFound from "./NotFound";
export default function Project() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) return <NotFound />;
  const project = projects[index],
    next = projects[(index + 1) % projects.length];
  return (
    <article className="project-page">
      <header className="page-heading section-shell">
        <Link to="/#work" className="text-link">
          ← All projects
        </Link>
        <h1 data-reveal>{project.name}</h1>
        <div className="project-meta">
          <div>
            <p className="eyebrow">Role</p>
            <p>{project.role}</p>
          </div>
          <div>
            <p className="eyebrow">Project</p>
            <p>{project.type}</p>
          </div>
          <div>
            <p className="eyebrow">Frontend</p>
            <p>{project.category}</p>
          </div>
        </div>
        <div className="project-links">
          {project.live && (
            <a
              className="pill selected"
              href={project.live}
              target="_blank"
              rel="noreferrer"
            >
              Visit website ↗
            </a>
          )}
          {project.github && (
            <a
              className="pill"
              href={project.github}
              target="_blank"
              rel="noreferrer"
            >
              View source ↗
            </a>
          )}
        </div>
      </header>
      <div className="project-showcase">
        <ProjectMedia project={project} eager />
      </div>
      <section className="project-story section-shell">
        <h2 data-reveal>{project.intro}</h2>
        <div>
          <p>{project.description}</p>
          <h3>My contribution</h3>
          <p>{project.contribution}</p>
        </div>
      </section>
      <section className="project-details section-shell">
        <div>
          <p className="eyebrow">Frontend focus</p>
          <ul>
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Built with</p>
          <div className="stack-tags">
            {project.stack.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
      </section>
      {project.image && (
        <section
          className="mobile-gallery"
          style={{ background: project.color }}
          aria-label="Mobile preview"
        >
          <div className="section-shell">
            <div>
              <p className="eyebrow">A closer look</p>
              <h2 data-reveal>
                Across
                <br />
                screens.
              </h2>
              <p>
                The {project.name} interface
                <br />
                on a mobile viewport.
              </p>
            </div>
            <figure>
              <img
                src={`/projects/${project.slug}-mobile.webp`}
                alt={`${project.name} mobile interface`}
                width="390"
                height="844"
                loading="lazy"
              />
              <figcaption>Mobile preview · 390 px</figcaption>
            </figure>
          </div>
        </section>
      )}
      <section className="next-project section-shell">
        <p className="eyebrow">Next project</p>
        <Link to={`/projects/${next.slug}`}>
          <h2>{next.name}</h2>
          <span aria-hidden="true">↗</span>
        </Link>
        <Link className="pill" to="/#work">
          All projects <sup>7</sup>
        </Link>
      </section>
    </article>
  );
}
