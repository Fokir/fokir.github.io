export interface Experience {
  company: string;
  role: string;
  period: string;
  duration: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    company: 'MediaSoft',
    role: 'Lead Frontend Developer',
    period: '2017 — Present',
    duration: '9+ years',
    description:
      'Leading frontend architecture and development for enterprise-scale applications. Designing complex business solutions and mentoring junior developers.',
    highlights: [
      'Architected a customizable e-commerce platform for the Chinese market with WeChat integration',
      'Built and maintained a multi-modal transportation ticketing system (rail, bus, ferry) serving millions of users for 5+ years',
      'Led migration from AngularJS to modern Angular, reducing bundle size by 40%',
      'Established frontend development standards and code review practices',
      'Developed web platforms for major Russian brands',
    ],
    technologies: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Angular CDK', 'SCSS', 'Node.js'],
  },
  {
    company: 'SimbirSoft',
    role: 'Frontend Developer',
    period: '2016 — 2017',
    duration: '1 year',
    description:
      'Developed frontend applications using AngularJS framework, contributing to multiple client projects in an outsourcing environment.',
    highlights: [
      'Built single-page applications using AngularJS and modern JavaScript',
      'Collaborated with cross-functional teams on enterprise client projects',
      'Implemented responsive UI components and complex form interactions',
    ],
    technologies: ['AngularJS', 'JavaScript', 'jQuery', 'HTML5', 'CSS3', 'Gulp'],
  },
  {
    company: 'ITECH.group',
    role: 'Frontend Developer',
    period: '2013 — 2014',
    duration: '11 months',
    description:
      'Started as an HTML developer and quickly grew into a frontend role, building interactive websites with custom animations and maps.',
    highlights: [
      'Created interactive maps and complex CSS/JS animations for client websites',
      'Developed responsive layouts for marketing and corporate sites',
      'Gained experience in cross-browser compatibility and performance optimization',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'PHP'],
  },
];
