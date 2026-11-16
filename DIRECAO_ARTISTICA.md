# Portfólio pixel — direção atual

O pedido direto do autor e [BRIEFING_PIXEL.md](BRIEFING_PIXEL.md) definem a versão atual: um portfólio pessoal pixelado, colorido, com informações diretas e card do personagem. As explorações editoriais anteriores são registros históricos em `docs/qa/personas/`.

## Estrutura

Cabeçalho com JM, Projetos, Sobre e acesso à seleção. Hero em duas colunas no desktop: nome/informações e card. No mobile, informações primeiro e card em seguida. O card reúne personagem animado, pausa, miniaturas e GitHub/LinkedIn.

A seção Projetos vem imediatamente depois. As duas primeiras capturas ocupam metade da grade no desktop, e os três itens seguintes dividem a segunda linha. Em telas menores a grade se adapta até uma coluna. Sobre é uma faixa breve com fatos; o rodapé contém apenas nome, redes e retorno ao topo.

## Linguagem pixel

Press Start 2P para nome, títulos, marca e barras de janela. DM Sans para informações e controles pequenos, mantendo leitura nítida. Pixel art original preservada, sem redesenho ou modificação de frames.

A interface usa bordas retas, sombras deslocadas sem blur, ícones desenhados na grade, miniaturas pixeladas e estados selecionados de alto contraste. O fundo recebe grade discreta, checker e grandes massas com contorno em degraus. Não há frases decorativas, índices com marca conceitual ou slogans.

## Identidades por personagem

| Personagem | Paleta | Cenografia do card e fundo |
| --- | --- | --- |
| Guitarrista | Roxo elétrico #6410C9, amarelo #FFDF00, uva #21132F, lavanda | Equalizador em blocos, sinais elétricos pixelados, mosaico e grade |
| Boxeador | Dourado #F6C934, azul #274C9B, lilás e azul claro | Molduras tensas e angulares, cantos em bloco, checker azul/dourado; fundo lilás original do GIF |
| Tenista | Verde #165A40, cal #D3EE72, verde escuro e branco suave | Quadra retilínea, bola octogonal e folhas em degraus; fundo preto original do GIF |

O conteúdo é único e invariável entre as três opções, inclusive nome, formação, textos, ordem, imagens e links. A seleção não cria uma narrativa diferente nem reorganiza a página.

## Interação e movimento

Transições interrompíveis de 200–280 ms, respostas de hover curtas e deslocamento de poucos pixels nos controles. Entrada única de 280 ms. O loop é o próprio GIF aprovado, com pausa manual e automática. Sem movimento ambiental contínuo, áudio ou scroll controlado por script.

Movimento reduzido desliga as transições e usa o pôster original. Persistência segura, restauração no head e Popover API nativa no menu do cabeçalho. Acesso a qualquer personagem continua disponível ao rolar a página.

## Aplicação das skills

`design-taste-frontend`, `design-motion-principles` e orientação local de `sites` foram consultadas. Os princípios úteis de leitura, contraste, imagens reais, resposta dos controles e QA no navegador foram aplicados. O contexto do motion é portfólio pessoal: polimento de Jakub, linguagem lúdica de Jhey e respostas rápidas nos controles frequentes.

O briefing explícito fixa o hero com card, cores roxas e vivas, tipografia pixel e projetos imediatos. Essas escolhas prevalecem sobre receitas comerciais, sorteios de paleta/layout, seção obrigatoriamente com altura de tela e a proibição genérica de roxo da skill. O gate anterior da skill terminou com erro de ambiente e orienta não repetir; a validação atual usa testes Playwright e capturas reais reproduzíveis, sem alegar aprovação desse gate.

## Revisão

A primeira rodada de capturas confirmou o conjunto de títulos pixel, hero e grade de projetos nos três temas. O seletor ganhou sombra de dois pixels, borda escura e marcador em degrau para deixar a seleção mais clara, especialmente nos cartões lilás e verde-claro. A composição móvel mantém os textos curtos e as redes dentro do card.

Evidências e limitações em [docs/qa/pixel/REPORT.md](docs/qa/pixel/REPORT.md).
