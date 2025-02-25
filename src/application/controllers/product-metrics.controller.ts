import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import {
  GetProductMetricsParams,
  getProductMetricsParamsSchema,
} from '../dtos/get-product-metrics'
import { GetProductMetricsUseCase } from '@/domain/use-cases/get-product-metrics'
import { RegisterProductViewUseCase } from '@/domain/use-cases/register-product-view'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { Public } from '@/infra/auth/public'

const paramsValidationPipe = new ZodValidationPipe(getProductMetricsParamsSchema)

@Controller('/products/:productId/metrics')
@UseGuards(JwtAuthGuard)
export class ProductMetricsController {
  constructor(
    private getProductMetrics: GetProductMetricsUseCase,
    private registerProductView: RegisterProductViewUseCase,
  ) {}

  @Get()
  async getMetrics(@Param(paramsValidationPipe) params: GetProductMetricsParams) {
    try {
      const metrics = await this.getProductMetrics.execute({
        productId: params.productId,
      })

      return {
        metrics,
      }
    } catch (error) {
      if (error.message === 'Product not found') {
        throw new NotFoundException('Product not found')
      }

      throw error
    }
  }

  @Post('views')
  @Public()
  async registerView(
    @Param(paramsValidationPipe) params: GetProductMetricsParams,
    @CurrentUser() user?: UserPayload,
  ) {
    try {
      const { productView } = await this.registerProductView.execute({
        productId: params.productId,
        viewerId: user?.sub,
      })

      return {
        productView: {
          id: productView.id,
          productId: productView.productId,
          viewerId: productView.viewerId,
          createdAt: productView.createdAt,
        },
      }
    } catch (error) {
      if (error.message === 'Product not found') {
        throw new NotFoundException('Product not found')
      }

      throw error
    }
  }
} 