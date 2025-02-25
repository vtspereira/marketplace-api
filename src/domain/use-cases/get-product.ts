import { ProductWithDetails, ProductsRepository } from '../repositories/products-repository'

interface GetProductUseCaseRequest {
  productId: string
}

interface GetProductUseCaseResponse {
  product: ProductWithDetails
}

export class GetProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    productId,
  }: GetProductUseCaseRequest): Promise<GetProductUseCaseResponse> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      throw new Error('Product not found')
    }

    return {
      product,
    }
  }
} 