# Joaquim Moura — Três versões de mim

Portfólio pessoal em React, TypeScript e Vite. Sound, Impact e Court transformam a atmosfera da página em torno dos três GIFs originais: guitarrista, boxeador e tenista.

A reformulação segue `PROMPT_MESTRE_CODEX.md`. Foram implementados e comparados três conceitos; a direção escolhida e os refinamentos estão em [DIRECAO_ARTISTICA.md](DIRECAO_ARTISTICA.md).

## Executar

Requer Node.js 22.12+ e npm; validado com Node 24 no Windows.

```bash
npm ci
npm run dev
```

Abra a URL informada pelo Vite, normalmente http://127.0.0.1:5173. No PowerShell com scripts bloqueados, use `npm.cmd` em todos os comandos; não é preciso mudar a política do Windows.

```bash
npm run typecheck
npm run lint
npm run build
npm test
npm run verify:assets
```

O teste inicia um preview local na porta 4173, ou reutiliza um já aberto. Faça o build antes de testar. Playwright usa o Microsoft Edge instalado (`channel: msedge`). Para outro ambiente, ajuste esse canal ou instale o navegador necessário.

## Experiência

- Uma abertura pessoal com assinatura tipográfica, personagem animado e seletor integrado.
- Sound: uva, amarelo e recortes elétricos; Impact: lilás, azul e planos dourados; Court: verdes, trajetórias e marcações curvas.
- Trocas interrompíveis, sem recarregar ou alterar a disposição do conteúdo. Acesso ao seletor também pelo cabeçalho fixo.
- Preferência persistida com fallback seguro e restauração no head antes do React.
- Apenas o GIF ativo anima. Pôsteres dos primeiros frames originais aparecem nas miniaturas, na pausa e com movimento reduzido. O personagem também pausa fora da viewport ou com a aba oculta.
- Galeria visual de cinco projetos, com quatro capturas reais e links. Cityzer usa arte abstrata e status de desenvolvimento; Entrear e Lâmina são websites demonstrativos.
- Apresentação curta e acessos diretos a GitHub e LinkedIn.
- Fontes locais Syne e DM Sans, Georgia para anotações, CSS/SVG para cenografia. Sem dependência nova, áudio, formulário ou analytics.

## Estrutura e edição

```text
public/personagens/        Três GIFs aprovados e pôsteres derivados
public/projects/          Quatro capturas reais já verificadas
public/og-cover.jpg        Captura real da nova abertura
src/data/personas.ts       Nomes, caminhos e ritmo de cada persona
src/context/              Seleção global e persistência
src/components/           Personagem, seletor, cenografia, galeria e navegação
src/data/projects.ts      Dados únicos dos projetos e redes oficiais
src/styles.css            Paletas semânticas, composição, movimento e breakpoints
explorations/             Três protótipos isolados, apenas no servidor de desenvolvimento
tests/personas.spec.ts    Interações, responsividade, GIFs e auditoria axe
scripts/                  Capturas e verificações reproduzíveis
docs/qa/personas/          Evidências desta reformulação
```

Os campos `description` e `technologies` permanecem vazios nos projetos. Não há descrições, cases ou tecnologias na interface. Para editar um projeto, altere seu objeto em `src/data/projects.ts` e use uma imagem real em `public/projects/`.

Para publicar Cityzer quando houver uma versão confirmada: atualize `status`, `image`, `imageAlt` e `url` no objeto `cityzer`. O mesmo componente passa a mostrar a captura com link. Atualize as evidências em `docs/PROJECT_RESEARCH.md` e o teste que hoje exige ausência de screenshot/link. Não há mudança de status baseada na data.

Os GIFs são os arquivos exatos do kit `kit_codex_portfolio_3_personagens.zip`. O boxeador conserva o fundo lilás e o tenista conserva o preto, integrados ao enquadramento. Nenhum filtro, blend ou remoção de fundo foi aplicado. `verify:assets` verifica SHA-256 e nove frames por arquivo. Os assets aprovados anteriores continuam preservados em `assets/` e `public/personagem/`.

A interface anterior está arquivada em `docs/archive/interface-anterior/`. Seus relatórios históricos em `docs/qa/` e `docs/DESIGN.md` não descrevem a versão atual.

## Capturas e revisão

Com o build atualizado e `npm run preview -- --port 4173 --strictPort` em execução:

```bash
npm run qa:screenshots
node scripts/performance.mjs docs/qa/personas/final/performance.json
```

As capturas reais ficam em `docs/qa/personas/final/`, cobrindo os três mundos em 1440, 1280, 768 e 360 px. O comando também renova `public/og-cover.jpg`; faça um novo build para incluir essa imagem no `dist/`.

Os protótipos podem ser abertos no servidor de desenvolvimento:

- `/explorations/?concept=playground`
- `/explorations/?concept=zine`
- `/explorations/?concept=worlds`

`npm run qa:concepts` captura os protótipos e requer o dev na porta 5173. Eles não fazem parte do build de produção. `npm run qa:posters` também usa esse servidor e deriva novamente o primeiro frame dos GIFs via ImageDecoder; não modifica os originais.

Resultado e limitações: [relatório atual](docs/qa/personas/REPORT.md). A verificação automática não substitui a revisão humana em leitores de tela ou em dispositivos físicos.

`scripts/capture-projects.mjs` acessa os deploys públicos para renovar imagens e depende de rede; as capturas existentes foram mantidas. Não é necessário executá-lo a cada build.

## Dados e créditos

Joaquim Gaspardo Souza Moura, Engenharia de Software na FIAP, 2026–2029: informações fornecidas pelo autor. Links oficiais: [GitHub](https://github.com/JoaquimGSM) e [LinkedIn](https://www.linkedin.com/in/joaquimgsm).

A pesquisa anterior dos projetos foi preservada em [docs/PROJECT_RESEARCH.md](docs/PROJECT_RESEARCH.md). Zeryon é acadêmico e em equipe; não foi atribuída autoria individual a todas as funcionalidades. Entrear e Lâmina representam empresas fictícias e não clientes comerciais. Não há e-mail, métricas, experiências profissionais ou tecnologias inventadas. Licenças e origem das imagens: [docs/LICENSES.md](docs/LICENSES.md).

## Publicação manual posterior

A aplicação estática é gerada em `dist/`. Para uma publicação manual na Vercel: preset Vite, instalação `npm ci`, build `npm run build`, saída `dist`, Node 22 ou 24. Depois de escolher o domínio, configure canonical, og:url e a URL absoluta de og:image em `index.html`.

Nenhum commit, push ou deploy faz parte desta entrega.
