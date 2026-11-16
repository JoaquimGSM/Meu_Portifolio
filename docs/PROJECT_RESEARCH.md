# Verificação dos projetos

Consulta realizada em 16/11/2026. Fontes: API pública do GitHub, README e código públicos; HTML e bundles JavaScript efetivamente servidos pelos deploys. A inspeção visual e os testes de navegador são documentados separadamente em `docs/qa/`.

Nenhum projeto externo foi alterado, clonado para fora deste workspace, publicado ou tratado como código a copiar. As informações do briefing e as observações de código estão distinguidas abaixo.

## Quadro de evidências

| Projeto | Confirmado | Limite / pendência |
| --- | --- | --- |
| Zeryon — Photo Profile | Repositório correto, deploy correspondente, React, Vite, JavaScript, CSS, quiz de 10 questões, perfis com filtros CSS, persistência local, autoria em equipe | Divisão de tarefas individuais não documentada. Não atribuir todos os recursos exclusivamente a Joaquim. |
| Naruto Connections | Repositório correto e deploy correspondente, React, Vite, JavaScript, Tailwind CSS, React Flow, seleção e criação de conexões justificadas, edição de justificativas | Implementação atual é pequena: três personagens apresentados. Não anunciar plataforma completa, backend, persistência ou desafio gerado diariamente. |
| Cityzer | Conceito, status em desenvolvimento e atualização prevista para 19/11/2026 fornecidos pelo autor no briefing | Nenhum código, link, screenshot, arquitetura ou stack de implementação foi confirmado. Apresentar como proposta em desenvolvimento. |
| Entrear | Deploy respondeu HTTP 200. HTML declara empresa fictícia / demonstração. Astro identificado pela saída; JavaScript cliente, menu, FAQ e geração de mensagem local estão presentes | Repositório público não identificado na conta. TypeScript não verificável pelo JavaScript compilado. Sem clientes, contratos, métricas ou operação real. |
| Lâmina | Deploy respondeu HTTP 200. HTML declara empresa fictícia / demonstração. Astro, GSAP, ScrollTrigger e renderizador WebGL encontrados na saída pública | Repositório público não identificado. TypeScript e OGL não confirmados de forma suficiente; omitir como tecnologias públicas. Não apresentar cenas sintéticas do site como obras reais. |

## Zeryon

- Código: https://github.com/JoaquimGSM/WebDev_Sprint3_Zeryon
- Deploy: https://web-dev-sprint3-zeryon.vercel.app/
- Revisão consultada: `3bb959e647dd8d4213e2c9a1bccfb78ff5b8eeb5`.
- O campo `homepage` retornado pela API de repositórios coincide com esse deploy.
- Dependências em [package.json](https://github.com/JoaquimGSM/WebDev_Sprint3_Zeryon/blob/main/package.json): React/React DOM; Vite e ferramentas de lint no desenvolvimento.
- [README](https://github.com/JoaquimGSM/WebDev_Sprint3_Zeryon/blob/main/README.md): descreve o quiz, perfis, HUD simulada e ausência de backend, câmera física e IA real.
- [perguntas.js](https://github.com/JoaquimGSM/WebDev_Sprint3_Zeryon/blob/main/src/data/perguntas.js): contém dez questões.
- [pontuacaoPerfil.js](https://github.com/JoaquimGSM/WebDev_Sprint3_Zeryon/blob/main/src/utils/pontuacaoPerfil.js): pontua respostas localmente e limita valores de saturação, contraste, brilho e intensidade. Não executa modelo de machine learning.
- [armazenamentoPerfis.js](https://github.com/JoaquimGSM/WebDev_Sprint3_Zeryon/blob/main/src/utils/armazenamentoPerfis.js): leitura e escrita de perfis no `localStorage`, chave `zeryonProfiles`, com validação e tratamento de dados inválidos.
- [EstruturaAplicacao.jsx](https://github.com/JoaquimGSM/WebDev_Sprint3_Zeryon/blob/main/src/components/EstruturaAplicacao.jsx): orquestra início, quantidade, quiz, resultado, lista e HUD; permite editar nome antes de salvar, selecionar e excluir perfis.

Créditos de equipe conforme README: Joaquim Gaspardo, Kelso Oliveira, Gabriel Flausino, Felipe Kenji e Gustavo Ducatti. A lista pública de contribuidores Git apresenta apenas a conta JoaquimGSM; isso não substitui os créditos acadêmicos e não comprova autoria individual de todas as partes.

O repositório https://github.com/JoaquimGSM/Sprint4_WebDev_FrontEnd é outro projeto, com homepage `https://sprint4-web-dev-front-end.vercel.app`. Não foi usado como código de Zeryon.

## Naruto Connections

- Código: https://github.com/JoaquimGSM/Naruto_Connections
- Deploy: https://naruto-connections.vercel.app/
- Revisão consultada: `0ba470d53ecb93a6ec1fe41a84028f52b66334a2`.
- O campo `homepage` da API coincide com esse deploy.
- [README](https://github.com/JoaquimGSM/Naruto_Connections/blob/main/README.md) credita o desenvolvimento a Joaquim Gaspardo Souza Moura.
- [package.json](https://github.com/JoaquimGSM/Naruto_Connections/blob/main/package.json): React, React DOM, `@xyflow/react`, Tailwind CSS e Vite.
- [App.jsx](https://github.com/JoaquimGSM/Naruto_Connections/blob/main/src/App.jsx): apresenta Jiraiya, Itachi e Kabuto; limita a seleção a dois personagens; exige justificativa não vazia para criar conexão; impede conexão duplicada em qualquer direção; mantém estado em React.
- [GameBoard.jsx](https://github.com/JoaquimGSM/Naruto_Connections/blob/main/src/components/GameBoard.jsx): usa React Flow com nós e arestas customizados, background e controles. Clicar em uma aresta seleciona sua justificativa.
- [EditarJustificativa.jsx](https://github.com/JoaquimGSM/Naruto_Connections/blob/main/src/components/EditarJustificativa.jsx): alterna visualização/edição e impede salvar texto vazio.

Não afirmar que conexões são persistidas: o código consultado usa estado de sessão React. A linha “Desafio diário #001” no deploy não comprova infraestrutura de novos desafios diários.

## Entrear

- Deploy: https://entrear.vercel.app/
- Título observado: “Entrear Climatização — Conforto tem medida · demonstração”.
- HTML identifica repetidamente “Projeto demonstrativo · empresa fictícia”, sem operação comercial ou unidades físicas reais representadas.
- Astro identificado por componentes com atributos `data-astro-cid-*` e assets em `/_astro/`.
- Bundle cliente consultado: `/_astro/index.astro_astro_type_script_index_0_lang.Br0iFCjW.js`.
- Elementos confirmados no HTML: navegação móvel, FAQ com `details/summary`, formulário demonstrativo que gera mensagem de exemplo e botão para copiá-la. O texto explica que nada é enviado e solicita dados fictícios.
- Não foram encontrados GSAP, ScrollTrigger ou WebGL no bundle principal consultado; não adicionar essas tecnologias ao case.
- O footer do próprio site atribui fotografias a Caroline Badran (Unsplash), Max Vakhtbovych, Vicky Tran e José Andrés Pacheco Cortes (Pexels), e fontes Archivo / Instrument Sans sob SIL OFL. O portfólio usa captura real do site, sem extrair fotografias para outro contexto.

## Lâmina

- Deploy: https://lamina-chi.vercel.app/
- Título observado: “Lâmina — Piscinas, entre luz e paisagem”.
- O footer declara “Empresa fictícia. Website demonstrativo. Todas as cenas são geradas por IA.”
- Astro identificado na saída pública.
- Entrada cliente consultada: `/_astro/index.astro_astro_type_script_index_0_lang.CPdOVxLT.js`.
- Essa entrada importa dinamicamente os chunks `gsap.C2W12wA9.js`, `ScrollTrigger.Dg2oAicK.js` e `ContinuityRenderer.DeBUuhG8.js`; todos responderam com código JavaScript.
- O renderer consulta contextos WebGL/WebGL2, compila shaders e renderiza a continuidade da imagem. Isso confirma WebGL. A semelhança de suas classes com bibliotecas conhecidas não basta para atribuir OGL sem manifest ou fonte inequívoca.
- Recursos presentes no HTML: apresentação de serviços, galeria com três atmosferas e controles anterior/próximo, notas de materiais expansíveis, processo ilustrativo e formulário local para escolher serviço e imóvel e gerar resumo, sem envio.
- TypeScript não pode ser inferido de um bundle JavaScript compilado.

## Contato e limites gerais

- GitHub confirmado: https://github.com/JoaquimGSM
- LinkedIn fornecido explicitamente pelo autor: https://www.linkedin.com/in/joaquimgsm
- A API pública de perfil do GitHub retornou `email: null`, nome e bio ausentes. Não foi inventado e-mail ou telefone.
- A lista atual da API pública incluiu 36 repositórios e não incluiu repositórios chamados Entrear ou Lâmina. Isso não prova inexistência: podem ser privados, ter outro nome ou outra conta. Omitir botões de código nesses dois cases.
- A visualização do GitHub via ferramenta web retornou uma versão rastreada meses antes e incompleta. Para evitar conclusões a partir desse retrato, a confirmação final dos repositórios foi feita por consultas GET atuais à API e a `raw.githubusercontent.com`.

## Confirmação de interações em navegador real

Além da inspeção do código, `scripts/verify-project-flows.mjs` executou os fluxos nos dois deploys públicos com Microsoft Edge/Playwright em contextos descartáveis. Todas as requisições que não fossem GET/HEAD foram bloqueadas por precaução; nenhuma tentativa de escrita em rede ocorreu.

- **Zeryon:** percorridas dez questões distintas, com seleção visível de resposta e avanço; nome do perfil editado para um texto neutro; perfil salvo em `localStorage`; após recarregar a página, o perfil continuou disponível em Gerenciar perfis, com sua miniatura carregada.
- **Naruto:** selecionados Jiraiya e Itachi Uchiha; criada uma conexão com justificativa neutra; conexão selecionada por clique real no traço SVG; justificativa editada e alteração confirmada na tela. Não foi afirmada persistência após recarga.

Ambos os deploys responderam HTTP 200 e não produziram erros JavaScript de página nos fluxos testados. Resultados completos: `docs/research/interaction-checks.json`. Uma captura final por projeto: `docs/research/zeryon-interaction.png` e `docs/research/naruto-interaction.png`. As capturas principais de `public/projects/` foram preservadas.
