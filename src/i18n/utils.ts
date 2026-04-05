import es from './es';
import en from './en';

export type Lang = 'es' | 'en';

const translations = { es, en };

export function t(lang: Lang) {
  return translations[lang] ?? translations.es;
}

export function getLang(locale: string | undefined): Lang {
  return locale === 'en' ? 'en' : 'es';
}

/** Builds the equivalent URL in the other language */
export function getAlternatePath(pathname: string, currentLang: Lang): string {
  if (currentLang === 'es') {
    return `/en${pathname === '/' ? '' : pathname}` || '/en';
  }
  const stripped = pathname.replace(/^\/en/, '') || '/';
  return stripped;
}
