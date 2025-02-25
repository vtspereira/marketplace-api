import { z } from 'zod'

export const createProductReviewBodySchema = z.object({
  rating: z.number().int().min(1).max(5),
  content: z.string().min(10).max(1000),
})

export type CreateProductReviewBody = z.infer<typeof createProductReviewBodySchema>

export const listProductReviewsParamsSchema = z.object({
  productId: z.string().uuid(),
})

export type ListProductReviewsParams = z.infer<typeof listProductReviewsParamsSchema>

export const listProductReviewsQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  perPage: z.coerce.number().min(1).max(100).default(20),
})

export type ListProductReviewsQuery = z.infer<typeof listProductReviewsQuerySchema>

export const productReviewSchema = z.object({
  id: z.string().uuid(),
  productId: z.string().uuid(),
  authorId: z.string().uuid(),
  rating: z.number(),
  content: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type ProductReview = z.infer<typeof productReviewSchema>

export const listProductReviewsResponseSchema = z.object({
  reviews: z.array(productReviewSchema),
  metrics: z.object({
    averageRating: z.number(),
    totalReviews: z.number(),
    ratingDistribution: z.object({
      '1': z.number(),
      '2': z.number(),
      '3': z.number(),
      '4': z.number(),
      '5': z.number(),
    }),
  }),
})

export type ListProductReviewsResponse = z.infer<typeof listProductReviewsResponseSchema> 