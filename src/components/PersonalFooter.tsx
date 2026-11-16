import { socialLinks } from '../data/projects';
import { Arrow } from './Icons';

export function PersonalFooter() {
  return <footer className="personal-footer"><div className="page-width footer-inner"><span>Joaquim Moura / {new Date().getFullYear()}</span><div className="footer-links"><a href={socialLinks.github} target="_blank" rel="noopener noreferrer">GitHub<Arrow diagonal /><span className="sr-only"> (nova aba)</span></a><a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<Arrow diagonal /><span className="sr-only"> (nova aba)</span></a><a href="#inicio">Voltar ao topo<span aria-hidden="true">↑</span></a></div></div></footer>;
}
