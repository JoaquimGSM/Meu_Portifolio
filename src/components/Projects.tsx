import { projects, cityzer } from '../data/projects';
import type { Project } from '../data/projects';
import { Arrow } from './Icon';
import { ExternalLink } from './ExternalLink';
import { ProjectImage } from './ProjectImage';
import { Atmosphere } from './Atmosphere';

function ProjectActions({ project, onSelect }: { project: Project; onSelect: (project: Project) => void }) {
  return <div className="project-actions"><button className="text-link" onClick={() => onSelect(project)} aria-label={`Ver case ${project.name}`}>Ver case<Arrow /></button>{project.demo ? <ExternalLink href={project.demo}>Abrir site</ExternalLink> : null}</div>;
}

export function Projects({ onSelect }: { onSelect: (project: Project) => void }) {
  const [zeryon, naruto] = projects;
  const webProjects = projects.filter((project) => ['entrear', 'lamina'].includes(project.id));
  return <section id="projetos" className="projects-section section" aria-labelledby="projects-title">
    <div className="container">
      <div className="section-heading"><h2 id="projects-title">Projetos<br />selecionados<span className="purple-period">.</span></h2><p>Da faculdade aos experimentos pessoais.<br /> O que venho colocando em prática.</p></div>
      <article className="project-feature zeryon-feature" aria-labelledby="zeryon-title">
        <button className="project-image-button" aria-label="Ver case Zeryon" onClick={() => onSelect(zeryon)}><ProjectImage project={zeryon} /><span className="image-open" aria-hidden="true"><Arrow diagonal /></span></button>
        <div className="feature-copy"><p className="project-category">{zeryon.category}</p><h3 id="zeryon-title">Zeryon<span className="project-subtitle">Photo Profile</span></h3><p>{zeryon.summary}</p><ul className="technology-list" aria-label="Tecnologias de Zeryon">{zeryon.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul><ProjectActions project={zeryon} onSelect={onSelect} /></div>
      </article>
      <article className="project-feature naruto-feature" aria-labelledby="naruto-title">
        <Atmosphere variant="connections" />
        <div className="feature-copy"><p className="project-category">{naruto.category}</p><h3 id="naruto-title">Naruto<br /> Connections</h3><p>{naruto.summary}</p><ul className="technology-list" aria-label="Tecnologias de Naruto Connections">{naruto.technologies.slice(0, 3).map((tech) => <li key={tech}>{tech}</li>)}</ul><ProjectActions project={naruto} onSelect={onSelect} /></div>
        <button className="project-image-button" aria-label="Ver case Naruto Connections" onClick={() => onSelect(naruto)}><ProjectImage project={naruto} /><span className="image-open" aria-hidden="true"><Arrow diagonal /></span></button>
      </article>
      <article className={`cityzer-feature ${cityzer.status === 'published' ? 'cityzer-published' : ''}`} aria-labelledby="cityzer-title">
        <div className="cityzer-copy"><p className="status-label"><span />{cityzer.status === 'development' ? 'Em desenvolvimento' : 'Publicado'}</p><h3 id="cityzer-title">Cityzer<span aria-hidden="true">↗</span></h3><p>{cityzer.summary}</p><button className="text-link" onClick={() => onSelect(cityzer)} aria-label="Conhecer proposta Cityzer">{cityzer.status === 'development' ? 'Conhecer a proposta' : 'Ver case'}<Arrow /></button></div>
        {cityzer.status === 'published' && cityzer.image ? <ProjectImage project={cityzer} /> : <div className="cityzer-editorial"><span className="cityzer-word" aria-hidden="true">cidade<br /><span>em comum.</span></span><p>Global Solution{cityzer.updateDate ? <span>Atualização prevista <time dateTime={cityzer.updateDate}>{new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(new Date(`${cityzer.updateDate}T12:00:00Z`))}</time></span> : null}</p></div>}
      </article>
      <div className="web-heading"><div><p className="project-category">Desenvolvimento web independente</p><h3>Sites com identidades próprias.</h3></div><p>Duas empresas fictícias.<br />Dois estudos de experiência para a web.</p></div>
      <div className="web-projects">{webProjects.map((project) => <article className={`web-project ${project.id}-project`} key={project.id} aria-labelledby={`${project.id}-title`}>
        <button className="project-image-button" aria-label={`Ver case ${project.name}`} onClick={() => onSelect(project)}><ProjectImage project={project} /><span className="image-open" aria-hidden="true"><Arrow diagonal /></span></button>
        <div className="web-project-title"><h4 id={`${project.id}-title`}>{project.name}</h4><span>Website demonstrativo</span></div><p>{project.summary}</p><ProjectActions project={project} onSelect={onSelect} />
      </article>)}</div>
    </div>
  </section>;
}
