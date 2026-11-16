# Revisão independente de qualidade

Revisão em 16/11/2026, executada sobre o build local em `http://127.0.0.1:4173`, com Playwright e Microsoft Edge headless.

## Resultado automatizado

`npm.cmd test`: **13 testes aprovados em 27,9 segundos** na rodada final desta revisão.

- Larguras 320, 360, 768 e 1440 px: ausência de overflow horizontal, imagens carregadas com dimensões naturais e textos alternativos, destinos internos existentes, URLs externas reais e declaradas, nenhum link vazio ou fictício.
- Console e erros JavaScript: nenhum erro observado nas quatro larguras.
- Cinco cases nas quatro larguras: conteúdo, quantidade correta de links, abertura, bloqueio de rolagem do fundo, Tab/Shift+Tab, Escape, restauração de foco e modal contido na largura da viewport.
- Menu móvel: abertura, estado `aria-expanded`, Escape, restauração de foco, navegação para Projetos e fechamento.
- Personagem: WebP aprovado em movimento, pausa para PNG estático, retomada e pausa fora da viewport.
- Preferência de movimento reduzido: PNG estático efetivamente selecionado por `currentSrc`, nenhuma animação DOM em execução e abertura/fechamento dos cases preservados.
- Axe WCAG 2.2 AA: zero violações nas homepages e nos cinco cases, em 360 e 1440 px.
- Axe padrão no menu móvel aberto: zero violações.

Código reproduzível: `tests/portfolio.spec.ts`. Relatório de execução: `docs/qa/test-results.json`. As auditorias Axe completas são anexadas aos resultados dos respectivos testes.

## Correção verificada

A primeira rodada detectou que o ciclo de Tab no case Cityzer, cujo único elemento focável era Fechar, levava o foco para o chrome do Edge (`document.activeElement` se tornava `BODY`). O responsável pela implementação adicionou contenção explícita de foco aos diálogos. Os testes foram ampliados para percorrer Tab e Shift+Tab e passaram nas quatro larguras.

## Revisão visual das capturas

Foram inspecionadas `refined/1440-hero.png` e `refined/390-full.jpg`. O personagem aparece inteiro, a hierarquia do hero permanece clara e as seções têm leitura confortável em uma coluna. Foi apontada uma pequena falta de espaço no texto de abertura de Projetos em mobile, causada pelo `<br>` oculto; a implementação corrigiu o texto e a rodada final documentada em `REPORT.md` confirmou o resultado.

## Limites

Testes automatizados de acessibilidade não substituem avaliação com leitores de tela ou pessoas com deficiência. A revisão não afirma conformidade integral apenas pelo resultado do Axe. Os testes de links verificam destino e estrutura; a disponibilidade externa foi pesquisada separadamente, sem navegar para sites remotos durante esta rodada de QA local. O navegador foi Edge/Chromium; Safari e Firefox não foram executados.
