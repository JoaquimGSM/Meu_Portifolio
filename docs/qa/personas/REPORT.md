# Revisão — três versões de Joaquim

Reformulação de 16/11/2026. Este relatório descreve a interface atual; os outros relatórios da pasta `docs/qa/` registram versões anteriores.

## Direção e exploração

Três protótipos funcionais, cada um com abertura, seletor dos três personagens e fragmento real de galeria, foram comparados no Edge em desktop e mobile. A escolha foi C / Three Personal Worlds: personagem central, assinatura tipográfica e ambientes gráficos reconhecíveis. A e B foram isolados em `explorations/`, fora do build de produção.

| Conceito | Desktop | Mobile |
| --- | --- | --- |
| A · Character Playground | [1440 px](concepts/playground-1440.jpg) | [390 px](concepts/playground-390.jpg) |
| B · Digital Zine | [1440 px](concepts/zine-1440.jpg) | [390 px](concepts/zine-390.jpg) |
| C · Three Personal Worlds | [1440 px](concepts/worlds-1440.jpg) | [390 px](concepts/worlds-390.jpg) |

A avaliação de tipografia, composição, cor e movimento está em [DIRECAO_ARTISTICA.md](../../../DIRECAO_ARTISTICA.md).

## Capturas reais da aplicação final

Playwright + Microsoft Edge headless, build de produção servido localmente. Sem montagem ou edição das screenshots. As capturas de página inteira cobrem abertura, galeria, sobre e rodapé.

Cada persona é capturada em um contexto novo, com as imagens decodificadas e pintadas antes da captura. Isso corrigiu um artefato do Edge nas capturas longas após reutilizar a mesma página entre temas; a galeria também foi conferida diretamente na viewport. As trocas entre temas continuam sendo testadas na mesma página pela suíte funcional.

| Ambiente | Desktop completo | Notebook | Tablet | Mobile completo |
| --- | --- | --- | --- | --- |
| Sound | [1440 × 1000](final/guitarrista-1440-full.jpg) | [1280 × 800](final/guitarrista-1280-full.jpg) | [768 × 1024](final/guitarrista-768-full.jpg) | [360 × 800](final/guitarrista-360-full.jpg) |
| Impact | [1440 × 1000](final/boxeador-1440-full.jpg) | [1280 × 800](final/boxeador-1280-full.jpg) | [768 × 1024](final/boxeador-768-full.jpg) | [360 × 800](final/boxeador-360-full.jpg) |
| Court | [1440 × 1000](final/tenista-1440-full.jpg) | [1280 × 800](final/tenista-1280-full.jpg) | [768 × 1024](final/tenista-768-full.jpg) | [360 × 800](final/tenista-360-full.jpg) |

Em todas as 12 combinações: nenhum erro JavaScript de página, nenhuma imagem quebrada, largura da página igual à viewport e exatamente um GIF ativo durante a abertura. Medidas: [measurements.json](final/measurements.json).

## Refinamento visual executado

1. Título móvel sem corte e personagem à frente da sobreposição tipográfica.
2. Fundos opacos originais integrados: moldura dourada/azul no boxeador e janela preta com contorno cal no tenista. A quadra ficou mais leve para não competir com o nome.
3. Quebra editorial no título de desenvolvimento web para o smartphone.
4. Status de Cityzer sobre fundo sólido e rótulos acessíveis correspondentes ao texto visível do seletor, incluindo seus números.
5. Letreiros com contraste reforçado no desktop; retirados no mobile quando ficavam parcialmente escondidos pelo personagem.
6. Anotação lateral retirada no tablet, após captura mostrar proximidade com a pausa. Recorte Sound dimensionado pelo palco para não cruzar sua legenda no notebook.
7. Transições próprias de recorte, planos e quadra; sem sequência acumulada nas trocas rápidas ou efeitos ambientais permanentes.

Evidências intermediárias em `first-pass/` e `refined/`. A rodada final substitui as imagens de `final/`.

## Validação funcional

`npm run build`, `npm run lint`, `npm run verify:assets` e `npm test` foram executados. A suíte atual contém 15 testes Playwright, sem retries:

- Três personas nas larguras 320, 360, 768, 1280 e 1440 px: títulos inteiros, ausência de overflow, imagens carregadas, galeria com cinco obras e quatro links.
- Trocas rápidas e interrompidas: estado final correto, um GIF, sem reload, mesma rolagem, altura total e posição da galeria.
- Persistência após reload e tema restaurado pelo head mesmo com o bundle React bloqueado no teste.
- Fallback com leitura/escrita de localStorage deliberadamente bloqueadas.
- Skip link, foco, escolha por Enter, Escape e retorno ao acionador do popover; troca pelo cabeçalho longe da abertura preserva scroll.
- Toque em contexto móvel emulado de 390 × 844 px.
- Os três GIFs mostraram frames diferentes em capturas temporais; pausa/reprodução manual e pausa fora da viewport funcionam.
- Movimento reduzido: pôsteres originais e nenhuma animação ambiental ativa.
- Axe em 360 e 1440 px, nos três mundos e com seletor aberto: zero violações nas auditorias executadas, incluindo regras WCAG AA. Isso não constitui certificação integral de acessibilidade.
- Hashes dos GIFs locais e igualdade dos bytes servidos no preview.

Resultado estruturado da última suíte: [test-results.json](../test-results.json). Os testes usam clique real por coordenadas no acesso fixo ao menu para evitar a rolagem adicional que o próprio `Locator.click()` do Playwright provocava em descendentes sticky; o comportamento real de ponteiro preservou a posição.

## Fidelidade dos personagens e conteúdo

Os três GIFs originais estão em `public/personagens/`, com os nomes exatos do briefing. Os hashes coincidem com os registrados ao extrair o kit; nove frames em cada arquivo e extensão de loop presentes. Nenhum pixel, filtro, blend, proporção ou frame do GIF foi alterado. Pôsteres PNG foram decodificados do primeiro frame original, não gerados como arte nova.

[Inventário inicial](assets.json) e [verificação final](verified-assets.json). Os assets aprovados da versão anterior também continuam preservados.

Os projetos usam dados únicos em `src/data/projects.ts`, sem descrição ou tecnologia preenchida. A interface contém apenas nomes, screenshots, links e rótulos mínimos. Cityzer é uma capa abstrata identificada, sem screenshot ou URL inventados. Entrear/Lâmina são demonstrativos. A pesquisa e as capturas reais anteriores foram mantidas: [PROJECT_RESEARCH.md](../../PROJECT_RESEARCH.md).

## Desempenho observado

Medição local no Edge, viewport 390 × 844, cache desabilitado e CPU limitada a 4×: LCP de 828 ms, CLS inicial de 0,000343 e aproximadamente 904 kB transferidos, incluindo personagem, pôsteres e primeiras capturas. JavaScript de produção: 73,77 kB gzip; CSS: 6,13 kB gzip. Nenhuma dependência nova.

Durante as três trocas, a mediana dos intervalos de frame foi 16,7 ms; o percentil 95 ficou entre 33,4 e 33,5 ms. A média observada ficou entre 44 e 49 frames/s sob essa limitação de CPU. Altura e scroll permaneceram iguais, com um GIF ativo. São amostras curtas de laboratório em localhost, sem simulação de rede móvel; não são uma pontuação Lighthouse nem uma garantia para dispositivos reais. Dados completos: [performance.json](final/performance.json).

## Rede e limites da revisão

Nesta rodada, novas navegações aos quatro deploys foram bloqueadas pelo ambiente (`net::ERR_NETWORK_ACCESS_DENIED`); a ferramenta web também não conseguiu abri-los. Isso não foi interpretado como indisponibilidade dos projetos. Foram mantidos os links, screenshots e evidências já confirmados na pesquisa de 16/11/2026. A suíte local confere os quatro hrefs exatos, mas não afirma que testou novamente os fluxos externos nesta rodada. Registro: [project-links.json](project-links.json).

A revisão foi feita em Edge Chromium no Windows e com emulação de viewport/toque. Safari, Firefox, leitores de tela e dispositivos físicos não foram executados. O menu usa Popover API nativa, suportada pelos navegadores modernos; não há suporte específico implementado para navegadores legados.

Não houve commit, push ou deploy.
