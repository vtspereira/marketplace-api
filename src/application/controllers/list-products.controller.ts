import { Controller, Get, Query } from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import {
  ListProductsQueryParams,
  listProductsQueryParamsSchema,
} from '../dtos/list-products'
import { ListProductsUseCase } from '@/domain/use-cases/list-products'

const queryValidationPipe = new ZodValidationPipe(listProductsQueryParamsSchema)

@Controller('/products')
export class ListProductsController {
  constructor(private listProducts: ListProductsUseCase) {}

  @Get()
  async handle(@Query(queryValidationPipe) query: ListProductsQueryParams) {
    const { page, perPage, status, query: searchQuery } = query

    const { products } = await this.listProducts.execute({
      page,
      perPage,
      status,
      query: searchQuery,
    })

    return {
      products: products.map((product) => ({
        id: product.id,
        title: product.title,
        description: product.description,
        priceInCents: product.priceInCents,
        status: product.status,
        categoryId: product.categoryId,
        ownerId: product.ownerId,
        attachmentsIds: product.attachmentsIds,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      })),
    }
  }
} 