import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CategoriesRepository } from '@/domain/repositories/categories-repository'
import { Category } from '@/domain/entities/category'
import { PrismaCategoryMapper } from '../mappers/prisma-category-mapper'

@Injectable()
export class PrismaCategoriesRepository implements CategoriesRepository {
  constructor(private prisma: PrismaService) {}

  async create(category: Category): Promise<void> {
    const data = PrismaCategoryMapper.toPrisma(category)

    await this.prisma.category.create({
      data,
    })
  }

  async findById(id: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    })

    if (!category) {
      return null
    }

    return PrismaCategoryMapper.toDomain(category)
  }

  async findBySlug(slug: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: {
        slug,
      },
    })

    if (!category) {
      return null
    }

    return PrismaCategoryMapper.toDomain(category)
  }

  async findMany(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({
      orderBy: {
        title: 'asc',
      },
    })

    return categories.map(PrismaCategoryMapper.toDomain)
  }

  async save(category: Category): Promise<void> {
    const data = PrismaCategoryMapper.toPrisma(category)

    await this.prisma.category.update({
      where: {
        id: category.id,
      },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({
      where: {
        id,
      },
    })
  }
} 