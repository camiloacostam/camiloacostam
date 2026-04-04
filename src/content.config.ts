import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(),
    badge: z.enum(['IA', 'Marketing', 'Desarrollo']),
    cover: z.string().optional(),
  }),
});

export const collections = { blog };
