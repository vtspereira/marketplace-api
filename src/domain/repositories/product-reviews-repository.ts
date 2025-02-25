import { ProductReview } from '../entities/product-review'

export interface GetProductReviewsMetricsResponse {
  averageRating: number
  totalReviews: number
  ratingDistribution: {
    '1': number
    '2': number
    '3': number
    '4': number
    '5': number
  }
}

export interface FindManyByProductParams {
  productId: string
  page: number
  perPage?: number
}

export abstract class ProductReviewsRepository {
  abstract create(review: ProductReview): Promise<void>
  abstract findById(id: string): Promise<ProductReview | null>
  abstract findByAuthorAndProduct(authorId: string, productId: string): Promise<ProductReview | null>
  abstract findManyByProduct(params: FindManyByProductParams): Promise<ProductReview[]>
  abstract getMetrics(productId: string): Promise<GetProductReviewsMetricsResponse>
  abstract save(review: ProductReview): Promise<void>
  abstract delete(id: string): Promise<void>
} 