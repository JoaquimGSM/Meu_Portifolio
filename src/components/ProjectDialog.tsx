import { useEffect, useRef } from 'react';
import type { Project } from '../data/projects';
import { CloseIcon } from './Icon';
import { ExternalLink } from './ExternalLink';
import { ProjectImage } from './ProjectImage';
import { containDialogFocus } from '../utils/dialogFocus';

export default function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return <dialog ref={dialog} className={`case-dialog case-${project.id}`} aria-labelledby="case-title" onKeyDown={containDialogFocus} onClose={onClose} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
    <div className="case-content">
      <div className="case-top"><span>Por dentro do projeto</span><button className="icon-button" onClick={() => dialog.current?.close()} aria-label="Fechar case"><CloseIcon /></button></div>
      <div className={`case-hero ${project.image ? '' : 'case-hero-text'}`}>
        <div className="case-heading"><p className="project-category">{project.category}</p><h2 id="case-title">{project.name}</h2><p>{project.headline}</p><ul className="technology-list" aria-label={`Tecnologias de ${project.name}`}>{project.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul></div>
        <ProjectImage project={project} />
      </div>
      <div className="case-body"><div><h3>O ponto de partida</h3><p>{project.objective}</p></div><div><h3>{project.status === 'development' ? 'A proposta' : 'A experiência'}</h3><p>{project.solution}</p></div><div><h3>{project.id === 'zeryon' ? 'Trabalho em equipe' : 'Minha participação'}</h3><p>{project.contribution}</p>{project.credits ? <p className="case-credits"><strong>Equipe:</strong> {project.credits}</p> : null}</div>{project.note ? <aside className="case-note"><span className="tiny-square" /><p>{project.note}</p></aside> : null}</div>
      {project.demo || project.repository ? <div className="case-links">{project.demo ? <ExternalLink href={project.demo} className="button button-primary">Abrir projeto</ExternalLink> : null}{project.repository ? <ExternalLink href={project.repository}>Ver código no GitHub</ExternalLink> : null}</div> : null}
    </div>
  </dialog>;
}
