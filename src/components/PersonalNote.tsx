import { socialLinks } from '../data/projects';
import { Arrow } from './Icons';
import { WorldScenery } from './WorldScenery';

export function PersonalNote() {
  return <section className="personal-note" id="sobre" aria-labelledby="note-title"><div className="page-width note-grid">
    <div className="note-art"><WorldScenery small /><span className="note-monogram" aria-hidden="true">j/m</span></div>
    <div className="note-copy"><span className="note-label">Fora da tela, também.</span><h2 id="note-title">Um pouco<br /><em>de Joaquim.</em></h2><p>Sou Joaquim Gaspardo Souza Moura, estudante de Engenharia de Software na FIAP, de 2026 a 2029.</p><p>Gosto de desenvolvimento web e interfaces. Fora da tela, tem guitarra, rock e metal, boxe e tênis. As três versões daqui são partes de mim.</p><div className="personal-socials"><a href={socialLinks.github} target="_blank" rel="noopener noreferrer">GitHub<Arrow diagonal /><span className="sr-only"> (nova aba)</span></a><a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<Arrow diagonal /><span className="sr-only"> (nova aba)</span></a></div></div>
  </div></section>;
}
