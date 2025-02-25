import { z } from 'zod'

export const getProductMetricsParamsSchema = z.object({
  productId: z.string().uuid(),
})

export type GetProductMetricsParams = z.infer<typeof getProductMetricsParamsSchema>

export const getProductMetricsResponseSchema = z.object({
  metrics: z.object({
    views: z.number(),
    uniqueViews: z.number(),
  }),
})

export type GetProductMetricsResponse = z.infer<typeof getProductMetricsResponseSchema> 