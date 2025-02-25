import { Controller, Get, Param, Query } from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import {
  ListSellerProductsParams,
  ListSellerProductsQuery,
  listSellerProductsParamsSchema,
  listSellerProductsQuerySchema,
} from '../dtos/list-seller-products'
import { ListSellerProductsUseCase } from '@/domain/use-cases/list-seller-products'

const queryValidationPipe = new ZodValidationPipe(listSellerProductsQuerySchema)
const paramsValidationPipe = new ZodValidationPipe(listSellerProductsParamsSchema)

@Controller('/sellers/:sellerId/products')
export class ListSellerProductsController {
  constructor(private listSellerProducts: ListSellerProductsUseCase) {}

  @Get()
  async handle(
    @Query(queryValidationPipe) query: ListSellerProductsQuery,
    @Param(paramsValidationPipe) params: ListSellerProductsParams,
  ) {
    const { status, query: searchQuery } = query
    const { sellerId } = params

    const { products } = await this.listSellerProducts.execute({
      sellerId,
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