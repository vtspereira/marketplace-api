import { Category as PrismaCategory, Prisma } from '@prisma/client'
import { Category } from '@/domain/entities/category'

export class PrismaCategoryMapper {
  static toPrisma(category: Category): Prisma.CategoryUncheckedCreateInput {
    return {
      id: category.id,
      title: category.title,
      slug: category.slug,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    }
  }

  static toDomain(raw: PrismaCategory): Category {
    return new Category(
      {
        title: raw.title,
        slug: raw.slug,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    )
  }
} 