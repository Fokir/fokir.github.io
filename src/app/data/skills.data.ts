export interface Skill {
  name: string;
  level: number;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Core',
    icon: '⚡',
    skills: [
      { name: 'Angular', level: 95 },
      { name: 'TypeScript', level: 92 },
      { name: 'RxJS', level: 88 },
      { name: 'JavaScript', level: 90 },
      { name: 'HTML5 / CSS3', level: 93 },
      { name: 'SCSS / SASS', level: 90 },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    icon: '🔧',
    skills: [
      { name: 'Angular CDK', level: 85 },
      { name: 'NgRx / Signals', level: 82 },
      { name: 'AngularJS', level: 80 },
      { name: 'React', level: 60 },
      { name: 'Angular Material', level: 85 },
      { name: 'GSAP / Animations', level: 70 },
    ],
  },
  {
    title: 'Backend & Tools',
    icon: '🛠',
    skills: [
      { name: 'Node.js', level: 62 },
      { name: 'PHP', level: 50 },
      { name: 'C#', level: 35 },
      { name: 'Git', level: 88 },
      { name: 'Docker', level: 55 },
      { name: 'CI/CD', level: 65 },
    ],
  },
];
