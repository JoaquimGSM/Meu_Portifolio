import { AvatarCard } from './AvatarCard';
import { Arrow } from './Icon';

export function Hero() {
  return <section className="hero" id="inicio" aria-labelledby="hero-title" data-enter>
    <div className="container hero-grid">
      <div className="hero-copy">
        <p className="hero-role"><span className="tiny-square" />Desenvolvimento de software & front-end</p>
        <h1 id="hero-title">Joaquim<br />Moura<span className="name-period">.</span><span className="sr-only"> — Desenvolvimento de software e front-end</span></h1>
        <p className="hero-intro">Sou Joaquim Gaspardo Souza Moura. Estudo Engenharia de Software na FIAP e desenvolvo interfaces, aplicações e ideias para a web.</p>
        <div className="hero-actions"><a href="#projetos" className="button button-primary">Ver projetos<Arrow /></a><a href="#contato" className="text-link">Vamos conversar<Arrow diagonal /></a></div>
      </div>
      <AvatarCard />
      <div className="hero-foot"><p><span className="foot-label">Formação</span>Engenharia de Software · FIAP <span className="year">2026–2029</span></p><a href="#projetos" className="scroll-cue">Conheça meu trabalho <span aria-hidden="true">↓</span></a></div>
    </div>
  </section>;
}
