// Shared chrome (nav + footer) for the inner pages: /proyectos/, /blog/, 404.
// The home has its own nav in src/data/home.ts.
import type { Lang } from '../i18n/utils';

export type SitePage = 'home' | 'projects' | 'blog' | 'contact';

const es = {
  nav: {
    label: 'Principal',
    home: 'Camilo Acosta — inicio',
    links: [
      { id: 'home',     href: '/',           label: 'Inicio' },
      { id: 'projects', href: '/proyectos/', label: 'Proyectos' },
      // Blog oculto del menú hasta que haya artículos (la ruta /blog/ sigue existiendo)
      { id: 'contact',  href: '/#contacto',  label: 'Contacto' },
    ] as { id: SitePage; href: string; label: string }[],
    cta: 'Agenda tu diagnóstico',
    menu: 'Menú',
    langLabel: 'EN',
    langAria: 'Read in English',
  },
  footer: {
    copy: `${new Date().getFullYear()} © Camilo Acosta · Cartagena, CO`,
    social: 'Redes',
  },
};

const en: typeof es = {
  nav: {
    label: 'Main',
    home: 'Camilo Acosta — home',
    links: [
      { id: 'home',     href: '/en/',           label: 'Home' },
      { id: 'projects', href: '/en/proyectos/', label: 'Work' },
      { id: 'contact',  href: '/en/#contacto',  label: 'Contact' },
    ],
    cta: 'Book your free audit',
    menu: 'Menu',
    langLabel: 'ES',
    langAria: 'Leer en español',
  },
  footer: {
    copy: `${new Date().getFullYear()} © Camilo Acosta · Cartagena, CO`,
    social: 'Social',
  },
};

export function getSite(lang: Lang) {
  return lang === 'en' ? en : es;
}
