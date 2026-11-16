# Portfólio de Joaquim Moura

Portfólio pessoal em português de Joaquim Gaspardo Souza Moura, estudante de Engenharia de Software na FIAP (2026–2029). Desenvolvido a partir de `PROMPT_MESTRE.md`, com personagem aprovado, conteúdo verificado e identidade roxo/amarelo/cinza.

## Executar localmente

Requer **Node.js 22.12+** (validado em Node 24) e npm.

```bash
npm ci
npm run dev
```

Abra a URL indicada pelo Vite, normalmente `http://127.0.0.1:5173`.

No PowerShell com execução de scripts bloqueada, use `npm.cmd` no lugar de `npm`; não é necessário alterar a política de execução do Windows.

```bash
npm run typecheck
npm run lint
npm run build
npm run preview
```

`dist/` contém a aplicação estática para publicação. Não há servidor de aplicação, banco, variáveis secretas, formulário com envio ou analytics.

## Stack e experiência

- React 19 + TypeScript + Vite; CSS organizado por componentes e tokens.
- Syne + DM Sans variáveis e hospedadas localmente, com licença OFL.
- WebP animado aprovado no hero, pausa manual e automática fora da viewport; PNG aprovado para movimento reduzido.
- Navegação por âncoras, menu móvel e cinco cases em diálogos nativos com Escape, ciclo de foco e retorno ao controle de origem.
- Quatro grupos: Zeryon; Naruto Connections; Cityzer; desenvolvimento web independente com Entrear e Lâmina.
- Capturas reais dos quatro projetos publicados. Cityzer usa uma composição tipográfica, sem inventar mapa, imagem ou link.
- Entradas breves, revelação pontual das imagens, feedback de hover/foco e rolagem nativa. Sem GSAP no portfólio: CSS e IntersectionObserver atendem à proposta.
- SEO básico, favicon e imagem OG. Configure o domínio e as URLs OG absolutas ao publicar; não há domínio inventado no código.

## Estrutura

```text
assets/                   Originais aprovados, preservados
public/personagem/        Cópias idênticas utilizadas pela aplicação
public/projects/          Capturas reais dos deploys
public/og-cover.jpg        Captura real da abertura para compartilhamento
src/components/           Hero, header, projetos, cases, sobre e contato
src/data/projects.ts      Conteúdo e links tipados de todos os cases
src/hooks/                Preferência de movimento e observação de imagens
src/utils/                Ciclo de foco dos diálogos
src/styles.css            Sistema visual e breakpoints
tests/                    Testes de navegação, acessibilidade e responsividade
scripts/                  Capturas e verificações reproduzíveis
docs/DESIGN.md            Direção de arte e decisões das skills
docs/PROJECT_RESEARCH.md  Fatos, fontes e limites da verificação
docs/qa/                  Capturas antes/depois e resultados de testes
```

## Testes e capturas

```bash
npm run build
npm test
npm run verify:assets
```

Playwright usa **Microsoft Edge instalado** (`channel: msedge`) para evitar baixar outro navegador. Em um sistema sem Edge, instale-o pelo Playwright com `npx playwright install msedge` ou ajuste `playwright.config.ts` para Chromium e execute `npx playwright install chromium`. No Linux/macOS, a configuração seleciona `npm`, no Windows `npm.cmd`.

Os testes iniciam o preview automaticamente em `http://127.0.0.1:4173`; se já houver um preview nessa porta, ele é reutilizado. Faça o build antes para testar os arquivos atuais.

Para repetir a revisão visual, mantenha o preview rodando nessa porta e execute:

```bash
node scripts/capture-portfolio.mjs final
node scripts/performance.mjs
```

As capturas ficam em `docs/qa/final/`; os registros iniciais e de refinamento ficam em `before/` e `refined/`. Capturas e testes não entram no bundle. O relatório `docs/qa/REPORT.md` documenta medidas, correções e limites. Testes automáticos não substituem uma revisão humana com leitores de tela e dispositivos físicos.

O script de capturas também renova `public/og-cover.jpg`. Rode `npm run build` novamente para incluir essa imagem atualizada em `dist/`.

`scripts/capture-projects.mjs` acessa os quatro deploys públicos para refazer as capturas originais; depende de rede e pode produzir imagens diferentes se os sites forem atualizados. Não o execute por rotina antes de cada build.

## Atualizar Cityzer em 19/11/2026

Edite apenas o objeto com `id: 'cityzer'` em `src/data/projects.ts`:

1. Confirme o funcionamento da versão publicada, as tecnologias e os créditos da equipe.
2. Troque `status` de `development` para `published`.
3. Atualize `summary`, `objective`, `solution`, `contribution`, `note` e `technologies` com fatos verificáveis.
4. Adicione `demo` e, se confirmado, `repository` com URLs reais.
5. Salve uma captura real em `public/projects/cityzer.jpg`; informe `image` e `imageAlt` no objeto.
6. Remova `updateDate` ou atualize a informação se ainda houver previsão futura.
7. Registre as fontes em `docs/PROJECT_RESEARCH.md` e rode os checks novamente. Atualize o teste que hoje garante ausência de imagem/link e rótulo “Em desenvolvimento”.

O mesmo componente passa a mostrar a captura no lugar da composição tipográfica. Não há publicação automática nem mudança de status baseada na data: a confirmação é manual.

## Publicar manualmente na Vercel

Nenhum commit, push, registro de Site ou deploy foi executado nesta entrega.

Quando aprovar o projeto, importe seu repositório na Vercel, selecione Vite e configure:

- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `dist`
- Node.js: 22 ou 24

Depois de definir o domínio, acrescente `canonical`, `og:url` e uma URL absoluta para `og:image` em `index.html`. A navegação usa âncoras e não exige regra de reescrita de rotas. A publicação pode ser feita pela interface da Vercel; nenhuma credencial faz parte do projeto.

## Honestidade e créditos

Zeryon é trabalho acadêmico em equipe: **Joaquim Gaspardo, Kelso Oliveira, Gabriel Flausino, Felipe Kenji e Gustavo Ducatti**, conforme o README público. A divisão individual de funcionalidades não foi presumida. Naruto é projeto pessoal com autoria confirmada no repositório.

Entrear e Lâmina são empresas fictícias e protótipos demonstrativos; não representam clientes, contratos ou resultados comerciais. Seus repositórios não foram identificados e os botões de código foram omitidos. Astro, GSAP/ScrollTrigger e WebGL foram identificados conforme o caso; TypeScript/OGL de Lâmina não foram inferidos do bundle.

Não foi encontrado e-mail público. O contato usa somente LinkedIn e GitHub fornecidos. Python, Node.js, APIs e outras competências sem evidência específica nos projetos selecionados não foram adicionadas como conquistas. TypeScript é utilizado neste próprio portfólio.

Fontes completas, hashes e limites: [pesquisa](docs/PROJECT_RESEARCH.md), [licenças](docs/LICENSES.md), [direção visual](docs/DESIGN.md) e [QA](docs/qa/REPORT.md).

## Cinco mensagens de commit sugeridas

Sugestões para você usar após a revisão; nenhum commit foi executado:

1. `chore: configurar React, TypeScript e Vite para o portfólio`
2. `feat: criar identidade visual e abertura com personagem aprovado`
3. `feat: apresentar projetos verificados e cases acessíveis`
4. `feat: implementar navegação responsiva e controle de movimento`
5. `test: validar acessibilidade, responsividade e documentar entrega`
