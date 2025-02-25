import { z } from 'zod'

export const editProductParamsSchema = z.object({
  id: z.string().uuid(),
})

export type EditProductParams = z.infer<typeof editProductParamsSchema>

export const editProductBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  priceInCents: z.number().int().positive(),
  categoryId: z.string().uuid(),
  attachmentsIds: z.array(z.string().uuid()),
})

export type EditProductBody = z.infer<typeof editProductBodySchema> 