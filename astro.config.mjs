// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { rename, rm } from 'node:fs/promises';

// Astro genera /en/404/index.html, pero Cloudflare Pages busca /en/404.html
const enNotFound = {
  name: 'en-404',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      await rename(new URL('en/404/index.html', dir), new URL('en/404.html', dir));
      await rm(new URL('en/404/', dir), { recursive: true });
    },
  },
};

export default defineConfig({
  site: 'https://camiloacosta.dev',
  integrations: [
    sitemap({ filter: (page) => !/\/404\/?$/.test(new URL(page).pathname) }),
    enNotFound,
  ],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
