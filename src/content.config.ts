import { glob } from 'astro/loaders' // загрузчиков (loaders)
import { z } from 'astro/zod' // валидации данных в TypeScript
import { defineCollection } from 'astro:content' // конфигурацию коллекции

const lessons = defineCollection({
  loader: glob({
    base: './src/content/lessons',
    pattern: '**/*.{md,mdx}',
  }),
  // описание формы данных
  schema: z.object({
    title: z.string(),
    chapter: z.string(),
    order: z.number(),
    slug: z.string(),
  }),
})

export const collections = { lessons }
