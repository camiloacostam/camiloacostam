// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { rename, rm } from 'node:fs/promises';
import { readdirSync } from 'node:fs';

// Mientras no haya artículos, /blog/ queda fuera del sitemap (y con noindex en la página)
const hasPosts = readdirSync(new URL('./src/content/blog/', import.meta.url)).some((f) => /\.mdx?$/.test(f));

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
  // CSS dentro del HTML: evita peticiones que bloquean el primer render
  build: { inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        if (/\/404\/?$/.test(path)) return false;
        return hasPosts || !/^(\/en)?\/blog\//.test(path);
      },
    }),
    enNotFound,
  ],
  vite: { plugins: [tailwindcss()] },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
