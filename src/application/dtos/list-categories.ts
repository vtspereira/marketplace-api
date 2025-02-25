import { z } from 'zod'

export const listCategoriesResponseSchema = z.object({
  categories: z.array(
    z.object({
      id: z.string().uuid(),
      title: z.string(),
      slug: z.string(),
    }),
  ),
})

export type ListCategoriesResponseSchema = z.infer<
  typeof listCategoriesResponseSchema
> 