import { ProductsRepository } from '../repositories/products-repository'
import { ProductViewsRepository } from '../repositories/product-views-repository'

interface GetProductMetricsUseCaseRequest {
  productId: string
}

interface GetProductMetricsUseCaseResponse {
  views: number
  uniqueViews: number
}

export class GetProductMetricsUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private productViewsRepository: ProductViewsRepository,
  ) {}

  async execute({
    productId,
  }: GetProductMetricsUseCaseRequest): Promise<GetProductMetricsUseCaseResponse> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      throw new Error('Product not found')
    }

    const metrics = await this.productViewsRepository.getMetrics(productId)

    return metrics
  }
} 