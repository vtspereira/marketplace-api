import { z } from 'zod'

export const getProductParamsSchema = z.object({
  id: z.string().uuid(),
})

export type GetProductParams = z.infer<typeof getProductParamsSchema>

export const getProductResponseSchema = z.object({
  product: z.object({
    id: z.string().uuid(),
    title: z.string(),
    description: z.string(),
    priceInCents: z.number(),
    status: z.enum(['AVAILABLE', 'SOLD', 'CANCELLED']),
    owner: z.object({
      id: z.string().uuid(),
      name: z.string(),
      email: z.string().email(),
      phone: z.string(),
      avatar: z
        .object({
          id: z.string().uuid(),
          url: z.string().url(),
        })
        .nullable(),
    }),
    category: z.object({
      id: z.string().uuid(),
      title: z.string(),
      slug: z.string(),
    }),
    attachments: z.array(
      z.object({
        id: z.string().uuid(),
        url: z.string().url(),
      }),
    ),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
})

export type GetProductResponse = z.infer<typeof getProductResponseSchema> 