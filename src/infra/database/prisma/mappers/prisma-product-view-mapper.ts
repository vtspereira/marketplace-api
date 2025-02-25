import { ProductView as PrismaProductView, Prisma } from '@prisma/client'
import { ProductView } from '@/domain/entities/product-view'

export class PrismaProductViewMapper {
  static toPrisma(productView: ProductView): Prisma.ProductViewUncheckedCreateInput {
    return {
      id: productView.id,
      productId: productView.productId,
      viewerId: productView.viewerId,
      createdAt: productView.createdAt,
    }
  }

  static toDomain(raw: PrismaProductView): ProductView {
    return new ProductView(
      {
        productId: raw.productId,
        viewerId: raw.viewerId,
        createdAt: raw.createdAt,
      },
      raw.id,
    )
  }
} 