# QA — portfólio pixel

Revisão de 16/11/2026. Este relatório descreve a direção atual, conforme [BRIEFING_PIXEL.md](../../../BRIEFING_PIXEL.md). Os registros de `docs/qa/personas/` pertencem à interface anterior.

## Resultado

Hero com nome, informações reais e card do personagem; GitHub/LinkedIn no card; cinco projetos imediatamente depois; Sobre curto e rodapé simples. Press Start 2P local, padrões pixelados, cores fortes, bordas e sombras retas.

A troca de personagem altera somente a identidade visual. Um teste compara o conteúdo completo do hero, projetos, Sobre e rodapé nas três seleções; não houve alteração de textos ou ordem. O menu do cabeçalho continua acessível durante a rolagem.

## Capturas reais

Microsoft Edge headless, build de produção em localhost. Contexto novo por persona, fontes prontas, GIF ativo e imagens decodificadas/pintadas antes da captura. Sem montagem ou edição das screenshots.

| Personagem | Desktop | Notebook | Tablet | Celular |
| --- | --- | --- | --- | --- |
| Guitarrista | [1440 px](final/guitarrista-1440-full.jpg) | [1280 px](final/guitarrista-1280-full.jpg) | [768 px](final/guitarrista-768-full.jpg) | [390 px](final/guitarrista-390-full.jpg) |
| Boxeador | [1440 px](final/boxeador-1440-full.jpg) | [1280 px](final/boxeador-1280-full.jpg) | [768 px](final/boxeador-768-full.jpg) | [390 px](final/boxeador-390-full.jpg) |
| Tenista | [1440 px](final/tenista-1440-full.jpg) | [1280 px](final/tenista-1280-full.jpg) | [768 px](final/tenista-768-full.jpg) | [390 px](final/tenista-390-full.jpg) |

Também foram capturadas as três opções em 1024 × 768 e 320 × 800. São 18 combinações, com captura da abertura e da página inteira em cada uma. Nenhum erro JavaScript de página, imagem quebrada ou overflow horizontal nas medidas coletadas; exatamente um GIF ativo na abertura. [Medidas](final/measurements.json).

## Refinamento visual

A primeira rodada está em `first-pass/`, com desktop e celular dos três personagens. A revisão confirmou a tipografia, o card e a apresentação imediata dos projetos. Em seguida:

- A seleção ganhou borda escura, sombra de dois pixels e marcador em degrau. Isso melhora sua leitura nos cartões lilás e verde-claro.
- A tipografia do nome recebeu renderização geométrica, mantendo a leitura da fonte pixel.
- As larguras 1024, 768 e 320 px foram inspecionadas em capturas adicionais. Card, formação e redes mantiveram espaço próprio, e a grade passou a duas/uma colunas conforme a tela.
- Os fundos opacos dos GIFs foram integrados ao card: lilás no boxeador, preto no tenista. Os pixels e frames dos arquivos permanecem intactos.
- O favicon passou a usar as iniciais em desenho pixelado.

## Checks executados

- `npm run build`: TypeScript e Vite concluídos.
- `npm run lint`: sem erros.
- `npm run verify:assets`: três hashes aprovados, nove frames por GIF e três pôsteres PNG válidos.
- `npm test`: **17 testes passaram**, nenhum ignorado, falho ou instável; sem retries.

[Resultado estruturado](test-results.json) · [Verificação dos GIFs](verified-assets.json).

A suíte cobre os três personagens em 320, 360, 768, 1024, 1280 e 1440 px, imagens e links locais, ausência de descrições/cases, Cityzer em desenvolvimento, websites demonstrativos, seleção rápida e interrompida, conteúdo invariável, posição/altura/scroll, ausência de reload, persistência e restauração no head antes do React.

Também cobre armazenamento bloqueado, toque móvel emulado, skip link, Enter/Escape e retorno de foco no popover, animação real dos três GIFs por comparação temporal, pausa manual/automática e movimento reduzido. O teste de cliques rápidos usa posições reais do ponteiro para evitar a rolagem adicional provocada pelo próprio `Locator.click()` do Edge/Playwright.

Auditorias axe em 360 e 1440 px, nas três seleções e com o menu aberto, passaram sem violações nas regras executadas, incluindo WCAG AA. Isso não é uma certificação integral de acessibilidade.

## Desempenho de laboratório

Edge headless, localhost, cache desabilitado, CPU limitada a 4×, viewport 390 × 844. LCP de 684 ms, CLS inicial de 0,0000087 e aproximadamente 1,02 MB transferidos, incluindo GIF original, pôsteres e primeiras imagens de projetos. JS de produção: 73,05 kB gzip; CSS: 5,40 kB gzip. Fonte pixel: 12,51 kB; DM Sans: 36,93 kB.

Nas três trocas medidas, a mediana do intervalo de frames foi 16,7 ms, percentil 95 entre 16,8 e 16,8 ms e média entre 55 e 60 frames/s sob limitação de CPU. Houve um intervalo máximo de 66,6 ms na primeira troca para o boxeador. Scroll e altura permaneceram estáveis e apenas um GIF ficou ativo.

São amostras curtas de laboratório, sem rede móvel simulada; não representam Lighthouse ou desempenho garantido em aparelhos físicos. [Dados completos](final/performance.json).

## Dados e limites

Os três GIFs correspondem aos arquivos do kit aprovado. Nenhum personagem foi recriado ou filtrado. As capturas reais e URLs dos projetos já verificadas no workspace foram preservadas; não foi alegada nova inspeção dos fluxos externos nesta rodada. Evidências e limites de autoria em [PROJECT_RESEARCH.md](../../PROJECT_RESEARCH.md).

Cityzer continua sem imagem de sistema ou link não confirmado. Entrear e Lâmina são websites demonstrativos. Descrições e tecnologias futuras continuam vazias. Não foram adicionados clientes, conquistas, experiências profissionais, métricas ou contatos presumidos.

Revisão em Edge Chromium no Windows, com viewport e toque emulados. Safari, Firefox, leitores de tela e dispositivos físicos não foram executados. Popover API exige navegador moderno. Preferência salva é opcional e falhas de armazenamento não impedem o uso.

Nenhum commit, push ou deploy foi realizado.
