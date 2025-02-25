import { ProductView } from '../entities/product-view'
import { ProductViewsRepository } from '../repositories/product-views-repository'
import { ProductsRepository } from '../repositories/products-repository'

interface RegisterProductViewUseCaseRequest {
  productId: string
  viewerId?: string
}

interface RegisterProductViewUseCaseResponse {
  productView: ProductView
}

export class RegisterProductViewUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private productViewsRepository: ProductViewsRepository,
  ) {}

  async execute({
    productId,
    viewerId,
  }: RegisterProductViewUseCaseRequest): Promise<RegisterProductViewUseCaseResponse> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      throw new Error('Product not found')
    }

    const productView = new ProductView({
      productId,
      viewerId,
    })

    await this.productViewsRepository.create(productView)

    return {
      productView,
    }
  }
} 