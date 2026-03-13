export interface ExperienceTranslation {
  company: string;
  role: string;
  period: string;
  duration: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface ProjectTranslation {
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  featured: boolean;
  link?: string;
}

export interface SkillTranslation {
  name: string;
  level: number;
}

export interface SkillCategoryTranslation {
  title: string;
  icon: string;
  skills: SkillTranslation[];
}

export interface StatTranslation {
  value: number;
  suffix: string;
  label: string;
}

export interface TypedStringItem {
  prefix: string;
  text: string;
}

export interface Translations {
  nav: {
    about: string;
    skills: string;
    experience: string;
    projects: string;
    contact: string;
  };
  hero: {
    greeting: string;
    name: string;
    typedStrings: TypedStringItem[];
    bio: string;
    viewWork: string;
    getInTouch: string;
    scrollDown: string;
  };
  about: {
    label: string;
    title: string;
    paragraphs: string[];
    techTitle: string;
    technologies: string[];
    stats: StatTranslation[];
  };
  skills: {
    label: string;
    title: string;
    categories: SkillCategoryTranslation[];
  };
  experience: {
    label: string;
    title: string;
    items: ExperienceTranslation[];
  };
  projects: {
    label: string;
    title: string;
    items: ProjectTranslation[];
  };
  contact: {
    label: string;
    title: string;
    description: string;
    emailLabel: string;
    telegramLabel: string;
    githubLabel: string;
    sayHello: string;
  };
  footer: {
    builtWith: string;
    designedBy: string;
  };
  personal: {
    email: string;
    telegram: string;
    telegramLink: string;
    github: string;
  };
}
