# CODEX — REDESIGN AUTORAL TOTAL DO PORTFÓLIO + 3 PERSONAS ANIMADAS

> **Leia este briefing inteiro antes de alterar o código.** Você deve executar a reformulação completa neste workspace, não apenas propor um plano. O objetivo é um portfólio pessoal excepcionalmente bem desenhado, não uma landing page de serviços. **Nunca faça commit, push nem deploy sem solicitação explícita.**

## 1. Contexto e decisão criativa definitiva

Meu nome é **Joaquim Gaspardo Souza Moura**. Sou estudante de **Engenharia de Software na FIAP** (2026–2029), desenvolvo aplicações e experiências web e gosto de música/rock/metal e guitarra, além de boxe e tênis.

A versão atual do meu portfólio falhou em termos de direção de arte: parece um site de agência ou alguém tentando vender serviços. O problema não é falta de gradientes, sombras ou animações. É o **conceito visual errado**. Não quero blocos comerciais, slogans, barras de competência, CTAs de orçamento, clichês de SaaS ou um hero com nome à esquerda e card à direita. Quero um **universo digital pessoal**, um lugar para conhecer um pouco de mim e explorar meus projetos.

A nova ideia central é **"três versões de mim"**. Há três personagens em pixel art animados: um guitarrista, um boxeador e um tenista. O visitante pode alternar entre eles. **A persona selecionada modifica toda a linguagem visual do portfólio**: cores, fundos, formas, detalhes, padrões, cenários e comportamento das animações. O conteúdo e os links continuam os mesmos. São três linguagens gráficas de uma identidade pessoal, não três websites duplicados.

**Exigência principal:** recomece a direção artística do zero, reutilizando apenas dados, assets, configuração e componentes comprovadamente úteis. Não se limite a redecorar a composição existente.

## 2. Objetivo de qualidade

Assuma os papéis de diretor de arte, designer visual/editorial, motion designer, engenheiro front-end e revisor de qualidade. Busque resultado compatível com um portfólio de *creative developer* autoral, digno de estudo de caso visual. Isso exige escolhas de tipografia, ritmo, hierarquia, composição, assimetria, cor, textura e interação — não efeitos em excesso.

Princípios:

- **Pessoal, não comercial.** Evite linguagem de venda, CTAs agressivos e blocos de agência.
- **Expressivo, não infantil.** Pixel art pode conviver com design editorial contemporâneo; não transforme tudo em jogo retrô.
- **Centrado nas personas, mas projetos acessíveis.** A seleção é uma descoberta divertida, não um obstáculo de entrada.
- **Coerente entre três mundos.** O visitante sempre reconhece o mesmo portfólio, embora a atmosfera mude substancialmente.
- **Visual antes de ornamentação.** Se uma forma, gradiente, ruído, glow ou animação não melhorar a ideia, remova.
- **Sem prometer o impossível.** Teste o que realmente puder executar e relate limitações de forma objetiva.

## 3. Inventário de assets obrigatórios

Estes três arquivos são fornecidos **dentro deste kit** em caminhos já preparados para Vite/React:

- `public/personagens/guitarrista.gif`
- `public/personagens/boxeador.gif`
- `public/personagens/tenista.gif`

Cada arquivo é um GIF animado original com **9 frames e loop contínuo**. **Não substitua por PNG estático na apresentação principal. Não redesenhe personagens, não recrie o movimento e não modifique os GIFs originais.**

Descrição para orientação de cenografia, sem redesenhar:

- **Guitarrista:** menino em pixel art, cabelo comprido castanho-claro, camiseta Gojira, calça preta, guitarra roxa no estilo EVH Wolfgang, headbanging e braços tocando com pernas estáveis.
- **Boxeador:** personagem pixel art de boxe; elementos amarelos/azuis/lilases e folhas no universo visual.
- **Tenista:** personagem pixel art com visual esportivo verde/branco, raquete, bola e folhas.

Inspecione cada asset no projeto. O guitarrista fornecido tem transparência; **não presuma que boxeador e tenista também tenham**. Trate os fundos opacos como parte do enquadramento visual ou projete fundos compatíveis, sem apagar pixels escuros de cabelo, roupa ou acessórios. Evite `mix-blend-mode`, recortes automáticos agressivos ou filtros que alterem a pixel art. Preserve proporção e bordas nítidas (`image-rendering: pixelated` quando fizer sentido).

Se o workspace já tiver assets com esses nomes, compare antes de sobrescrever. Use os GIFs deste kit como referência aprovada para a funcionalidade nova.

## 4. Três personas, três direções visuais completas

### Persona A — Guitarrista / Sound

Ponto de partida cromático: roxo `#6410C9`, amarelo `#FFDF00`, cinza `#E9E9E9`, roxo quase preto `#21132F`. Explore também vinho, lavanda, magenta, creme e violeta profundo se melhorarem o conjunto.

Personalidade: musical, elétrica, alternativa, expressiva. Interprete ritmo e música visualmente: ecos tipográficos, campos de energia, linhas de movimento, composição inspirada em zines/capas de álbum, acentos elétricos controlados. Não faça uma parede de notas musicais, guitarras decorativas e raios genéricos. O site não é um festival.

### Persona B — Boxeador / Impact

Ponto de partida: lilás `#EAD9F3`, azul `#274C9B`, amarelo-dourado `#F6C934`, escuro `#291B35`. Explore tons de pêssego, creme, violeta, azul-marinho e dourado para um resultado mais bonito.

Personalidade: ágil, confiante, gráfica, dinâmica. Use composição, formas e ritmo com sensação de impacto, aceleração e recuperação. Anéis, linhas tensas, cortes diagonais, figuras editoriais e folhas podem fazer parte da identidade se forem integrados com critério. **Não** criar estética militar, agressiva, de academia ou campeonato de luta.

### Persona C — Tenista / Court

Ponto de partida: verde profundo `#165A40`, verde cítrico `#D3EE72`, branco suave `#F4F7EE`, verde escuro `#123C2D`. Explore verde-menta, oliva, creme, azul pálido, amarelo suave.

Personalidade: leve, fresca, dinâmica, orgânica. Arcos, trajetórias, marcações abstratas de quadra, folhas, linhas fluidas, espaços amplos, movimento com curvas e cadência. Não virar website de torneio ou loja de esportes.

### Padrão de qualidade para as três

Não entregue simplesmente o **mesmo layout com três variáveis de cor**. As personas devem influenciar cenários, formas de fundo, ritmo e detalhes. Entretanto, a navegação e a disposição funcional devem permanecer reconhecíveis. Equilibre identidade própria e sistema compartilhado.

## 5. Seleção de personagem: a interação central

Quero um **seletor de personagens autoral**, não três botões comuns ou cards SaaS. Explore posições, escala, enquadramentos, miniaturas e composição. Uma referência de *character select* é válida, mas reinterpretada com sofisticação editorial, não como imitação literal de um videogame.

Comportamentos essenciais:

1. O site **já abre acessível**, sem tela obrigatória de escolha; a persona padrão é **guitarrista**, salvo preferência persistida.
2. É óbvio que existem **três personas** e que podem ser selecionadas.
3. A persona ativa exibe o **GIF original animado** em destaque.
4. Miniaturas não precisam animar todas ao mesmo tempo: preferir poster estático derivado do frame original ou otimização semelhante, mantendo o GIF ativo sempre animado.
5. Ao clicar/tocar/usar teclado em outra persona, a transição altera ambiente, acentos gráficos, cores, texturas, cenários e presença do personagem, **sem recarregar, perder scroll ou causar layout shift**.
6. Lidar com trocas rápidas/concorrentes sem quebrar estados ou deixar camadas presas.
7. Salvar preferência em `localStorage` com fallback seguro; restaurar antes do primeiro paint sempre que viável e sem flash grosseiro de tema errado.
8. Indicar estado selecionado de forma visual e acessível (`aria-pressed` ou padrão equivalente), com foco visível e controles touch amigáveis.
9. Respeitar `prefers-reduced-motion`: transições simples ou instantâneas, poster estático quando apropriado e nenhuma animação ambiental forçada.
10. Não produzir música automática, som obrigatório ou animações que atrapalhem leitura e navegação.

O visitante pode trocar de persona **a qualquer momento**; preserve o acesso ao seletor sem transformá-lo em interface flutuante intrusiva.

## 6. Exploração de arte obrigatória — não pular

Antes de consolidar, crie **3 direções visuais radicalmente distintas**, com protótipos reais usando os três personagens (pelo menos uma hero + fragmento da galeria), não só três parágrafos:

- **A / Character Playground:** pessoas/personas e interações como ponto de partida; composição viva e desenhada.
- **B / Digital Zine:** revista digital independente, editorial, tipografia expressiva, colagem cuidadosa e painéis assimétricos.
- **C / Three Personal Worlds:** cada persona muda um pequeno universo gráfico, mantendo interfaces compartilhadas e navegação limpa.

Para cada: definir conceito, sistema tipográfico, linguagem de formas, paleta estendida por persona, estratégia de movimento, abertura e galeria. Implementar rapidamente protótipos em rotas de desenvolvimento ou arquivos temporários organizados. Se houver navegador/Playwright, produzir capturas **desktop e mobile** e comparar. Escolher a direção com maior qualidade visual e viabilidade, não automaticamente a mais extravagante. É permitido integrar soluções, mas somente com unidade estética.

Documente em `DIRECAO_ARTISTICA.md` uma avaliação curta e honesta do que foi considerado, por que a proposta vencedora é melhor e quais decisões foram tomadas. **Não pare para pedir aprovação; implemente a escolhida.** Após a escolha, remova ou isole protótipos de forma que não poluam a versão final.

## 7. Abertura: fugir da landing page

Refaça completamente a primeira dobra. Não reutilize automaticamente nome enorme à esquerda + card à direita + texto corporativo + dois CTAs. A abertura deve comunicar minha identidade e revelar a possibilidade de selecionar personas. Deve existir um caminho claro para os projetos, porém não precisa haver um botão comercial gigante.

Informações que podem estar presentes, de maneira natural e discreta:

- **Joaquim Gaspardo Souza Moura** (pode usar "Joaquim" como assinatura visual).
- **Engenharia de Software — FIAP**.
- Desenvolvimento e experiências digitais.
- As três personas / meus interesses musicais e esportivos.

Rejeite slogan como "transformando ideias em experiências", "vamos criar algo incrível", "pronto para inovar", "seu próximo projeto começa aqui". Não usar idade como argumento de venda. Prefira identidade editorial autoral a um pitch profissional artificial.

## 8. Projetos — apresentação estritamente visual, sem textos

**Regra central do usuário: apenas apresentar os projetos. Não inventar nem escrever descrições, tecnologias, cases, funcionalidades, resultados, métricas, FAQs ou listas de competências por projeto.** O próprio Joaquim preencherá essas informações depois.

Os projetos desejados são:

1. **Zeryon Photo Profile** — projeto acadêmico. Inspecionar dados/links já presentes no workspace. Se faltar deploy confirmado, usar apenas nome e representação real existente, sem inventar URL.
2. **Naruto Connections** — `https://naruto-connections.vercel.app`.
3. **Cityzer** — Global Solution em desenvolvimento: reservar um espaço visual convincente, indicar **"Em desenvolvimento"**, não apresentar sistema ou screenshots fictícios como prontos.
4. **Desenvolvimento Web** — área/agrupamento com dois projetos demonstrativos autorais:
   - **Entrear** — `https://entrear.vercel.app`.
   - **Lâmina** — `https://lamina-chi.vercel.app`.

Apresentar cada um com **nome + imagem real do próprio projeto + link quando existente**. No caso da Cityzer, usar uma composição gráfica editorial abstrata como placeholder claramente identificado, sem falsificar o sistema. Imagens dos sites devem ser screenshots reais verificáveis, não imagens stock ou mockups enganosos.

Não obrigar todos os projetos a uma grade previsível de cards iguais. Explore galeria visual, capas, mural, composição editorial, proporções alternadas e transições interessantes. Mantenha a galeria legível, responsiva e navegável. As imagens dos projetos conservam sua própria identidade e não devem receber filtros pesados de tema.

Dados configurados num arquivo central editável (nome, imagem, link, status e campos opcionais vazios para descrições futuras). Não preencher campos futuros com lorem ipsum. **Mesmo quando o tema muda, os projetos e seus dados permanecem os mesmos.**

## 9. Sobre e redes sociais: mínimo, pessoal

Uma apresentação curta, humana e visualmente interessante. Fatos permitidos: nome, FIAP, Engenharia de Software, interesses em software/front-end, música, guitarra, boxe e tênis. Não inventar experiência em empresas, clientes, resultados ou certificados.

Links oficiais:

- GitHub: `https://github.com/JoaquimGSM`
- LinkedIn: `https://www.linkedin.com/in/joaquimgsm`

Não fazer um rodapé de vendas, orçamento ou lead generation. Não criar formulário de contato elaborado desnecessariamente. Fechamento simples, expressivo, autoral; acessos ao GitHub/LinkedIn fáceis no desktop e mobile.

## 10. Linguagem gráfica, tipografia e fundos

A direção artística precisa ser reconhecível mesmo quando se retiram gradientes e animações. Trabalhe principalmente com **tipografia, composição, massas de cor, ritmo e cenografia**.

Explore de modo criterioso: gradientes bons, texturas de impressão, padrões geométricos, linhas editoriais, recortes orgânicos, formas em perspectiva, sobreposições, encaixes inesperados, materiais gráficos autorais, espaçamento negativo. Não poluir com dezenas de círculos translúcidos, blobs desfocados e glows; foi precisamente o que falhou na versão anterior.

Estabelecer sistema tipográfico com até poucas famílias coordenadas; personalidade sem sacrificar leitura. Hierarquia forte, contraste de escala, formas e proporções inventivas. Evitar a estética habitual de landing page SaaS mesmo quando a interface for moderna. Identidades podem ter microdiferenças tipográficas, mas o sistema de leitura deve ser coeso.

## 11. Motion design intencional

A interação deve ter alto padrão: timing, ritmo, easing, coordenação de entradas/saídas e resposta ao toque. Não usar "fade-up em tudo" como linguagem única.

- Guitarrista: pulsos/ondas elétricas sutis, ritmo visual e energia gráfica.
- Boxeador: pequenos impactos, expansões rápidas e retorno elástico, sem movimentos agressivos sobre o conteúdo.
- Tenista: trajetórias curvas, cadência fluida, folhas/linhas leves.

As animações internas dos GIFs já existem; **não tente alterar ou articular os frames via GSAP**. GSAP/CSS/SVG podem animar os contêineres, detalhes e transições de tema. Considere performance e cleanup de timelines em React. Não usar scroll hijacking. Não provocar enjoo ou efeitos permanentes excessivos. Garantir estado estável após a troca de personagem, inclusive em interação rápida.

## 12. Arquitetura técnica sugerida (adapte ao workspace)

- Inspecionar stack, dependências, estrutura, scripts e assets existentes antes de modificar.
- Manter stack atual se adequada; não migrar para outra apenas para parecer moderno.
- Centralizar configuração em `personas`/`themes` com tokens semânticos (fundo, superfície, texto, acento, borda, decorativos, caráter das transições e caminho de GIF).
- Variáveis CSS semânticas ou solução equivalente: evitar cores hardcoded escondidas em componentes.
- Um único conjunto de projetos/dados, independente do tema.
- Componentes separados: seletor, personagem ativo, camadas/cenografia, galeria de projetos, navegação, animação/transição.
- Estado global enxuto (Context ou equivalente) e persistência segura.
- Evitar tudo dentro de `App.jsx`.
- Carregar GIF ativo de forma eficiente. Usar poster estático para miniaturas quando isso melhorar performance e reduzir múltiplas animações fora da tela.
- Gerar thumbnails estáticos a partir dos próprios GIFs, caso necessário, sem alterá-los e sem criar "arte substituta".
- Preservar responsividade e acessibilidade, tocar/teclado/foco.
- Incluir metadados básicos de SEO e compartilhamento, sem texto comercial.

**Importante:** não instale inúmeras skills/depêndencias por impulso. Verifique quais estão realmente disponíveis; utilize, se disponíveis, skills de frontend design, React best practices, web design guidelines e browser/Playwright. Leia as instruções das skills e aplique-as. Use GSAP apenas quando contribuir; CSS/transitions simples podem ser melhores para outros elementos. Não afirme que utilizou skills indisponíveis.

## 13. Teste e revisão — parte obrigatória do trabalho

Após implementar, rode build/lint/testes existentes, execute servidor e abra no navegador se a ferramenta estiver disponível. Capture screenshots reais e inspecione ao menos:

- Desktop largo, notebook, tablet, smartphone estreito.
- **Todos os três temas**, não só guitarrista.
- Abertura, seletor, galeria, sobre, navegação e rodapé.
- Troca entre temas (inclusive cliques rápidos e interrupção de transições).
- Permanência no mesmo scroll, sem reload.
- Persistência da persona após recarregar.
- Funcionamento de links externos.
- Imagens de projetos reais e fidelidade dos GIFs.
- Contraste, estados de foco, navegação por teclado e touch.
- `prefers-reduced-motion`.
- Sem overflow horizontal, textos cortados, layout shift ou animações presas.
- FPS/performance aceitável e sem gifs em excesso sendo executados simultaneamente.

Use as screenshots para criticar composição e acabamento. Faça ao menos uma rodada de refinamento visual após os testes, com especial atenção ao tema que parecer mais fraco. Se não houver navegador/captura, explicite essa limitação e faça as verificações que forem possíveis; não invente testes.

## 14. Critérios de aceitação

1. A estética mudou radicalmente em relação à landing page anterior.
2. O site claramente representa um indivíduo, não uma agência.
3. Os **três GIFs continuam animados** quando ativos.
4. O seletor de personagens é bonito, intuitivo, acessível e autoral.
5. Cada escolha transforma de fato a identidade global; não só a cor de um botão.
6. Os temas têm qualidade semelhante e uma linguagem gráfica coerente.
7. Os projetos são **visuais e sem descrições**, exatamente como solicitado.
8. Cityzer aparece como em desenvolvimento, sem alegação de entrega pronta.
9. Entrear e Lâmina são apresentados como **sites demonstrativos autorais**, não clientes pagos reais.
10. GitHub e LinkedIn estão corretos e acessíveis.
11. Funciona bem em mobile, touch e teclado.
12. Animações intencionais, fluidas e com versão reduzida.
13. Código organizado e dados editáveis.
14. Build funciona, sem erros óbvios de console.
15. O resultado parece um lugar pessoal com personalidade, não um template decorado.

## 15. Fluxo de execução esperado

1. **Auditoria**: entender projeto atual, assets, dados e scripts.
2. **Exploração**: três direções visuais implementadas rapidamente, com capturas se possível.
3. **Escolha crítica**: comparar e justificar a proposta mais forte.
4. **Implementação**: substituir a antiga linguagem visual e integrar o tema escolhido com as três personas.
5. **Motion**: orquestrar transições e elementos gráficos por tema.
6. **Conteúdo**: inserir nomes, imagens reais e links corretos; nada de descrições de projetos.
7. **Teste**: build + revisão real de desktop/mobile e de cada persona.
8. **Refinamento**: corrigir pontos fracos, principalmente visual, desempenho e mobile.
9. **Entrega**: breve síntese do conceito vencedor, arquivos alterados, testes realizados, limitações e como executar localmente.

Execute o trabalho no código. Não pare em um relatório de ideias. Faça o melhor possível com o ambiente e os recursos existentes, **sem precisar perguntar a cada fase**. Ao mesmo tempo, não esconda limitações ou alegue resultados não testados.

### Restrições finais inegociáveis

- **NÃO executar `git commit`, `git push` ou deploy.**
- Não apagar assets aprovados nem modificar GIFs originais.
- Não inventar fatos, projetos, capturas ou links.
- Não transformar portfólio em site para captar clientes.
- Não preencher descrições dos projetos (eu adicionarei depois).
- Não escolher o caminho mais convencional por ser mais rápido.
- Não entregar a primeira solução funcional sem revisar o design.

**O objetivo é que alguém visite o site, descubra as três versões de Joaquim, explore os projetos e sinta que esteve num espaço pessoal e criativo — não numa landing page qualquer.**
