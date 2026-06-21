import { defineCollection } from 'astro:content' // конфигурацию коллекции
import { glob } from 'astro/loaders' // загрузчиков (loaders)
import { z } from 'astro/zod' // валидации данных в TypeScript

const lessons = defineCollection({
  loader: glob({
    base: './src/content/lessons',
    pattern: '**/*.{md,mdx}',
  }),
  // описание формы данных
  schema: ({ defaultSlug }) => z.object({
    title: z.string(),
    slug: z.string().default(defaultSlug),
    order: z.number().optional(),
  })
})

export const collections = { lessons }
