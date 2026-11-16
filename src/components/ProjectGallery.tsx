import { projects } from '../data/projects';
import type { Project } from '../data/projects';
import { Arrow } from './Icons';

function VisualProject({ project, index }: { project: Project; index: number }) {
  return <article className={`visual-project project-${project.id}`} aria-labelledby={`${project.id}-title`}>
    <div className="project-frame"><div className="project-titlebar" aria-hidden="true"><span>0{index + 1}</span><span className="frame-pixels">▪ ▪ ▪</span></div>
      {project.url && project.image ? <a className="project-cover" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${project.name} em nova aba`}><img src={project.image} alt={project.imageAlt ?? project.name} width="1440" height="1000" loading="lazy" decoding="async" /><span className="cover-open" aria-hidden="true"><Arrow diagonal /></span></a> : <div className="cityzer-cover" role="img" aria-label="Capa gráfica de Cityzer, projeto em desenvolvimento; não é uma captura do sistema."><div className="cityzer-art" aria-hidden="true"><span>C</span><i /><i /></div><span className="development-label">Em desenvolvimento</span></div>}
    </div><div className="project-caption"><h3 id={`${project.id}-title`}>{project.name}</h3>{project.context ? <span>{project.context}</span> : null}</div>
  </article>;
}

export function ProjectGallery() {
  return <section id="projetos" className="project-gallery" aria-labelledby="gallery-title"><div className="page-width">
    <div className="gallery-heading"><h2 id="gallery-title">Projetos</h2><span className="heading-pixels" aria-hidden="true"><i /><i /><i /></span></div>
    <div className="projects-grid">{projects.map((project, index) => <VisualProject key={project.id} project={project} index={index} />)}</div>
  </div></section>;
}
