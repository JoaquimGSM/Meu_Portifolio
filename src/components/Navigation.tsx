import { usePersona } from '../context/PersonaContext';
import { personas } from '../data/personas';
import { PersonaSelector } from './PersonaSelector';

export function Navigation() {
  const { persona } = usePersona();
  return <header className="navigation"><div className="page-width navigation-inner">
    <a className="signature" href="#inicio" aria-label="jm. — Joaquim Moura, início">jm<span>.</span><span className="signature-name">Joaquim Moura</span></a>
    <nav className="section-nav" aria-label="Navegação principal"><a href="#projetos">Projetos</a><a href="#sobre">Sobre</a></nav>
    <button className="world-menu-toggle" popoverTarget="world-menu" aria-label={`${personas[persona].label}: trocar personagem`}><span className="world-menu-dot" />{personas[persona].label}<span aria-hidden="true">⌄</span></button>
    <div className="world-menu" id="world-menu" popover="auto"><p>Três versões de mim.</p><PersonaSelector compact onSelect={() => document.getElementById('world-menu')?.hidePopover()} /></div>
  </div></header>;
}
