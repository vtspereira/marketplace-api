import { ProductWithDetails } from '@/domain/repositories/products-repository'
import { GetProductResponse } from '../dtos/get-product'

export class ProductMapper {
  static toHTTP(product: ProductWithDetails): GetProductResponse['product'] {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      priceInCents: product.priceInCents,
      status: product.status,
      owner: {
        id: product.owner.id,
        name: product.owner.name,
        email: product.owner.email,
        phone: product.owner.phone,
        avatar: product.owner.avatarId
          ? {
              id: product.owner.avatarId,
              url: `https://example.com/avatars/${product.owner.avatarId}`,
            }
          : null,
      },
      category: {
        id: product.category.id,
        title: product.category.title,
        slug: product.category.slug,
      },
      attachments: product.attachments,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }
  }
} 