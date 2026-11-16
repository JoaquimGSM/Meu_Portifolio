GATE: ERROR (the copy (the page showed no <main>, <section> or <h1> to lint); consistency.mjs could not walk 1440, 390; check.mjs could not run (exit 2: check: timed out))

# Relatório de qualidade e revisão visual

Este documento registra a primeira entrega. A transformação visual posterior, seus testes atuais e as capturas mais recentes estão em [ATMOSPHERES.md](ATMOSPHERES.md).

Entrega local em 16/11/2026. Sem commits, push, registro de hospedagem ou deploy.

## Resultado da aplicação

Aplicação React + TypeScript + Vite construída em modo de produção, com quatro grupos de projetos na ordem solicitada, cinco cases, navegação móvel, contato confirmado e avatar aprovado preservado. Conteúdos estruturados em `src/data/projects.ts`, sem backend desnecessário.

## Verificação executada

| Verificação | Resultado |
| --- | --- |
| `npm run build` | Aprovado, incluindo checagem TypeScript e saída `dist/` |
| `npm run dev` | Servidor Vite iniciado e resposta HTTP 200 confirmada |
| `npm run typecheck` | Aprovado |
| `npm run lint` | Aprovado, sem avisos |
| `npm test` | 13 testes aprovados em Edge/Chromium |
| Axe WCAG 2.2 AA | Zero violações detectadas na página e nos cinco cases em 360 e 1440 px |
| Axe no menu móvel aberto | Zero violações detectadas |
| Responsividade automatizada | 320, 360, 768 e 1440 px; sem overflow horizontal |
| Capturas reais | 360, 390, 768, 1024 e 1440 px; fontes carregadas, nenhuma imagem quebrada |
| Interação | Cinco cases, Tab/Shift+Tab, Escape, foco restaurado, menu e navegação por âncoras |
| Personagem | Pausa, retomada, pausa fora da viewport e PNG em movimento reduzido |
| Originais | SHA-256 idênticos para PNG, GIF e WebP; bloco ANIM/frames do WebP confirmado |
| Console | Nenhum erro JavaScript observado nas larguras testadas |
| Links | Destinos internos existentes; URLs externas corretas; quatro deploys responderam HTTP 200 no navegador |

Asserções reproduzíveis em `tests/portfolio.spec.ts`; saída completa em `test-results.json`. Revisão independente em `INDEPENDENT_REVIEW.md`. Arquivos de captura e evidências não entram em `dist/`.

## Revisão visual: antes e depois

As capturas foram abertas e examinadas, não apenas geradas. Foram feitas três etapas com a mesma hierarquia e os mesmos assets.

1. **Primeira composição (`before/`)**: confirmou tipografia, contraste, escala do personagem e hierarquia. Identificou overflow em 360 px, causado por largura mínima do título/grid. O título Naruto perdia a separação das palavras quando o `<br>` era oculto. A captura full-page também foi feita antes de todas as imagens lazy terem sido visitadas.
2. **Refinamento (`refined/`)**: corrigiu o grid e as escalas móveis, compactou o card para que links sociais apareçam perto da abertura e melhorou o carregamento das capturas com rolagem real + `decode()`. Corrigiu o whitespace no texto de Projetos e no título Naruto, e manteve Cityzer em duas linhas no tablet.
3. **Resultado final (`final/`)**: aumentou metadados pequenos, manteve margens simétricas e separou cabeçalho/captura do case em duas colunas no desktop para trazer a narrativa para a primeira tela do diálogo. O botão Fechar acompanha a rolagem. Um ajuste adicional na escala do título evita invasão da imagem no case Naruto em tablet. Contenção explícita de foco corrigiu a saída de Tab para o chrome do Edge no case de um único controle.

Capturas principais:

- [Desktop final](final/1440-full.jpg) e [abertura desktop](final/1440-hero.png).
- [Celular final](final/390-full.jpg) e [abertura 360 px](final/360-hero.png).
- [Tablet](final/768-full.jpg).
- [Case desktop](final/1440-case.png) e [case móvel](final/390-case.png).
- [Antes em 360 px](before/360-hero.png), para comparação do enquadramento.

`final/measurements.json` registra largura da página igual à viewport e nenhuma imagem quebrada nos cinco tamanhos. O card usa o arquivo aprovado com proporção e transparência, sem redesenho ou tratamento destrutivo. O WebP original é utilizado em movimento normal; as capturas de layout usam movimento reduzido para tornar a comparação estável.

## Desempenho

Medição de laboratório no preview de produção: Edge headless, viewport 390×844, cache desabilitado, CPU 4×, localhost sem limitação de rede. O registro final em `performance.json` mediu LCP de 996 ms, CLS 0 e cerca de 0,50 MB transferidos na abertura. Isso não é uma nota Lighthouse nem uma previsão de desempenho em rede móvel real.

O JavaScript principal tem aproximadamente 246 kB (77 kB gzip); o diálogo é um chunk separado de aproximadamente 2,2 kB. Duas fontes WOFF2 locais totalizam cerca de 72 kB. Imagens abaixo da abertura usam lazy loading e dimensões explícitas; o personagem animado original pesa 232 kB. Nenhuma biblioteca de animação ou canvas foi adicionada ao portfólio.

Lighthouse não estava instalado e não foi apresentado como executado. O verificador próprio da skill de design não conseguiu percorrer a aplicação em seu servidor e terminou por timeout. A linha exata está no início deste relatório. Não houve PASS dessa ferramenta, não foram criadas waivers nem alterados os arquivos da skill, e ela não foi repetida após o erro, conforme suas instruções. A verificação funcional/visual foi realizada separadamente no preview Vite com Playwright.

## Fontes e testes dos projetos reais

- Os repositórios corretos de Zeryon e Naruto foram identificados e inspecionados; detalhes em `../PROJECT_RESEARCH.md`.
- Os quatro deploys foram abertos no navegador; capturas reais em `public/projects/` e resultados em `../research/deploys.json`.
- Zeryon: quiz de 10 perguntas distintas, nome editável, salvamento e persistência após reload verificados no navegador.
- Naruto: seleção de dois personagens, criação de conexão e edição da justificativa verificadas no navegador.
- Evidências adicionais: `../research/interaction-checks.json`, `zeryon-interaction.png` e `naruto-interaction.png`. Contextos descartáveis e nenhuma alteração nos projetos remotos.

## Limites e decisões de conteúdo

- Cityzer continua em desenvolvimento, com atualização prevista em 19/11/2026. Não há link, screenshot, stack ou recurso entregue inventado.
- Os repositórios de Entrear e Lâmina não foram identificados; botões de código omitidos. TypeScript e OGL de Lâmina não foram confirmados; não constam do case. TypeScript aparece nas ferramentas porque este próprio portfólio o utiliza.
- Zeryon é apresentado como trabalho coletivo, com os cinco integrantes confirmados no README; não foi inventada uma divisão de tarefas.
- Entrear e Lâmina são identificados como demonstrações de empresas fictícias. As cenas de Lâmina não são apresentadas como fotografias de obras reais.
- Sem e-mail público confirmado, o contato usa apenas as duas redes fornecidas. Sem formulário de envio simulado.
- O domínio final ainda não foi escolhido. `canonical`, `og:url` e URLs absolutas de compartilhamento devem ser configuradas no deploy manual. A imagem OG local e o favicon existem.
- Testes foram realizados em Edge/Chromium. Safari, Firefox, leitores de tela, dispositivos físicos e desempenho de produção não foram verificados; zero violações Axe não significa auditoria integral de acessibilidade.
- Não houve fatos, preços, métricas, clientes, depoimentos ou credenciais presumidos. A escolha de paleta, fontes, grid e movimento está em `../DESIGN.md`.

## Revisão das skills

Foram lidas design-taste-frontend, design-motion-principles e Sites em modo local. As três referências prioritárias não estavam instaladas: suas documentações públicas foram consultadas diretamente em fontes oficiais ([Anthropic](https://github.com/anthropics/skills/tree/main/skills/frontend-design), [React/Vercel](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices), [interfaces/Vercel](https://github.com/vercel-labs/web-interface-guidelines)). Não foram instaladas nem executadas como scripts remotos.

A revisão manual confirmou HTML semântico, nomes acessíveis, foco visível, alvos de ação utilizáveis, dimensões de imagens, movimento reduzido e limpeza de observers/listeners. O movimento prioriza acabamento e expressão pontual, com contenção em ações frequentes. As exigências explícitas do briefing prevaleceram sobre sugestões genéricas de paleta, layout, fotografias, quantidade de animações ou confirmação estética.
