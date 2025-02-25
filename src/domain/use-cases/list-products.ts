import { Product } from '../entities/product'
import { ProductsRepository } from '../repositories/products-repository'

interface ListProductsUseCaseRequest {
  page: number
  perPage?: number
  status?: 'AVAILABLE' | 'SOLD' | 'CANCELLED'
  query?: string
}

interface ListProductsUseCaseResponse {
  products: Product[]
}

export class ListProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    page,
    perPage,
    status,
    query,
  }: ListProductsUseCaseRequest): Promise<ListProductsUseCaseResponse> {
    const products = await this.productsRepository.findMany({
      page,
      perPage,
      status,
      query,
    })

    return {
      products,
    }
  }
} 