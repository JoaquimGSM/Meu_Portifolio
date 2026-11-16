# Direção de arte

## Revisão de atmosferas solicitada pelo autor

O novo pedido e o texto anexado autorizam uma transformação profunda dos fundos: gradientes, halos, formas, glow e camadas passam a integrar o sistema. As orientações anteriores de superfícies predominantemente planas foram substituídas por esta direção. A curadoria, os fatos confirmados, os arquivos aprovados do personagem e as interações continuam como base.

**Conceito: luz em frequência.** A relação com música aparece na continuidade de arcos e campos de cor, sem instrumentos decorativos adicionais nem simulação de cenário gamer. O texto ocupa a região de menor contraste visual; a luz se concentra ao redor do trabalho e do personagem.

- Hero: base perolada, luz quente junto da apresentação e uma grande forma refrativa ametista atrás do personagem. Moldura clara com profundidade, palco interno iluminado e links legíveis.
- Zeryon: galeria clara com iluminação roxa no enquadramento da captura real.
- Naruto: mudança para fundo uva/carvão, campo de luz difuso e linhas de conexão decorativas discretas. A captura real continua sendo a evidência do projeto.
- Cityzer: atmosfera noturna violeta e horizonte luminoso abstrato. As curvas são gráficas, não um mapa ou produto simulado.
- Estudos web: Entrear recebe uma luz quente, Lâmina uma luz fria. As duas molduras pertencem ao mesmo sistema editorial.
- Sobre: campo de luz lilás, painel de formação com material translúcido e ferramentas em superfícies mais bem espaçadas.
- Contato: pôster imersivo de roxo profundo e luz violeta, com arcos amplos e uma ação em amarelo.

Tokens adicionais: pérola #F5F0FA, ametista #AE84DD, lavanda #D7C4F0, uva #2D1645, luz quente #FFF1BA e branco quente #FFFDF7. Os quatro tons aprovados seguem reconhecíveis.

Implementação: `atmosphere.css` concentra a direção de luz e materiais; `styles.css` conserva a estrutura e escala. Elementos decorativos próprios, sem imagens externas e sem bibliotecas novas. As formas ficam atrás do conteúdo, sem receber eventos ou participar da árvore acessível. Movimento curto de entrada nas camadas; nenhum loop de fundo ou renderização contínua. Movimento reduzido preserva a composição estática.

Processo: registrar o estado atual, implementar uma primeira direção no código, revisar capturas reais em desktop/mobile, ajustar intensidade, composição, contraste e encaixes, executar a suíte existente e atualizar a imagem OG. O relatório em `docs/qa/ATMOSPHERES.md` registra as comparações e o resultado.

Tipo: service / portfólio pessoal de desenvolvimento de software.
Paleta do cliente: #6410C9, #FFDF00, #E9E9E9, #17121F. Hero editorial dividido, card autoral do guitarrista, projetos em composições distintas e encerramento tipográfico.

## Conceito e público

Joaquim está construindo sua trajetória na engenharia de software. A página permite a recrutadores e potenciais clientes examinar trabalhos reais, distinguir trabalhos em equipe de experimentos pessoais e entrar em contato pelas redes confirmadas. A ação principal é “Ver projetos”.

A personalidade vem do contraste entre uma composição editorial organizada e a energia do guitarrista aprovado. O personagem tem seu próprio card e suas próprias cores, sem virar tema de videogame para o resto da página. Não redesenhar, filtrar ou distorcer os arquivos fornecidos.

## Tokens e tipografia

- Fundo principal cinza #E9E9E9; superfície #F5F3F7; tinta #17121F; texto secundário #625C69.
- Roxo #6410C9 na identidade, CTA e encerramento; amarelo #FFDF00 em pequenas marcas e estados com texto carvão. Amarelo nunca é texto sobre cinza.
- Syne variável para títulos: desenho largo e incisivo, evocando cartazes musicais. DM Sans variável no corpo e navegação. Arquivos locais via Fontsource, licenças OFL.
- Escala desktop: nome 104–128 px; título de seção 56–72 px; cases 36–56 px; corpo 17–18 px; metadados 13–14 px. Mobile: nome 58–104 px conforme a largura disponível, seções 38–44 px, corpo 15–16 px.
- Conteúdo com largura máxima 1280 px; margens simétricas 64–80 px desktop, 24 px mobile. Grid de 12 colunas; espaçamentos 4/8/12/16/24/32/48/64/96/128.
- Cantos de 8 px em controles, 16 px em imagens e 24 px no card do personagem. Uma família de links e de botões. Alvos mínimos de 44 px.

## Composição

```
Marca                          Projetos  Sobre  Contato
Apresentação                   Card do guitarrista
Joaquim                        Personagem aprovado
Moura.                         Pausar / GitHub / LinkedIn
Área + contexto + Ver projetos
FIAP 2026–2029                 Desenvolvimento de software

Projetos selecionados          Contexto curto
Zeryon: captura ampla          Texto + case
Naruto: texto + case           Captura do grafo
Cityzer: status e conceito em composição tipográfica
Desenvolvimento web: Entrear e Lâmina lado a lado
Sobre: texto editorial         Formação e ferramentas verificadas
Contato: título grande e links confirmados
```

Os quatro grupos seguem a ordem do briefing. A página principal resume; um diálogo nativo apresenta objetivo, solução, contribuição e fontes. Sem navegação para páginas inexistentes. Cityzer é conteúdo tipográfico com status, sem mapa falso nem screenshot inventada. Cases em dados tipados permitem atualização sem reescrever componentes.

## Voz e honestidade

Voz direta, primeira pessoa na apresentação, descrições específicas dos projetos. Sem métricas, promessas comerciais, clientes inventados ou atribuição individual de trabalho coletivo. Formação e intenção profissional vêm do briefing; tecnologias e funções vêm do código/deploy. Veja PROJECT_RESEARCH.md.

## Movimento

Referências: Jakub para acabamento, Jhey para a personalidade do personagem; contenção nas ações frequentes. Entrada única de 500–650 ms no hero com deslocamento curto e opacidade, sem desfocar o pixel art. Projetos revelam a imagem uma vez, sem mover cada parágrafo. Hovers pequenos (imagem 1.025, setas 3 px, botão 2 px); feedback imediato no teclado. Rolagem nativa. Sem GSAP: CSS + IntersectionObserver atendem à proposta com menos dependências.

O guitarrista usa WebP animado original e PNG original em movimento reduzido, quando pausado ou fora da viewport. Controle de pausa acessível, sem áudio. prefers-reduced-motion desliga entradas, revelações e smooth scroll; nenhum conteúdo depende de animação para existir.

## Autocrítica e decisões particulares

Quatro cartões idênticos, um painel SaaS fictício e uma nuvem de tags produziriam um portfólio intercambiável. Foram substituídos por capturas verificáveis, variação de escala, cases com autoria explícita e o card do guitarrista. Sem barras de habilidades, estatísticas ou seção de depoimentos. A cor é a escolhida por Joaquim, não uma paleta sorteada.

## Aplicação das skills

design-taste-frontend e design-motion-principles lidas; Sites aplicado no modo local, sem registro/publicação. Documentações públicas frontend-design, vercel-react-best-practices e web-design-guidelines consultadas porque não estão instaladas. Scripts de terceiros não são executados após download.

As restrições genéricas da taste skill que banem roxo, exigem fotos de pessoas, sorteio do layout/paleta, assets do kit ou alturas fixas cedem ao briefing explícito: identidade aprovada, captura real, arquitetura React e responsividade orientada ao conteúdo. O mesmo vale para exigir confirmação estética: o usuário autorizou decisões autônomas. A validação Playwright solicitada prevalece sobre a preferência por apenas scripts da skill.
