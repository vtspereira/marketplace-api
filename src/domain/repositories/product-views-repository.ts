import { ProductView } from '../entities/product-view'

export interface GetProductMetricsResponse {
  views: number
  uniqueViews: number
}

export abstract class ProductViewsRepository {
  abstract create(productView: ProductView): Promise<void>
  abstract getMetrics(productId: string): Promise<GetProductMetricsResponse>
  abstract findManyByProductId(productId: string): Promise<ProductView[]>
} 