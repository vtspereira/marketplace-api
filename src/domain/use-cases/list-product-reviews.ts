import { ProductReview } from '../entities/product-review'
import { ProductReviewsRepository } from '../repositories/product-reviews-repository'
import { ProductsRepository } from '../repositories/products-repository'

interface ListProductReviewsUseCaseRequest {
  productId: string
  page: number
  perPage?: number
}

interface ListProductReviewsUseCaseResponse {
  reviews: ProductReview[]
  metrics: {
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
}

export class ListProductReviewsUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private productReviewsRepository: ProductReviewsRepository,
  ) {}

  async execute({
    productId,
    page,
    perPage,
  }: ListProductReviewsUseCaseRequest): Promise<ListProductReviewsUseCaseResponse> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      throw new Error('Product not found')
    }

    const [reviews, metrics] = await Promise.all([
      this.productReviewsRepository.findManyByProduct({
        productId,
        page,
        perPage,
      }),
      this.productReviewsRepository.getMetrics(productId),
    ])

    return {
      reviews,
      metrics,
    }
  }
} 