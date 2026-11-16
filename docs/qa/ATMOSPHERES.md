# Revisão de direção de arte: fundos e atmosferas

Revisão concluída em 16/11/2026 sobre o portfólio existente. O pedido atual e o briefing anexado guiaram a transformação visual; os dados dos projetos e os arquivos aprovados do personagem não foram alterados.

## Resultado

O fundo agora organiza a experiência com luz e curvas, alternando uma abertura perolada, galeria clara, ambiente noturno, horizonte conceitual e encerramento violeta. As massas de cor se concentram nas imagens e no personagem; a área de leitura recebe menor intensidade.

- **Hero:** campo perolado com luz quente e refração ametista; um arco com iluminação de borda cria profundidade atrás do card. No tablet, a forma se desloca à direita e perde intensidade junto do nome. No celular, a composição desce até o personagem.
- **Personagem:** moldura clara, palco iluminado, sombra difusa e base uva para os links. Desenho, pixels, cores, transparência e animação são os arquivos originais aprovados.
- **Zeryon:** captura real em moldura iluminada de roxo, com borda de luz e sombra colorida. O screenshot continua ocupando a maior parte do enquadramento.
- **Naruto:** campo uva/carvão, aura violeta e linhas gráficas de conexão; transição com curvas opostas nas extremidades. Texto e foco recebem contraste próprio para essa área escura.
- **Cityzer:** horizonte abstrato com luz difusa e traços delicados. A composição não simula um mapa ou uma versão entregue do projeto. O status continua “Em desenvolvimento”.
- **Entrear e Lâmina:** superfícies editoriais da mesma família, com luz quente e fria, respectivamente. A indicação de websites demonstrativos foi mantida.
- **Sobre:** mistura de luz quente e lilás, painel de formação translúcido e ferramentas distribuídas em duas colunas. Os marcadores são traços decorativos, sem aparência de controles selecionáveis.
- **Contato:** pôster violeta mais amplo, arcos contínuos e uma ação amarela claramente destacada. No celular, o fechamento conserva a escala e a leitura em uma coluna.

## Exploração e escolhas

As versões foram implementadas no código, abertas em Edge real por Playwright e inspecionadas visualmente.

| Etapa | Evidência | Decisão |
| --- | --- | --- |
| Estado inicial | [Desktop](atmospheres/before/1440-full.jpg), [mobile](atmospheres/before/390-full.jpg) | Conteúdo organizado, superfícies planas e pouco diálogo entre fundo e imagens. |
| Primeira direção | [Hero](atmospheres/exploration/1440-hero.png), [página](atmospheres/exploration/1440-full.jpg) | Validou a paleta ampliada e a alternância clara/escura. O arco era largo demais e os anéis de Cityzer competiam com o conteúdo. |
| Refinamento | [Hero](atmospheres/refined/1440-hero.png), [Cityzer](atmospheres/refined/1440-cityzer-feature.png) | Arco mais estreito com reflexos de borda; menos saturação perto do texto; horizonte no lugar das faixas grossas; moldura de Zeryon mais fina; fechamento mais espaçoso. |
| Consolidação | [Desktop final](atmospheres/final/1440-full.jpg), [mobile final](atmospheres/final/390-full.jpg), [tablet](atmospheres/final/768-hero.png) | Ajuste do arco no tablet, horizonte de Cityzer escurecido junto da data, controles validados e imagem OG renovada. |

Também foram inspecionadas capturas individuais de Zeryon, Naruto, Cityzer, estudos web, Sobre e Contato em `atmospheres/final/`. As capturas principais usam movimento reduzido para facilitar comparação. `1440-normal-motion.png` e `390-normal-motion.png` registram o personagem com o WebP animado efetivamente selecionado.

## Correções encontradas pelos testes

Uma camada decorativa de Cityzer ultrapassava sua região e podia interceptar o botão em 320/360 px. As decorações agora não recebem eventos; o recorte usa `overflow: clip`, evitando também rolagem programática interna causada pela forma fora do quadro. Os testes de abertura dos cinco cases e um teste adicional com toque emulado confirmaram a correção.

A auditoria do menu passou a aguardar o término da animação de abertura antes de analisar seu estado final. A leitura durante a transição gerava um apontamento sobre nomes de controles inertes do fundo. Nenhuma regra do Axe foi desativada e a auditoria continua abrangendo o menu completo.

## Validação final

| Verificação | Resultado |
| --- | --- |
| `npm run build` | Aprovado, saída estática atual em `dist/` |
| `npm run lint` | Sem erros ou avisos |
| `npm run typecheck` | Aprovado |
| `npm test` | **13 testes aprovados em 30,3 s** |
| Axe | Nenhuma violação detectada na página e nos cinco cases em 360/1440 px; menu aberto também aprovado |
| Layout automatizado | 320, 360, 768 e 1440 px; sem overflow horizontal |
| Capturas finais | 390, 768 e 1440 px; fontes carregadas, nenhuma imagem quebrada ou erro JavaScript |
| Teclado | Tab/Shift+Tab, ciclo de foco, Escape e retorno ao controle de origem preservados |
| Toque emulado em 360 px | Cityzer abre/fecha; menu abre e navega para Projetos |
| Movimento reduzido | Avatar estático, fundos sem animação e conteúdo disponível |
| Movimento normal | WebP original em desktop/mobile; pausa, retomada e pausa fora da viewport verificadas |
| Assets | SHA-256 dos três arquivos publicados continua idêntico ao dos originais |
| Conteúdo | Nenhuma alteração em `src/data/projects.ts`, `assets/` ou `public/personagem/` |

O resultado reproduzível da suíte está em `test-results.json`. As medidas das capturas estão em `atmospheres/final/measurements.json`.

## Custo e desempenho

Não foram adicionadas dependências, fotografias externas, imagens de fundo, canvas ou WebGL. Os fundos usam CSS e formas SVG próprias, com `aria-hidden` e sem interação. As duas entradas do fundo são finitas e usam opacidade/transformação; não existe loop decorativo contínuo ou listener novo de rolagem. O movimento reduzido mantém a composição em repouso.

No build final, CSS: **41,27 kB / 9,60 kB gzip**; JavaScript principal: **246,62 kB / 76,91 kB gzip**. O acréscimo em relação à base é de aproximadamente 3,9 kB gzip entre CSS e JavaScript.

A medição em `atmospheres/final/performance.json` registrou **LCP 1.340 ms**, **CLS 0** e **505.011 bytes** transferidos na abertura. Ambiente: Edge headless, viewport 390×844, cache desabilitado, CPU 4× e rede local sem limitação. Trata-se de uma medição de laboratório, não de Lighthouse ou dados de produção. Ela não estabelece um comparativo controlado com as medições históricas.

## Arquitetura e reprodução

- `src/atmosphere.css`: cores, gradientes, materiais, formas, estados e composição responsiva.
- `src/components/Atmosphere.tsx`: camadas decorativas reutilizadas na abertura, Naruto, Sobre e Contato.
- `src/styles.css`: estrutura, escala e organização original mantidas.
- `scripts/capture-atmospheres.mjs`: captura as versões e renova a imagem OG quando executado com `final`.

Com o preview de produção na porta 4173:

```bash
npm run qa:atmospheres
npm run build
node scripts/performance.mjs docs/qa/atmospheres/final/performance.json
```

O build após as capturas inclui a imagem OG renovada. Imagens de QA e documentação não entram no bundle.

## Limites

A revisão foi executada em Edge/Chromium; Safari, Firefox e aparelhos físicos não foram testados. Zero violações Axe não equivale a uma auditoria completa com leitores de tela. O gate adicional da skill que havia terminado por timeout na primeira entrega não foi repetido; as evidências desta revisão são os testes e as capturas do preview Vite.

Nenhum commit, push ou deploy foi executado. O projeto está pronto para revisão local e publicação manual pelo autor.
