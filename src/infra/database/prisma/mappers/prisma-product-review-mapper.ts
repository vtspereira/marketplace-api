import { ProductReview as PrismaProductReview, Prisma } from '@prisma/client'
import { ProductReview } from '@/domain/entities/product-review'

export class PrismaProductReviewMapper {
  static toPrisma(review: ProductReview): Prisma.ProductReviewUncheckedCreateInput {
    return {
      id: review.id,
      productId: review.productId,
      authorId: review.authorId,
      rating: review.rating,
      content: review.content,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
    }
  }

  static toDomain(raw: PrismaProductReview): ProductReview {
    return new ProductReview(
      {
        productId: raw.productId,
        authorId: raw.authorId,
        rating: raw.rating,
        content: raw.content,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    )
  }
} 