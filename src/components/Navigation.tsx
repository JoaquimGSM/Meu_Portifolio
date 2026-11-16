import { PersonaSelector } from './PersonaSelector';

export function Navigation() {
  return <header className="navigation"><div className="page-width navigation-inner">
    <a className="signature" href="#inicio" aria-label="JM — Joaquim Moura, início">JM<span aria-hidden="true">■</span></a>
    <nav className="section-nav" aria-label="Navegação principal"><a href="#projetos">Projetos</a><a href="#sobre">Sobre</a></nav>
    <button className="world-menu-toggle" popoverTarget="world-menu" aria-label="Personagem: trocar personagem"><span className="world-menu-dot" aria-hidden="true" />Personagem<span className="pixel-chevron" aria-hidden="true" /></button>
    <div className="world-menu" id="world-menu" popover="auto"><p>Escolher personagem</p><PersonaSelector compact onSelect={() => document.getElementById('world-menu')?.hidePopover()} /></div>
  </div></header>;
}
