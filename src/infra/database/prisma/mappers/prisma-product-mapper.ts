import { Product as PrismaProduct, Prisma } from '@prisma/client'
import { Product } from '@/domain/entities/product'

export class PrismaProductMapper {
  static toPrisma(product: Product): Prisma.ProductUncheckedCreateInput {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      priceInCents: product.priceInCents,
      status: product.status,
      ownerId: product.ownerId,
      categoryId: product.categoryId,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      attachments: {
        createMany: {
          data: product.attachmentsIds.map((attachmentId) => ({
            attachmentId,
          })),
        },
      },
    }
  }

  static toDomain(raw: PrismaProduct): Product {
    return new Product(
      {
        title: raw.title,
        description: raw.description,
        priceInCents: raw.priceInCents,
        status: raw.status,
        ownerId: raw.ownerId,
        categoryId: raw.categoryId,
        attachmentsIds: [],
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    )
  }
} 