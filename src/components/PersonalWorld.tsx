import { CharacterStage } from './CharacterStage';
import { PersonaSelector } from './PersonaSelector';
import { socialLinks } from '../data/projects';
import { Arrow } from './Icons';

export function PersonalWorld() {
  return <section id="inicio" className="personal-world" aria-labelledby="world-title">
    <div className="page-width hero-grid">
      <div className="hero-copy">
        <p className="eyebrow">Portfólio</p>
        <h1 id="world-title">Joaquim<br /><span>Moura</span></h1>
        <div className="hero-facts"><p>Engenharia de Software <span>— FIAP</span></p><p className="academic-years">2026–2029</p></div>
        <p className="hero-focus">Desenvolvimento de software<br className="desktop-break" /> e front-end.</p>
        <div className="pixel-mosaic" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>
      </div>
      <div className="character-card">
        <div className="card-titlebar"><span>Personagem</span><span className="window-pixels" aria-hidden="true"><i /><i /><i /></span></div>
        <CharacterStage />
        <div className="world-selector-row"><PersonaSelector /></div>
        <div className="card-socials"><a href={socialLinks.github} target="_blank" rel="noopener noreferrer">GitHub<Arrow diagonal /><span className="sr-only"> (nova aba)</span></a><a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<Arrow diagonal /><span className="sr-only"> (nova aba)</span></a></div>
      </div>
    </div>
  </section>;
}
