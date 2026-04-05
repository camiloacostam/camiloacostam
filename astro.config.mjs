// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://camiloacosta.dev',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
