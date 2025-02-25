import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import {
  GetProductMetricsResponse,
  ProductViewsRepository,
} from '@/domain/repositories/product-views-repository'
import { ProductView } from '@/domain/entities/product-view'
import { PrismaProductViewMapper } from '../mappers/prisma-product-view-mapper'

@Injectable()
export class PrismaProductViewsRepository implements ProductViewsRepository {
  constructor(private prisma: PrismaService) {}

  async create(productView: ProductView): Promise<void> {
    const data = PrismaProductViewMapper.toPrisma(productView)

    await this.prisma.productView.create({
      data,
    })
  }

  async getMetrics(productId: string): Promise<GetProductMetricsResponse> {
    const [totalViews, uniqueViews] = await Promise.all([
      this.prisma.productView.count({
        where: {
          productId,
        },
      }),
      this.prisma.productView.count({
        where: {
          productId,
          viewerId: {
            not: null,
          },
        },
        distinct: ['viewerId'],
      }),
    ])

    return {
      views: totalViews,
      uniqueViews,
    }
  }

  async findManyByProductId(productId: string): Promise<ProductView[]> {
    const productViews = await this.prisma.productView.findMany({
      where: {
        productId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return productViews.map(PrismaProductViewMapper.toDomain)
  }
} 