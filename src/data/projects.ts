// Portfolio: only Prometálica and Atelier are shown (see CLAUDE.md).
// [brackets] = pending content: never replace them with invented facts.
import type { Lang } from '../i18n/utils';

export interface ProjectText {
  category: string;
  kind: string;      // project type, e.g. "Landing page"
  client: string;
  result: string;
  description: string;
  shortDesc: string;
}

export interface Project {
  slug: string;
  title: string;
  year: string;       // '[año]' until confirmed
  tech: string[];
  tone: 'mar' | 'cielo'; // placeholder cover gradient until a real screenshot exists
  cover?: string;     // real screenshot (use astro:assets / src/assets/projects/)
  link?: string;      // empty = case study not published yet
  featured?: boolean; // true = appears in the home featured section
  es: ProjectText;
  en: ProjectText;
}

export const projects: Project[] = [
  {
    slug: 'prometalica',
    title: 'Prometálica',
    year: '[año]',
    tech: ['[Herramientas]'],
    tone: 'mar',
    cover: '',
    link: '',
    featured: true,
    es: {
      category: '[Categoría]',
      kind: '[Tipo de proyecto]',
      client: '[Cliente]',
      result: '[Resultado]',
      description: '[Descripción del proyecto Prometálica]',
      shortDesc: '[Descripción corta del proyecto Prometálica]',
    },
    en: {
      category: '[Category]',
      kind: '[Project type]',
      client: '[Client]',
      result: '[Result]',
      description: '[Prometálica project description]',
      shortDesc: '[Prometálica short description]',
    },
  },
  {
    slug: 'atelier',
    title: 'Atelier',
    year: '[año]',
    tech: ['[Herramientas]'],
    tone: 'cielo',
    cover: '',
    link: '',
    featured: true,
    es: {
      category: '[Categoría]',
      kind: '[Tipo de proyecto]',
      client: '[Cliente]',
      result: '[Resultado]',
      description: '[Descripción del proyecto Atelier]',
      shortDesc: '[Descripción corta del proyecto Atelier]',
    },
    en: {
      category: '[Category]',
      kind: '[Project type]',
      client: '[Client]',
      result: '[Result]',
      description: '[Atelier project description]',
      shortDesc: '[Atelier short description]',
    },
  },
];

export function projectText(p: Project, lang: Lang): ProjectText {
  return lang === 'en' ? p.en : p.es;
}
