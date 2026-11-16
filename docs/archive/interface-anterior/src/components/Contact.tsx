import { socialLinks } from '../data/projects';
import { ExternalLink } from './ExternalLink';
import { Arrow } from './Icon';
import { Atmosphere } from './Atmosphere';

export function Contact() {
  return <footer id="contato" className="contact-section" aria-labelledby="contact-title"><Atmosphere variant="contact" /><div className="container">
    <div className="contact-heading"><p className="section-label">Contato</p><h2 id="contact-title">Vamos criar<br />a próxima ideia<span>.</span></h2><span className="contact-arrow" aria-hidden="true"><Arrow diagonal /></span></div>
    <div className="contact-bottom"><p>Para conversar sobre estágio,<br />projetos ou desenvolvimento web.</p><div className="contact-links"><ExternalLink href={socialLinks.linkedin}>Conversar no LinkedIn</ExternalLink><ExternalLink href={socialLinks.github}>Conhecer meu GitHub</ExternalLink></div></div>
    <div className="footer-line"><a href="#inicio" className="footer-signature">Joaquim Moura<span className="tiny-square" /></a><p>© {new Date().getFullYear()} · Desenvolvido por Joaquim.</p><a className="back-top" href="#inicio">Voltar ao início<span aria-hidden="true">↑</span></a></div>
  </div></footer>;
}
