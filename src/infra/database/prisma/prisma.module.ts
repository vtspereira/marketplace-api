import { Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { UsersRepository } from '@/domain/repositories/users-repository'
import { PrismaUsersRepository } from './repositories/prisma-users-repository'
import { AttachmentsRepository } from '@/domain/repositories/attachments-repository'
import { PrismaAttachmentsRepository } from './repositories/prisma-attachments-repository'
import { CategoriesRepository } from '@/domain/repositories/categories-repository'
import { PrismaCategoriesRepository } from './repositories/prisma-categories-repository'
import { ProductsRepository } from '@/domain/repositories/products-repository'
import { PrismaProductsRepository } from './repositories/prisma-products-repository'
import { ProductViewsRepository } from '@/domain/repositories/product-views-repository'
import { PrismaProductViewsRepository } from './repositories/prisma-product-views-repository'
import { ProductReviewsRepository } from '@/domain/repositories/product-reviews-repository'
import { PrismaProductReviewsRepository } from './repositories/prisma-product-reviews-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: AttachmentsRepository,
      useClass: PrismaAttachmentsRepository,
    },
    {
      provide: CategoriesRepository,
      useClass: PrismaCategoriesRepository,
    },
    {
      provide: ProductsRepository,
      useClass: PrismaProductsRepository,
    },
    {
      provide: ProductViewsRepository,
      useClass: PrismaProductViewsRepository,
    },
    {
      provide: ProductReviewsRepository,
      useClass: PrismaProductReviewsRepository,
    },
  ],
  exports: [
    PrismaService,
    UsersRepository,
    AttachmentsRepository,
    CategoriesRepository,
    ProductsRepository,
    ProductViewsRepository,
    ProductReviewsRepository,
  ],
})
export class PrismaModule {} 