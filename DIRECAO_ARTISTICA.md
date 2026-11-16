# Três versões de mim

## O recomeço

A interface anterior foi retirada do código ativo e arquivada em `docs/archive/interface-anterior/`. A configuração React/TypeScript/Vite, as fontes locais e as capturas verificadas dos projetos são reaproveitadas; composição, navegação, narrativa e sistema gráfico foram refeitos. O briefing atual substitui as orientações comerciais e a curadoria textual anteriores.

## Três propostas implementadas

Protótipos reais, isolados em `explorations/`, abertos no Vite em `/explorations/?concept=playground`, `?concept=zine` e `?concept=worlds`. Cada um permite selecionar os três GIFs e inclui abertura + fragmento da galeria. Não são entradas do build de produção. Capturas em `docs/qa/personas/concepts/`.

| Proposta | Tipografia e composição | Formas, cor e movimento | Avaliação após as capturas |
| --- | --- | --- | --- |
| A · Character Playground | Nome em duas linhas, personagens satélites e palco central; Syne + DM Sans, nota em Georgia itálica | Colagem e contornos elétricos; bases roxa/lilás/verde por persona; deslocamentos curtos | Mais espontânea, porém as miniaturas grandes competem com o personagem ativo. O glow aproximava a proposta da decoração da versão rejeitada. |
| B · Digital Zine | Masthead quebrado, retrato em painel e índice lateral; contraste entre Syne e Georgia | Papel creme, manchas de tinta, painel inclinado, troca editorial | Melhor caráter de publicação independente; a divisão de “JOA/QUIM” é rígida e a leitura móvel exige muitas adaptações. |
| C · Three Personal Worlds | Assinatura tipográfica grande, personagem no centro, seletor integrado e galeria com respiro | Sound com recorte elétrico, Impact com planos diagonais, Court com linhas de quadra; transições por camadas | Melhor combinação entre identidade pessoal, descoberta dos personagens e navegação estável. O protótipo cortava o título no mobile e não enquadrava bem os fundos opacos: ambos precisam ser resolvidos no produto final. |

## Direção escolhida: C

O personagem muda o lugar inteiro, em vez de funcionar como ilustração de uma apresentação profissional. A estrutura funcional é compartilhada, com cenografias, materiais, curvas de transição e detalhes próprios em cada universo. A tipografia editorial de B entra apenas nos pequenos contrapontos itálicos; a colagem de A não é levada integralmente para a página.

- **Sound:** fundo uva quase preto, assinatura amarela, recorte roxo incisivo e linha gráfica que lembra ritmo. Sem névoa de glows ou instrumentos decorativos adicionais.
- **Impact:** papel lilás e azul, planos dourados, diagonais e cantos tensos. O GIF opaco conserva seu campo lilás, integrado como uma peça impressa. A transição é mais curta e firme.
- **Court:** verde profundo, cal e branco suave; trajetórias curvas, marcações abstratas e folhas. O fundo preto do GIF é preservado e assumido como uma janela gráfica, com enquadramento próprio.

O conteúdo dos projetos é exclusivamente nome, captura real, link e rótulos de status/contexto indispensáveis. Não existem cases, descrições técnicas ou listas de competências. Cityzer recebe uma capa abstrata identificada “Em desenvolvimento”, sem link inventado.

## Sistema e interação

Syne variável para assinatura e títulos; DM Sans variável para leitura; Georgia itálica somente em anotações pessoais. Cores e timing em tokens semânticos centralizados em `src/data/personas.ts` e nas variáveis de tema. Conteúdo em `src/data/projects.ts`, independente da persona.

O seletor usa pôsteres derivados do primeiro frame original; só o personagem ativo pode usar GIF. A seleção global persiste com fallback seguro e é restaurada no `head` antes do React. Uma troca não muda altura, ordem de conteúdo nem rolagem. Camadas de personagem usam transições CSS interrompíveis e as cenografias são decorativas, sem capturar eventos. Movimento reduzido mostra o pôster e troca sem deslocamento; a pausa manual continua disponível. Não há áudio.

O seletor principal faz parte da abertura. Um acesso discreto no cabeçalho permanece disponível ao longo da página, sem barra flutuante de jogo. Todas as opções têm estado acessível, teclado e área de toque adequada.

## Skills e precedência

design-taste-frontend e design-motion-principles foram lidas e aplicadas na exploração, hierarquia, movimento, contraste e revisão. As referências públicas de frontend-design/React/Vercel já consultadas na sessão orientam a implementação; não são anunciadas como skills instaladas. O pedido explícito de universo pessoal, três protótipos, três paletas, pixel art e galeria visual prevalece sobre receitas de site comercial, sorteios de layout, proibição genérica de roxo e exigência de textos comerciais. A revisão ocorre em Playwright real.

## Refinamentos a partir do navegador

O nome foi ajustado para caber inteiro no smartphone, e o personagem passou ao primeiro plano na sobreposição tipográfica. O boxeador ganhou margem e moldura alinhadas ao fundo lilás original; a janela preta do tenista foi assumida com contorno cal e plano verde deslocado. A quadra recebeu preenchimento mais leve para preservar a leitura do nome.

Na rodada seguinte, os testes de contraste levaram a um fundo sólido sob o status de Cityzer e a letreiros mais legíveis. Os rótulos do seletor passaram a incluir os números visíveis. Capturas de notebook/tablet revelaram interferência do recorte Sound na legenda e da anotação lateral no controle de pausa: o primeiro passou a responder à escala do personagem, e a segunda foi retirada das larguras menores. Os letreiros parcialmente encobertos de Impact/Court foram retirados do mobile. A cenografia continua diferente sem depender dessas palavras.

Cada ambiente também recebeu entrada própria dos seus elementos: pequeno giro do recorte elétrico, assentamento dos planos diagonais e deslocamento curvo da quadra/folha. Não há animação ambiental permanente; só o GIF permanece em loop quando visível e permitido.

Resultados, capturas reais e limites: [docs/qa/personas/REPORT.md](docs/qa/personas/REPORT.md).
