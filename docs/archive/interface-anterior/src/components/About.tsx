import { Atmosphere } from './Atmosphere';

export function About() {
  return <section id="sobre" className="about-section section" aria-labelledby="about-title"><Atmosphere variant="about" /><div className="container about-grid">
    <div className="about-copy"><p className="section-label">Sobre mim</p><h2 id="about-title">Curiosidade<br />em construção<span className="purple-period">.</span></h2><p>Sou Joaquim, estudante de Engenharia de Software na FIAP. Gosto de entender como as coisas funcionam e transformar esse aprendizado em interfaces que as pessoas possam usar.</p><p>Entre projetos acadêmicos e pessoais, exploro lógica, interação e desenvolvimento front-end. Na web, também experimento composição, tipografia e movimento. A guitarra aparece por aqui como parte da minha identidade.</p></div>
    <div className="about-details"><div className="education"><span className="education-mark" aria-hidden="true">↗</span><p className="detail-label">Formação</p><h3>Engenharia<br />de Software</h3><div className="education-foot"><span>FIAP</span><span>2026 — 2029<span className="education-note">Conclusão prevista</span></span></div></div><div className="tools"><h3>Ferramentas em prática</h3><p>Tecnologias presentes nos projetos deste portfólio.</p><ul><li>React</li><li>JavaScript</li><li>TypeScript</li><li>HTML & CSS</li><li>Vite</li><li>Astro</li><li>React Flow</li><li>GSAP</li></ul></div></div>
  </div></section>;
}
