# Assets e licenças

- **Personagens atuais:** `public/personagens/guitarrista.gif`, `boxeador.gif` e `tenista.gif`, fornecidos no kit aprovado pelo autor. `npm run verify:assets` compara SHA-256 com os hashes registrados na extração do ZIP e verifica nove frames em cada arquivo. Os pôsteres PNG são o primeiro frame original decodificado pelo navegador, sem redesenho. O fundo lilás do boxeador e o preto do tenista são preservados. A origem/autorização de uso foi fornecida pelo usuário, não verificada em serviço externo.
- **Personagem anterior:** os arquivos aprovados em `assets/` e `public/personagem/` permanecem preservados; não são usados na interface atual.
- **Press Start 2P:** fonte de CodeMan38 / The Press Start 2P Project Authors, distribuída via Fontsource sob SIL Open Font License 1.1. Hospedada localmente; licença integral em `docs/licenses/Press-Start-2P-OFL.txt`. Utilizada nos títulos e detalhes pixelados.
- **Syne (versão anterior):** fonte de Bonjour Monde / Lucas Descroix, distribuída via Fontsource sob SIL Open Font License 1.1. Cópia integral em `docs/licenses/Syne-OFL.txt`. Mantida como material histórico; não carregada pela interface atual.
- **DM Sans:** fonte de Colophon Foundry / colaboradores indicados na licença, distribuída via Fontsource sob SIL Open Font License 1.1. Cópia integral em `docs/licenses/DM-Sans-OFL.txt`.
- **Capturas:** realizadas pelo Playwright diretamente nos deploys do autor; não são mockups gerados nem imagens de pesquisa. Fontes e data em `docs/research/deploys.json`. Não houve extração de imagens para fingir obras ou clientes.
- **Entrear:** captura inclui fotografias de referência do próprio website; créditos observados no site e documentados em `PROJECT_RESEARCH.md`. Não representam serviços executados.
- **Lâmina:** captura do site demonstrativo; seu próprio footer identifica as cenas como geradas por IA. Não são fotografias de construções reais.
- **Naruto:** nome e personagens pertencem aos respectivos titulares; a galeria apresenta um projeto pessoal, sem alegação de afiliação.
- **Ícones da interface:** setas e controles geométricos simples em SVG, escritos para este projeto; favicon tipográfico próprio. Não foram redesenhados logotipos de terceiros.
- **Código de projetos externos:** inspecionado para confirmar fatos, não copiado para o portfólio.

As dependências mantêm suas próprias licenças em `node_modules`; os arquivos de lock fixam as versões instaladas.
