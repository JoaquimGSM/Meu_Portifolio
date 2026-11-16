import type { Project } from '../data/projects';

export function ProjectImage({ project, className = '' }: { project: Project; className?: string }) {
  if (!project.image) return null;
  return <div className={`project-image ${className}`} data-reveal="image"><div className="browser-bar" aria-hidden="true"><span /><span /><span /><i>{project.demo ? new URL(project.demo).hostname : ''}</i></div><img src={project.image} alt={project.imageAlt ?? project.name} width="1440" height="1000" loading="lazy" decoding="async" /></div>;
}
