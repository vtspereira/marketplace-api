import { ProductReview } from '../entities/product-review'
import { ProductReviewsRepository } from '../repositories/product-reviews-repository'
import { ProductsRepository } from '../repositories/products-repository'

interface CreateProductReviewUseCaseRequest {
  productId: string
  authorId: string
  rating: number
  content: string
}

interface CreateProductReviewUseCaseResponse {
  review: ProductReview
}

export class CreateProductReviewUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private productReviewsRepository: ProductReviewsRepository,
  ) {}

  async execute({
    productId,
    authorId,
    rating,
    content,
  }: CreateProductReviewUseCaseRequest): Promise<CreateProductReviewUseCaseResponse> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      throw new Error('Product not found')
    }

    if (product.ownerId === authorId) {
      throw new Error('Cannot review your own product')
    }

    const existingReview = await this.productReviewsRepository.findByAuthorAndProduct(
      authorId,
      productId,
    )

    if (existingReview) {
      throw new Error('User already reviewed this product')
    }

    const review = new ProductReview({
      productId,
      authorId,
      rating,
      content,
    })

    await this.productReviewsRepository.create(review)

    return {
      review,
    }
  }
} 