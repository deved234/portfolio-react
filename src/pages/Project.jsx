import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";
import { caseStudies } from "../data/caseStudies";
import ProjectMedia from "../components/ProjectMedia";
import NotFound from "./NotFound";
export default function Project() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) return <NotFound />;
  const project = projects[index],
    next = projects[(index + 1) % projects.length],
    study = caseStudies[project.slug];
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
            <p className="eyebrow">Category</p>
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
              {project.liveLabel || "Visit website"} ↗
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
          {project.note && <p className="project-note">{project.note}</p>}
        </div>
      </section>
      {study && (
        <section
          className="case-study section-shell"
          aria-labelledby="case-study-title"
        >
          <div>
            <p className="eyebrow">Case study</p>
            <h2 id="case-study-title" data-reveal>
              The challenge
            </h2>
            <p>{study.challenge}</p>
          </div>
          <div>
            <h2 className="case-study-subtitle">How I approached it</h2>
            <ol>
              {study.decisions.map((d) => (
                <li key={d.title}>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}
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
      {project.image && project.mobileImage !== false && (
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
                width={project.mobileWidth || 390}
                height={project.mobileHeight || 844}
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
          All projects <sup>{projects.length}</sup>
        </Link>
      </section>
    </article>
  );
}
