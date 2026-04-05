import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export const prerender = true;

export async function GET(context: APIContext) {
  const posts = await getCollection('blog').catch(() => []);
  const sorted = posts.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: 'Camilo Acosta — Blog',
    description: 'Diseño, desarrollo e IA para negocios que quieren crecer en digital.',
    site: context.site!.toString(),
    items: sorted.map(post => ({
      title:       post.data.title,
      pubDate:     post.data.date,
      description: post.data.excerpt,
      categories:  [post.data.badge],
      link:        `/blog/${post.id}/`,
    })),
    customData: '<language>es-co</language>',
  });
}
