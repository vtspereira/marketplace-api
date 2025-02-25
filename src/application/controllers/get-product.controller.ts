import {
  Controller,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import {
  GetProductParams,
  getProductParamsSchema,
} from '../dtos/get-product'
import { GetProductUseCase } from '@/domain/use-cases/get-product'
import { ProductMapper } from '../mappers/product-mapper'

const paramsValidationPipe = new ZodValidationPipe(getProductParamsSchema)

@Controller('/products/:id')
export class GetProductController {
  constructor(private getProduct: GetProductUseCase) {}

  @Get()
  async handle(@Param(paramsValidationPipe) params: GetProductParams) {
    try {
      const { product } = await this.getProduct.execute({
        productId: params.id,
      })

      return {
        product: ProductMapper.toHTTP(product),
      }
    } catch (error) {
      if (error.message === 'Product not found') {
        throw new NotFoundException('Product not found')
      }

      throw error
    }
  }
} 