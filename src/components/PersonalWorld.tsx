import { WorldScenery } from './WorldScenery';
import { CharacterStage } from './CharacterStage';
import { PersonaSelector } from './PersonaSelector';

export function PersonalWorld() {
  return <section id="inicio" className="personal-world" aria-labelledby="world-title">
    <div className="page-width world-content"><div className="world-introduction"><p>Três versões de mim.</p><span>Desenvolvimento & experiências digitais</span></div>
      <h1 id="world-title">joaquim<span>.</span><span className="sr-only"> Gaspardo Souza Moura</span></h1>
      <div className="world-center"><WorldScenery /><CharacterStage /><p className="world-annotation">música, movimento<br />e um pouco de código.</p></div>
      <div className="world-selector-row"><p className="selector-note">Qual versão<br /> você quer conhecer?<span aria-hidden="true">↘</span></p><PersonaSelector /></div>
      <div className="world-colophon"><p>Engenharia de Software<br /><span>FIAP / 2026–2029</span></p><a href="#projetos">Meu arquivo de projetos <span aria-hidden="true">↓</span></a></div>
    </div>
  </section>;
}
