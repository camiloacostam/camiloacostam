/**
 * Actualiza automáticamente las secciones del README.md:
 *  - PROJECTS: lee src/data/projects.ts y genera la tabla de proyectos destacados
 *  - BLOG:     lee el RSS feed del sitio y genera la tabla de últimos posts
 *
 * Ejecutar con:  npx tsx .github/scripts/update-readme.ts
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');

// ── Importar proyectos desde el source ─────────────────────────────────────
const { projects } = await import('../../src/data/projects.ts') as {
  projects: Array<{
    title: string;
    category: string;
    description: string;
    tech: string[];
    link?: string;
    date: string;
    featured?: boolean;
  }>;
};

const SITE = 'https://camiloacosta.dev';

// ── Badge helpers ───────────────────────────────────────────────────────────
const TECH_BADGES: Record<string, string> = {
  'Astro':      'https://img.shields.io/badge/Astro-FF5D01?style=flat-square&logo=astro&logoColor=white',
  'React':      'https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB',
  'Next.js':    'https://img.shields.io/badge/Next.js-000?style=flat-square&logo=nextdotjs&logoColor=white',
  'Tailwind':   'https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white',
  'Figma':      'https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white',
  'TypeScript': 'https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white',
  'Node.js':    'https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white',
  'Supabase':   'https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white',
};

const CAT_COLORS: Record<string, string> = {
  'IA':         '7C3AED',
  'Marketing':  '059669',
  'Desarrollo': 'EA580C',
};

function techBadge(tech: string): string {
  return TECH_BADGES[tech]
    ?? `https://img.shields.io/badge/${encodeURIComponent(tech)}-71717A?style=flat-square`;
}

function catBadge(cat: string): string {
  const color = CAT_COLORS[cat] ?? '71717A';
  return `![${cat}](https://img.shields.io/badge/${encodeURIComponent(cat)}-${color}?style=flat-square)`;
}

// ── Sección de proyectos ────────────────────────────────────────────────────
function buildProjects(): string {
  const featured = projects.filter(p => p.featured);
  if (featured.length === 0) return '_No hay proyectos destacados todavía._';

  const lines: string[] = ['<table>'];

  for (let i = 0; i < featured.length; i += 2) {
    const p1 = featured[i];
    const p2 = featured[i + 1];

    const cell = (p: typeof featured[number]) => {
      const link = p.link && p.link !== '#' ? p.link : `${SITE}/proyectos`;
      const badges = p.tech.map(t => `![${t}](${techBadge(t)})`).join(' ');
      return [
        `<td width="50%" valign="top">`,
        ``,
        `**${p.title} — ${p.category}**`,
        ``,
        p.description,
        ``,
        badges,
        ``,
        `[Ver proyecto →](${link})`,
        ``,
        `</td>`,
      ].join('\n');
    };

    lines.push('<tr>');
    lines.push(cell(p1));
    if (p2) {
      lines.push(cell(p2));
    } else {
      lines.push(`<td width="50%" valign="top">\n\nMás proyectos en [camiloacosta.dev/proyectos →](${SITE}/proyectos)\n\n</td>`);
    }
    lines.push('</tr>');
  }

  lines.push('</table>');
  return lines.join('\n');
}

// ── Sección de blog (RSS) ───────────────────────────────────────────────────
interface Post { title: string; link: string; date: string; category: string }

async function fetchPosts(count = 3): Promise<Post[]> {
  try {
    const res = await fetch(`${SITE}/rss.xml`, { signal: AbortSignal.timeout(10_000) });
    if (!res.ok) return [];
    const xml = await res.text();

    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, count);
    return items.map(m => {
      const body = m[1];
      const get  = (tag: string) =>
        body.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`))
          ?.[1]?.trim() ?? '';

      const rawDate = get('pubDate');
      const date = rawDate
        ? new Date(rawDate).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })
        : '';

      return {
        title:    get('title'),
        link:     get('link'),
        date,
        category: get('category') || 'Desarrollo',
      };
    }).filter(p => p.title);
  } catch {
    return [];
  }
}

function buildBlog(posts: Post[]): string {
  if (posts.length === 0) {
    return `> 📝 Los primeros artículos están en camino. Próximamente en [camiloacosta.dev/blog](${SITE}/blog)`;
  }
  const header = '| Categoría | Artículo | Fecha |\n|-----------|----------|-------|';
  const rows   = posts.map(p => `| ${catBadge(p.category)} | [${p.title}](${p.link}) | ${p.date} |`);
  return [header, ...rows].join('\n');
}

// ── Reemplazar entre markers ────────────────────────────────────────────────
function replaceBetween(content: string, start: string, end: string, inner: string): string {
  const esc    = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex  = new RegExp(`${esc(start)}[\\s\\S]*?${esc(end)}`, 'g');
  return content.replace(regex, `${start}\n${inner}\n${end}`);
}

// ── Main ────────────────────────────────────────────────────────────────────
const posts      = await fetchPosts(3);
const readmePath = join(ROOT, 'README.md');
let   readme     = readFileSync(readmePath, 'utf-8');

readme = replaceBetween(readme, '<!-- PROJECTS:START -->', '<!-- PROJECTS:END -->', buildProjects());
readme = replaceBetween(readme, '<!-- BLOG:START -->',    '<!-- BLOG:END -->',    buildBlog(posts));

writeFileSync(readmePath, readme);
console.log('✅ README.md actualizado');
if (posts.length > 0) console.log(`   📰 ${posts.length} post(s) del blog`);
const featured = projects.filter(p => p.featured);
console.log(`   🚀 ${featured.length} proyecto(s) destacado(s)`);
