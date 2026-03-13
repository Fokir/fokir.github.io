export interface Project {
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  featured: boolean;
  link?: string;
  image?: string;
}

export const PROJECTS: Project[] = [
  {
    title: 'Transportation Ticketing Platform',
    description: 'Multi-modal ticket booking system for rail, bus, and ferry services',
    longDescription:
      'A comprehensive ticketing ecosystem serving millions of users across multiple transportation modes. Features include real-time schedule tracking, seat selection, dynamic pricing, and multi-payment integration. The system has been in production for over 5 years with continuous feature development.',
    technologies: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'REST API', 'WebSocket', 'SCSS'],
    category: 'Enterprise',
    featured: true,
  },
  {
    title: 'Vape Customization Platform',
    description: 'E-commerce platform for the Chinese market with WeChat integration',
    longDescription:
      'A unique e-commerce solution allowing users to customize vape liquid formulations. Built specifically for the Chinese market with WeChat Mini Program integration, localized payment systems, and a sophisticated product configurator with real-time preview.',
    technologies: ['Angular', 'TypeScript', 'WeChat SDK', 'i18n', 'REST API', 'Node.js'],
    category: 'E-Commerce',
    featured: true,
  },
  {
    title: 'Brand Websites Collection',
    description: 'Interactive web experiences for major Russian brands',
    longDescription:
      'A series of marketing and corporate websites built for well-known Russian brands. Each project featured unique interactive elements, custom animations, and responsive design tailored to the brand identity and marketing goals.',
    technologies: ['Angular', 'AngularJS', 'GSAP', 'CSS Animations', 'Responsive Design'],
    category: 'Marketing',
    featured: true,
  },
  {
    title: 'Enterprise Admin Dashboards',
    description: 'Complex data management interfaces for internal business operations',
    longDescription:
      'Suite of admin panels and dashboards for managing business operations, including content management, analytics reporting, and workflow automation. Built with a focus on performance with large datasets and intuitive UX.',
    technologies: ['Angular', 'Angular Material', 'Angular CDK', 'Charts.js', 'TypeScript'],
    category: 'Enterprise',
    featured: false,
  },
  {
    title: 'Developer Portfolio',
    description: 'This very website — built with Angular and GSAP animations',
    longDescription:
      'A showcase portfolio built with modern Angular featuring GSAP scroll animations, code background effects, and a dark developer-themed design. The source code is displayed as part of the visual design.',
    technologies: ['Angular 20', 'GSAP', 'TypeScript', 'SCSS', 'Angular CDK'],
    category: 'Personal',
    featured: false,
    link: 'https://github.com/Fokir/fokir.github.io',
  },
];
