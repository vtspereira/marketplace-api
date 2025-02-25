import { z } from 'zod'

export const createProductBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  priceInCents: z.number().int().positive(),
  categoryId: z.string().uuid(),
  attachmentsIds: z.array(z.string().uuid()),
})

export type CreateProductBody = z.infer<typeof createProductBodySchema> 