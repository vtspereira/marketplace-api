import { z } from 'zod'

export const listSellerProductsParamsSchema = z.object({
  sellerId: z.string().uuid(),
})

export type ListSellerProductsParams = z.infer<typeof listSellerProductsParamsSchema>

export const listSellerProductsQuerySchema = z.object({
  status: z.enum(['AVAILABLE', 'SOLD', 'CANCELLED']).optional(),
  query: z.string().optional(),
})

export type ListSellerProductsQuery = z.infer<typeof listSellerProductsQuerySchema>

export const listSellerProductsResponseSchema = z.object({
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

export type ListSellerProductsResponse = z.infer<typeof listSellerProductsResponseSchema> 