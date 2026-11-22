import projects from "../data/projects";

function ProjectLink({ href, children, className }) {
  if (!href) return <span className={`${className} project-link-disabled`} aria-disabled="true">{children} <small>Coming soon</small></span>;
  return <a href={href} target="_blank" rel="noreferrer" className={className}>{children} ↗</a>;
}

function Projects() {
  return (
    <section className="projects section" id="projects">
      <div className="section-title projects-heading">
        <div><span>SELECTED WORK</span><h2>Things I've built.</h2></div>
        <p>A selection of practical projects shaped by real problems, thoughtful engineering and continuous iteration.</p>
      </div>
      <div className="projects-grid">
        {projects.map((project) => (
          <article className={`project-card${project.featured ? " project-card-featured" : ""}`} key={project.id}>
            {project.featured && <span className="featured-badge">FEATURED</span>}
            <div className="project-image"><img src={project.image} alt={`${project.title} preview`} loading="lazy" /></div>
            <div className="project-content">
              <span className="project-category">{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tech-stack">{project.tech.map((tech) => <span className="tech-tag" key={tech}>{tech}</span>)}</div>
              <div className="project-buttons">
                <ProjectLink href={project.live} className="primary-btn">Live preview</ProjectLink>
                <ProjectLink href={project.github} className="secondary-btn">Source code</ProjectLink>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="projects-maintenance-note">More projects will be added as they are ready to share.</p>
    </section>
  );
}

export default Projects;
