# Joaquim Moura — Portfólio pixel

Portfólio pessoal em React, TypeScript e Vite. A direção atual segue o pedido direto do autor e o texto preservado em [BRIEFING_PIXEL.md](BRIEFING_PIXEL.md).

## Abrir localmente

Node.js 22.12+ e npm; validado com Node 24 no Windows.

```bash
npm ci
npm run dev
```

Abra a URL informada pelo Vite, normalmente http://127.0.0.1:5173. No PowerShell com execução de scripts bloqueada, use `npm.cmd` no lugar de `npm`.

```bash
npm run build
npm run typecheck
npm run lint
npm test
npm run verify:assets
```

O teste abre ou reutiliza um preview na porta 4173 e usa Microsoft Edge instalado (`channel: msedge`). Faça o build antes de testar. Para outro ambiente, configure um navegador disponível no `playwright.config.ts`.

## Interface atual

- Hero com Joaquim Moura, Engenharia de Software — FIAP, 2026–2029, e desenvolvimento de software/front-end.
- Card com GIF original, pausa, seletor de três personagens e GitHub/LinkedIn.
- Projetos imediatamente após o hero: Zeryon Photo Profile, Naruto Connections, Cityzer, Entrear e Lâmina.
- Nome, imagem real, link e contexto mínimo nos projetos. Descrições e tecnologias futuras continuam vazias.
- Sobre breve, com nome completo e interesses reais; rodapé simples.
- Press Start 2P nos títulos e detalhes; DM Sans para leitura. Ambas locais, com licenças OFL.
- Grades, checker, sombras sem desfoque, bordas, setas e cenografias em pixel. Paletas fortes para guitarrista, boxeador e tenista.

A escolha muda apenas cores, padrões, cenografia, enquadramento do personagem e estados dos controles. As informações, a ordem dos projetos, os screenshots, os links e a geometria permanecem iguais.

Preferência persistida em localStorage, com fallback seguro e restauração no head antes do React. Só o GIF ativo anima; pôsteres originais nas miniaturas, na pausa e com movimento reduzido. A animação também para fora da viewport e com a aba oculta. Não há áudio, formulário ou analytics.

## Arquivos principais

```text
src/components/PersonalWorld.tsx    Hero e card com redes
src/components/CharacterStage.tsx   GIF original e controle de pausa
src/components/PersonaSelector.tsx  Seleção acessível
src/components/WorldScenery.tsx     Camadas decorativas em pixel
src/components/ProjectGallery.tsx   Cinco projetos em uma galeria
src/components/PersonalNote.tsx     Informações pessoais breves
src/components/PersonalFooter.tsx   Rodapé simples
src/context/PersonaContext.tsx      Preferência global e persistência
src/data/personas.ts               Arquivos e transições dos personagens
src/data/projects.ts               Dados e links únicos dos projetos
src/styles.css                     Paletas, pixel UI e responsividade
src/fonts.css                      Fontes locais
public/personagens/                Três GIFs e pôsteres originais
public/projects/                   Capturas reais dos projetos
```

Para editar um projeto, altere seu objeto em `src/data/projects.ts`. Cityzer permanece em desenvolvimento, com uma capa gráfica identificada e nenhum link inventado. Quando existir uma versão confirmada, atualize `status`, `image`, `imageAlt` e `url`, registre as fontes e ajuste o teste que hoje exige ausência de screenshot/link. Não há publicação ou mudança de status automática.

`verify:assets` compara os SHA-256 aprovados e verifica nove frames por GIF. Boxeador e tenista mantêm seus fundos opacos lilás/preto. Nenhum filtro ou blend foi aplicado aos personagens ou screenshots. Os assets anteriores em `assets/` e `public/personagem/` permanecem preservados.

## Capturas e QA

Com o build atualizado e `npm run preview -- --port 4173 --strictPort` em execução:

```bash
npm run qa:screenshots
node scripts/performance.mjs
```

Capturas atuais em `docs/qa/pixel/final/`, com os três personagens em 1440, 1280, 1024, 768, 390 e 320 px. O script aguarda as imagens serem pintadas e usa contextos novos para evitar artefatos do Edge em screenshots longas.

O comando atualiza `public/og-cover.jpg`. Faça um novo build depois para incluí-la no `dist/`. Resultado funcional em `docs/qa/pixel/test-results.json` e verificação dos GIFs em `docs/qa/pixel/verified-assets.json`.

[Direção atual](DIRECAO_ARTISTICA.md) · [Relatório e capturas](docs/qa/pixel/REPORT.md) · [Pesquisa dos projetos](docs/PROJECT_RESEARCH.md) · [Licenças](docs/LICENSES.md).

Os registros em `docs/qa/personas/`, `docs/qa/ATMOSPHERES.md`, `docs/DESIGN.md` e os protótipos de `explorations/` pertencem a direções anteriores. Os protótipos estão isolados do build de produção; não representam o layout atual.

`scripts/capture-projects.mjs` renova os screenshots por rede; não é necessário executá-lo a cada build. Os links e as imagens já verificados foram preservados. Entrear e Lâmina são demonstrativos, sem alegação de clientes reais. A contribuição individual no trabalho em equipe Zeryon não foi inventada. Não há e-mail ou telefone presumido.

## Build para revisão e publicação posterior

A saída estática fica em `dist/`. Na publicação manual, use preset Vite, instalação `npm ci`, build `npm run build`, saída `dist`, Node 22 ou 24. Depois de escolher o domínio, configure canonical, og:url e a URL absoluta de og:image em `index.html`.

Nenhum commit, push ou deploy é realizado por estes scripts de desenvolvimento e revisão.
