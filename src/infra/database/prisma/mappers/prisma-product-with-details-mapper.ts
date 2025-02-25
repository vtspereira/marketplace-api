import { Product as PrismaProduct, User, Category, Attachment } from '@prisma/client'
import { ProductWithDetails } from '@/domain/repositories/products-repository'
import { Product } from '@/domain/entities/product'

interface PrismaProductDetails extends PrismaProduct {
  owner: User
  category: Category
  attachments: Array<{
    attachment: Attachment
  }>
}

export class PrismaProductWithDetailsMapper {
  static toDomain(raw: PrismaProductDetails): ProductWithDetails {
    return {
      ...new Product(
        {
          title: raw.title,
          description: raw.description,
          priceInCents: raw.priceInCents,
          status: raw.status,
          ownerId: raw.ownerId,
          categoryId: raw.categoryId,
          attachmentsIds: raw.attachments.map(
            (attachment) => attachment.attachment.id,
          ),
          createdAt: raw.createdAt,
          updatedAt: raw.updatedAt,
        },
        raw.id,
      ),
      owner: {
        id: raw.owner.id,
        name: raw.owner.name,
        email: raw.owner.email,
        phone: raw.owner.phone,
        avatarId: raw.owner.avatarId,
      },
      category: {
        id: raw.category.id,
        title: raw.category.title,
        slug: raw.category.slug,
      },
      attachments: raw.attachments.map((attachment) => ({
        id: attachment.attachment.id,
        url: attachment.attachment.url,
      })),
    }
  }
} 