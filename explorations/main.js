const personas = ['guitarrista', 'boxeador', 'tenista'];
const names = ['Sound', 'Impact', 'Court'];
const concept = new URLSearchParams(location.search).get('concept') || 'worlds';
const selectors = () => `<div class="selection" role="group" aria-label="Escolher personagem">${personas.map((id, index) => `<button data-persona="${id}" aria-pressed="${index === 0}"><img src="/personagens/${id}-poster.png" alt="" width="68" height="68"><span>${names[index]}</span></button>`).join('')}</div>`;
const fragment = () => `<section class="fragment" id="trabalhos"><h2>Algumas coisas<br>que eu fiz.</h2><div class="works"><a href="https://web-dev-sprint3-zeryon.vercel.app/"><img src="/projects/zeryon.jpg" alt="Zeryon Photo Profile"><span>Zeryon Photo Profile ↗</span></a><a href="https://naruto-connections.vercel.app/"><img src="/projects/naruto.jpg" alt="Naruto Connections"><span>Naruto Connections ↗</span></a></div></section>`;
const navigation = `<nav><a href="#">Joaquim Moura</a><a href="#trabalhos">Projetos ↓</a><span>FIAP / Engenharia de Software</span></nav>`;
const character = `<img class="active-character" src="/personagens/guitarrista.gif" width="414" height="414" alt="Personagem ativo">`;

const templates = {
  playground: `${navigation}<main><section class="opening"><p class="intro">desenvolvimento, música e outras versões de mim.</p><h1>joaquim<span>moura</span></h1><div class="playground"><span class="play-shape"></span><img class="satellite one" src="/personagens/boxeador-poster.png" width="130" height="130" alt="Boxeador">${character}<img class="satellite two" src="/personagens/tenista-poster.png" width="130" height="130" alt="Tenista"><span class="handwritten">escolha um lado<br>de mim ↘</span></div>${selectors()}<p class="opening-foot">Engenharia de Software, FIAP / 2026–2029</p></section>${fragment()}</main>`,
  zine: `${navigation}<main><section class="opening"><div class="zine-title"><p>um arquivo pessoal de</p><h1>JOA<br>QUIM.</h1><span>Moura / edição pessoal</span></div><div class="zine-portrait"><span class="zine-number">J/M</span>${character}<span class="zine-caption">música, movimento<br>e experiências digitais.</span></div><div class="zine-side"><p>três versões,<br>um Joaquim.</p>${selectors()}</div></section>${fragment()}</main>`,
  worlds: `${navigation}<main><section class="opening"><p class="world-label">Um pouco de mim, em três versões.</p><h1>joaquim<span>.</span></h1><div class="world-art"><span class="world-form"></span><span class="world-line"></span>${character}<span class="world-note">o mesmo eu.<br>outra frequência.</span></div><div class="world-selection"><span class="handwritten">troque de universo ↘</span>${selectors()}</div><div class="world-foot"><span>Engenharia de Software<br>FIAP, 2026–2029</span><a href="#trabalhos">Meu arquivo de projetos ↓</a></div></section>${fragment()}</main>`,
};

document.body.className = concept;
document.body.dataset.persona = 'guitarrista';
document.getElementById('exploration').innerHTML = templates[concept] || templates.worlds;
document.querySelectorAll('[data-persona]').forEach((button) => button.addEventListener('click', () => {
  const id = button.dataset.persona;
  document.body.dataset.persona = id;
  document.querySelector('.active-character').src = `/personagens/${id}.gif`;
  document.querySelectorAll('button[data-persona]').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
}));
