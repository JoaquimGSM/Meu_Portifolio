export interface Project {
  id: string;
  name: string;
  category: string;
  headline: string;
  summary: string;
  technologies: string[];
  status: 'published' | 'development';
  image?: string;
  imageAlt?: string;
  demo?: string;
  repository?: string;
  objective: string;
  solution: string;
  contribution: string;
  note?: string;
  credits?: string;
  updateDate?: string;
}

export const socialLinks = {
  github: 'https://github.com/JoaquimGSM',
  linkedin: 'https://www.linkedin.com/in/joaquimgsm',
};

export const projects: Project[] = [
  {
    id: 'zeryon', name: 'Zeryon', category: 'Acadêmico · Em equipe',
    headline: 'Um perfil para cada olhar.',
    summary: 'Um quiz de 10 questões transforma preferências em perfis fotográficos que podem ser ajustados, salvos e gerenciados no navegador.',
    technologies: ['React', 'JavaScript', 'CSS', 'Vite'], status: 'published',
    image: '/projects/zeryon.jpg', imageAlt: 'Tela inicial real de Zeryon, com a apresentação do aplicativo e o botão Criar meus perfis.',
    demo: 'https://web-dev-sprint3-zeryon.vercel.app/',
    repository: 'https://github.com/JoaquimGSM/WebDev_Sprint3_Zeryon',
    objective: 'Traduzir diferentes preferências visuais em perfis fotográficos personalizados, dentro de uma experiência acadêmica de front-end.',
    solution: 'Um quiz de 10 questões calcula parâmetros de brilho, contraste e saturação. A aplicação apresenta o resultado com filtros CSS e uma interface de câmera simulada. Os perfis recebem nomes editáveis, podem ser selecionados ou excluídos e ficam no localStorage.',
    contribution: 'Participei do desenvolvimento em equipe. O repositório público documenta a solução coletiva, sem separar a autoria de cada funcionalidade; por isso, este case apresenta o trabalho do grupo.',
    note: 'A experiência é uma simulação local: não usa câmera física, modelo de IA ou backend.',
    credits: 'Joaquim Gaspardo, Kelso Oliveira, Gabriel Flausino, Felipe Kenji e Gustavo Ducatti.',
  },
  {
    id: 'naruto', name: 'Naruto Connections', category: 'Projeto pessoal',
    headline: 'Personagens, relações e motivos.',
    summary: 'Uma experiência em grafo para conectar personagens de Naruto e explicar as relações entre eles. Cada conexão tem uma justificativa editável.',
    technologies: ['React', 'React Flow', 'Tailwind CSS', 'JavaScript'], status: 'published',
    image: '/projects/naruto.jpg', imageAlt: 'Captura real de Naruto Connections com os nós de Jiraiya, Itachi e Kabuto no quadro interativo.',
    demo: 'https://naruto-connections.vercel.app/',
    repository: 'https://github.com/JoaquimGSM/Naruto_Connections',
    objective: 'Explorar relações entre personagens por meio de uma interface visual, praticando estado em React e interação com grafos.',
    solution: 'O quadro usa React Flow com nós e arestas customizados. A pessoa seleciona dois personagens, escreve uma justificativa e cria a conexão. A aplicação evita duplicatas; ao selecionar uma aresta, é possível editar sua justificativa.',
    contribution: 'Projeto pessoal de Joaquim Gaspardo Souza Moura, conforme os créditos do repositório. A implementação conecta a interface de seleção, o estado do grafo e a edição das relações.',
    note: 'A versão verificada apresenta três personagens. As conexões ficam no estado da sessão; não há persistência confirmada.',
  },
  {
    id: 'cityzer', name: 'Cityzer', category: 'Global Solution · Em desenvolvimento',
    headline: 'A cidade pela visão de quem passa.',
    summary: 'Uma proposta de relatos colaborativos sobre problemas de trânsito, com ocorrências em mapa e validação pela comunidade.',
    technologies: [], status: 'development', updateDate: '2026-11-19',
    objective: 'Reunir relatos sobre acidentes, buracos, árvores caídas, obras e alagamentos para dar visibilidade a problemas encontrados no trânsito.',
    solution: 'O conceito prevê um mapa de ocorrências e validação comunitária. O projeto está em desenvolvimento; esses recursos descrevem a proposta e ainda não são apresentados como funcionalidades entregues.',
    contribution: 'Projeto acadêmico Global Solution em desenvolvimento. Detalhes de implementação, participação da equipe e tecnologias serão documentados quando houver uma versão verificável.',
    note: 'Atualização prevista para 19/11/2026. Ainda não há demonstração, código ou captura publicada neste portfólio.',
  },
  {
    id: 'entrear', name: 'Entrear', category: 'Website demonstrativo · Empresa fictícia',
    headline: 'Clareza para apresentar serviços.',
    summary: 'Um site de climatização com organização de serviços, navegação responsiva e uma experiência direta para entender a proposta da empresa fictícia.',
    technologies: ['Astro', 'JavaScript', 'CSS'], status: 'published',
    image: '/projects/entrear.jpg', imageAlt: 'Captura real da abertura do site demonstrativo Entrear Climatização.',
    demo: 'https://entrear.vercel.app/',
    objective: 'Explorar a apresentação de serviços de climatização em um website demonstrativo, com informação compreensível e hierarquia visual.',
    solution: 'A página organiza os serviços, responde perguntas em elementos expansíveis e adapta a navegação ao celular. Um formulário demonstrativo gera uma mensagem local que pode ser copiada, sem enviar dados.',
    contribution: 'Protótipo autoral apresentado no briefing como parte do meu desenvolvimento web independente. A saída pública confirma Astro e JavaScript; o repositório de origem não foi identificado.',
    note: 'Entrear é uma empresa fictícia. Este trabalho não representa um cliente real, contrato ou resultado comercial.',
  },
  {
    id: 'lamina', name: 'Lâmina', category: 'Website demonstrativo · Empresa fictícia',
    headline: 'Uma experiência entre luz e água.',
    summary: 'Apresentação editorial para uma empresa fictícia de piscinas, com imagens amplas, movimento e exploração interativa de atmosferas e materiais.',
    technologies: ['Astro', 'GSAP', 'ScrollTrigger', 'WebGL'], status: 'published',
    image: '/projects/lamina.jpg', imageAlt: 'Captura real do site demonstrativo Lâmina, com piscina e paisagismo em sua abertura editorial.',
    demo: 'https://lamina-chi.vercel.app/',
    objective: 'Investigar uma experiência editorial e interativa para apresentar piscinas, materiais e atmosferas em uma marca fictícia.',
    solution: 'Imagens de grande escala, transições com GSAP e ScrollTrigger e um renderizador WebGL criam continuidade visual. A galeria permite alternar atmosferas; notas expansíveis apresentam materiais e um fluxo local gera um resumo de interesse.',
    contribution: 'Protótipo autoral de desenvolvimento web independente, conforme o briefing. A inspeção dos arquivos servidos confirma Astro, GSAP, ScrollTrigger e WebGL. O código-fonte público não foi identificado.',
    note: 'Lâmina é uma empresa fictícia. O próprio site identifica suas cenas como geradas por IA; a imagem aqui é uma captura real desse website, não uma fotografia de obra executada.',
  },
];

export const cityzer = projects.find((project) => project.id === 'cityzer')!;
