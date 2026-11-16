export interface Project {
  id: string;
  name: string;
  image?: string;
  imageAlt?: string;
  url?: string;
  status: 'published' | 'development';
  group: 'selected' | 'web';
  context?: string;
  description: string;
  technologies: string[];
}

export const socialLinks = {
  github: 'https://github.com/JoaquimGSM',
  linkedin: 'https://www.linkedin.com/in/joaquimgsm',
};

// Future editorial fields stay empty, per the current brief. Research is retained in docs.
export const projects: Project[] = [
  { id: 'zeryon', name: 'Zeryon Photo Profile', image: '/projects/zeryon.jpg', imageAlt: 'Captura real da tela inicial de Zeryon Photo Profile.', url: 'https://web-dev-sprint3-zeryon.vercel.app/', status: 'published', group: 'selected', context: 'Acadêmico · Em equipe', description: '', technologies: [] },
  { id: 'naruto', name: 'Naruto Connections', image: '/projects/naruto.jpg', imageAlt: 'Captura real do grafo de personagens de Naruto Connections.', url: 'https://naruto-connections.vercel.app/', status: 'published', group: 'selected', description: '', technologies: [] },
  { id: 'cityzer', name: 'Cityzer', status: 'development', group: 'selected', context: 'Global Solution', description: '', technologies: [] },
  { id: 'entrear', name: 'Entrear', image: '/projects/entrear.jpg', imageAlt: 'Captura real do website demonstrativo Entrear.', url: 'https://entrear.vercel.app/', status: 'published', group: 'web', context: 'Website demonstrativo', description: '', technologies: [] },
  { id: 'lamina', name: 'Lâmina', image: '/projects/lamina.jpg', imageAlt: 'Captura real do website demonstrativo Lâmina.', url: 'https://lamina-chi.vercel.app/', status: 'published', group: 'web', context: 'Website demonstrativo', description: '', technologies: [] },
];
