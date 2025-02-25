import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import {
  CreateProductReviewBody,
  ListProductReviewsParams,
  ListProductReviewsQuery,
  createProductReviewBodySchema,
  listProductReviewsParamsSchema,
  listProductReviewsQuerySchema,
} from '../dtos/product-reviews'
import { CreateProductReviewUseCase } from '@/domain/use-cases/create-product-review'
import { ListProductReviewsUseCase } from '@/domain/use-cases/list-product-reviews'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

const bodyValidationPipe = new ZodValidationPipe(createProductReviewBodySchema)
const paramsValidationPipe = new ZodValidationPipe(listProductReviewsParamsSchema)
const queryValidationPipe = new ZodValidationPipe(listProductReviewsQuerySchema)

@Controller('/products/:productId/reviews')
export class ProductReviewsController {
  constructor(
    private createProductReview: CreateProductReviewUseCase,
    private listProductReviews: ListProductReviewsUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body(bodyValidationPipe) body: CreateProductReviewBody,
    @Param(paramsValidationPipe) params: ListProductReviewsParams,
    @CurrentUser() user: UserPayload,
  ) {
    const { rating, content } = body
    const { productId } = params
    const userId = user.sub

    try {
      const { review } = await this.createProductReview.execute({
        productId,
        authorId: userId,
        rating,
        content,
      })

      return {
        review: {
          id: review.id,
          productId: review.productId,
          authorId: review.authorId,
          rating: review.rating,
          content: review.content,
          createdAt: review.createdAt,
          updatedAt: review.updatedAt,
        },
      }
    } catch (error) {
      if (error.message === 'Product not found') {
        throw new NotFoundException('Product not found')
      }

      if (error.message === 'Cannot review your own product') {
        throw new ForbiddenException('Cannot review your own product')
      }

      if (error.message === 'User already reviewed this product') {
        throw new ForbiddenException('User already reviewed this product')
      }

      throw error
    }
  }

  @Get()
  async list(
    @Param(paramsValidationPipe) params: ListProductReviewsParams,
    @Query(queryValidationPipe) query: ListProductReviewsQuery,
  ) {
    const { productId } = params
    const { page, perPage } = query

    try {
      const { reviews, metrics } = await this.listProductReviews.execute({
        productId,
        page,
        perPage,
      })

      return {
        reviews: reviews.map((review) => ({
          id: review.id,
          productId: review.productId,
          authorId: review.authorId,
          rating: review.rating,
          content: review.content,
          createdAt: review.createdAt,
          updatedAt: review.updatedAt,
        })),
        metrics,
      }
    } catch (error) {
      if (error.message === 'Product not found') {
        throw new NotFoundException('Product not found')
      }

      throw error
    }
  }
} 