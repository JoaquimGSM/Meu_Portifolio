import { projects } from '../data/projects';
import type { Project } from '../data/projects';
import { Arrow } from './Icons';

function VisualProject({ project }: { project: Project }) {
  return <article className={`visual-project project-${project.id}`} aria-labelledby={`${project.id}-title`}>
    {project.url && project.image ? <a className="project-cover" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Abrir ${project.name} em nova aba`}><img src={project.image} alt={project.imageAlt ?? project.name} width="1440" height="1000" loading="lazy" decoding="async" /><span className="cover-open" aria-hidden="true"><Arrow diagonal /></span></a> : <div className="cityzer-cover" role="img" aria-label="Composição gráfica abstrata para Cityzer, projeto em desenvolvimento; não é uma captura do sistema."><div className="cityzer-art" aria-hidden="true"><span>C</span><i /><i /><i /></div><span className="development-label">Em desenvolvimento</span></div>}
    <div className="project-caption"><h3 id={`${project.id}-title`}>{project.name}</h3>{project.context ? <span>{project.context}</span> : null}</div>
  </article>;
}

export function ProjectGallery() {
  return <section id="projetos" className="project-gallery" aria-labelledby="gallery-title"><div className="page-width">
    <div className="gallery-heading"><h2 id="gallery-title">Arquivo<br /><em>de projetos.</em></h2><span className="gallery-count">Seleção pessoal / 2026</span></div>
    <div className="selected-gallery">{projects.filter((project) => project.group === 'selected').map((project) => <VisualProject key={project.id} project={project} />)}</div>
    <div className="web-gallery-heading"><h2>Desenvolvimento<br className="mobile-break" /> web</h2><span>Estudos autorais / websites demonstrativos</span></div>
    <div className="web-gallery">{projects.filter((project) => project.group === 'web').map((project) => <VisualProject key={project.id} project={project} />)}</div>
  </div></section>;
}
