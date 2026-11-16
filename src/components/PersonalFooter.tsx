import { socialLinks } from '../data/projects';
import { Arrow } from './Icons';

export function PersonalFooter() {
  return <footer className="personal-footer"><div className="page-width"><div className="footer-main"><p>Joaquim,<br /><em>por aqui.</em></p><div><a href={socialLinks.github} target="_blank" rel="noopener noreferrer">GitHub<Arrow diagonal /><span className="sr-only"> (nova aba)</span></a><a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<Arrow diagonal /><span className="sr-only"> (nova aba)</span></a></div></div><div className="footer-small"><span>Joaquim Gaspardo Souza Moura / {new Date().getFullYear()}</span><a href="#inicio">De volta ao começo ↑</a></div></div></footer>;
}
