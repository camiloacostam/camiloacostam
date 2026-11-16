// Portfolio: only Prometálicas Solutions and Atelier are shown (see CLAUDE.md).
// [brackets] = pending content: never replace them with invented facts.
import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/utils';
import prometalicaDesktop from '../assets/projects/prometalica-desktop.jpg';
import prometalicaMobile from '../assets/projects/prometalica-mobile.jpg';
import atelierDesktop from '../assets/projects/atelier-desktop.jpg';
import atelierMobile from '../assets/projects/atelier-mobile.jpg';

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
  screens?: { desktop: ImageMetadata; mobile: ImageMetadata }; // real screenshots of the live site
  link?: string;      // live site URL; empty = not published yet
  featured?: boolean; // true = appears in the home featured section
  es: ProjectText;
  en: ProjectText;
}

export const projects: Project[] = [
  {
    slug: 'prometalica',
    title: 'Prometálicas Solutions',
    year: '[año]',
    tech: ['[Herramientas]'],
    tone: 'mar',
    screens: { desktop: prometalicaDesktop, mobile: prometalicaMobile },
    link: 'https://prometalica.com.co',
    featured: true,
    es: {
      category: 'Metalmecánica industrial',
      kind: 'Sitio corporativo',
      client: 'Prometálicas Solutions',
      result: '[Resultado]',
      description: 'Web corporativa para una empresa de metalmecánica: explica sus servicios en segundos y lleva a cada visitante a cotizar en 4 preguntas.',
      shortDesc: 'Web corporativa con cotizador en 4 preguntas.',
    },
    en: {
      category: 'Industrial metalworking',
      kind: 'Corporate website',
      client: 'Prometálicas Solutions',
      result: '[Result]',
      description: 'Corporate website for a metalworking company: it explains its services in seconds and walks every visitor to a quote in 4 questions.',
      shortDesc: 'Corporate website with a 4-question quote builder.',
    },
  },
  {
    slug: 'atelier',
    title: 'Atelier',
    year: '[año]',
    tech: ['[Herramientas]'],
    tone: 'cielo',
    screens: { desktop: atelierDesktop, mobile: atelierMobile },
    link: 'https://atelier.prometalica.com.co',
    featured: true,
    es: {
      category: 'Mobiliario de lujo',
      kind: 'Tienda en línea',
      client: 'Atelier Designer',
      result: '[Resultado]',
      description: 'Tienda en línea de mobiliario de lujo hecho en Colombia: colección, carrito de compras y proyectos a medida.',
      shortDesc: 'Tienda en línea de mobiliario de lujo.',
    },
    en: {
      category: 'Luxury furniture',
      kind: 'Online store',
      client: 'Atelier Designer',
      result: '[Result]',
      description: 'Online store for luxury furniture made in Colombia: collection, shopping cart and custom projects.',
      shortDesc: 'Online store for luxury furniture.',
    },
  },
];

export function projectText(p: Project, lang: Lang): ProjectText {
  return lang === 'en' ? p.en : p.es;
}
