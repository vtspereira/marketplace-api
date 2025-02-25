import { z } from 'zod'

export const listProductsQueryParamsSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  perPage: z.coerce.number().min(1).max(100).default(20),
  status: z.enum(['AVAILABLE', 'SOLD', 'CANCELLED']).optional(),
  query: z.string().optional(),
})

export type ListProductsQueryParams = z.infer<typeof listProductsQueryParamsSchema>

export const listProductsResponseSchema = z.object({
  products: z.array(
    z.object({
      id: z.string().uuid(),
      title: z.string(),
      description: z.string(),
      priceInCents: z.number(),
      status: z.enum(['AVAILABLE', 'SOLD', 'CANCELLED']),
      categoryId: z.string().uuid(),
      ownerId: z.string().uuid(),
      attachmentsIds: z.array(z.string().uuid()),
      createdAt: z.date(),
      updatedAt: z.date(),
    }),
  ),
})

export type ListProductsResponse = z.infer<typeof listProductsResponseSchema> 