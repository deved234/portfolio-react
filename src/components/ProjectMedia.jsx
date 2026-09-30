export default function ProjectMedia({ project, eager = false }) {
  return (
    <div className="project-media" style={{ background: project.color }}>
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.name} website preview`}
          width="1440"
          height="1000"
          loading={eager ? "eager" : "lazy"}
        />
      ) : (
        <div className="project-cover">
          <span>{project.type}</span>
          <strong>{project.name}</strong>
          <span className="cover-mark" aria-hidden="true">
            ↗
          </span>
          <small>Project cover · {project.category}</small>
        </div>
      )}
    </div>
  );
}
