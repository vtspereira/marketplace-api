import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import {
  FindManyByProductParams,
  GetProductReviewsMetricsResponse,
  ProductReviewsRepository,
} from '@/domain/repositories/product-reviews-repository'
import { ProductReview } from '@/domain/entities/product-review'
import { PrismaProductReviewMapper } from '../mappers/prisma-product-review-mapper'

@Injectable()
export class PrismaProductReviewsRepository implements ProductReviewsRepository {
  constructor(private prisma: PrismaService) {}

  async create(review: ProductReview): Promise<void> {
    const data = PrismaProductReviewMapper.toPrisma(review)

    await this.prisma.productReview.create({
      data,
    })
  }

  async findById(id: string): Promise<ProductReview | null> {
    const review = await this.prisma.productReview.findUnique({
      where: {
        id,
      },
    })

    if (!review) {
      return null
    }

    return PrismaProductReviewMapper.toDomain(review)
  }

  async findByAuthorAndProduct(
    authorId: string,
    productId: string,
  ): Promise<ProductReview | null> {
    const review = await this.prisma.productReview.findUnique({
      where: {
        authorId_productId: {
          authorId,
          productId,
        },
      },
    })

    if (!review) {
      return null
    }

    return PrismaProductReviewMapper.toDomain(review)
  }

  async findManyByProduct({
    productId,
    page,
    perPage = 20,
  }: FindManyByProductParams): Promise<ProductReview[]> {
    const reviews = await this.prisma.productReview.findMany({
      where: {
        productId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: perPage,
      skip: (page - 1) * perPage,
    })

    return reviews.map(PrismaProductReviewMapper.toDomain)
  }

  async getMetrics(productId: string): Promise<GetProductReviewsMetricsResponse> {
    const reviews = await this.prisma.productReview.findMany({
      where: {
        productId,
      },
      select: {
        rating: true,
      },
    })

    const totalReviews = reviews.length

    if (totalReviews === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: {
          '1': 0,
          '2': 0,
          '3': 0,
          '4': 0,
          '5': 0,
        },
      }
    }

    const ratingDistribution = reviews.reduce(
      (acc, review) => {
        acc[review.rating.toString() as keyof typeof acc] += 1
        return acc
      },
      {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
      },
    )

    const averageRating =
      reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews

    return {
      averageRating,
      totalReviews,
      ratingDistribution,
    }
  }

  async save(review: ProductReview): Promise<void> {
    const data = PrismaProductReviewMapper.toPrisma(review)

    await this.prisma.productReview.update({
      where: {
        id: review.id,
      },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.productReview.delete({
      where: {
        id,
      },
    })
  }
} 