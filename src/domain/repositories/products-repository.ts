import { Product, ProductStatus } from '../entities/product'

export interface FindManyByOwnerParams {
  ownerId: string
  status?: ProductStatus
  query?: string
}

export interface FindManyParams {
  page: number
  perPage?: number
  status?: ProductStatus
  query?: string
}

export interface ProductWithDetails extends Product {
  owner: {
    id: string
    name: string
    email: string
    phone: string
    avatarId: string | null
  }
  category: {
    id: string
    title: string
    slug: string
  }
  attachments: Array<{
    id: string
    url: string
  }>
}

export abstract class ProductsRepository {
  abstract create(product: Product): Promise<void>
  abstract findById(id: string): Promise<ProductWithDetails | null>
  abstract findManyByOwner(params: FindManyByOwnerParams): Promise<Product[]>
  abstract findMany(params: FindManyParams): Promise<Product[]>
 