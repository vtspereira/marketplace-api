import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import {
  FindManyByOwnerParams,
  FindManyParams,
  ProductWithDetails,
  ProductsRepository,
} from '@/domain/repositories/products-repository'
import { Product } from '@/domain/entities/product'
import { PrismaProductMapper } from '../mappers/prisma-product-mapper'
import { PrismaProductWithDetailsMapper } from '../mappers/prisma-product-with-details-mapper'

@Injectable()
export class PrismaProductsRepository implements ProductsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<ProductWithDetails | null> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        owner: true,
        category: true,
        attachments: {
          include: {
            attachment: true,
          },
        },
      },
    })

    if (!product) {
      return null
    }

    return PrismaProductWithDetailsMapper.toDomain(product)
  }

  async findManyByOwner({
    ownerId,
    status,
    query,
  }: FindManyByOwnerParams): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: {
        ownerId,
        status,
        OR: query
          ? [
              {
                title: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
              {
                description: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
            ]
          : undefined,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return products.map(PrismaProductMapper.toDomain)
  }

  async findMany({ page, perPage = 20, status, query }: FindManyParams): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: {
        status,
        OR: query
          ? [
              {
                title: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
              {
                description: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
            ]
          : undefined,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: perPage,
      skip: (page - 1) * perPage,
    })

    return products.map(PrismaProductMapper.toDomain)
  }

  async create(product: Product): Promise<void> {
    const data = PrismaProductMapper.toPrisma(product)

    await this.prisma.product.create({
      data,
    })
  }

  async save(product: Product): Promise<void> {
    const data = PrismaProductMapper.toPrisma(product)

    await this.prisma.product.update({
      where: {
        id: product.id,
      },
      data,
    })
  }
} 