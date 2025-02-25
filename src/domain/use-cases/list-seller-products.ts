import { Product } from '../entities/product'
import { ProductsRepository } from '../repositories/products-repository'

interface ListSellerProductsUseCaseRequest {
  sellerId: string
  status?: 'AVAILABLE' | 'SOLD' | 'CANCELLED'
  query?: string
}

interface ListSellerProductsUseCaseResponse {
  products: Product[]
}

export class ListSellerProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    sellerId,
    status,
    query,
  }: ListSellerProductsUseCaseRequest): Promise<ListSellerProductsUseCaseResponse> {
    const products = await this.productsRepository.findManyByOwner({
      ownerId: sellerId,
      status,
      query,
    })

    return {
      products,
    }
  }
} 