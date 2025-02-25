import { Module } from '@nestjs/common'
import { RegisterSellerController } from '@/application/controllers/register-seller.controller'
import { RegisterSellerUseCase } from '@/domain/use-cases/register-seller'
import { PrismaModule } from '../database/prisma/prisma.module'
import { AuthenticateSellerController } from '@/application/controllers/authenticate-seller.controller'
import { AuthenticateSellerUseCase } from '@/domain/use-cases/authenticate-seller'
import { AuthModule } from '../auth/auth.module'
import { GetSellerProfileController } from '@/application/controllers/get-seller-profile.controller'
import { GetSellerProfileUseCase } from '@/domain/use-cases/get-seller-profile'
import { StorageModule } from '../storage/storage.module'
import { UploadAttachmentsController } from '@/application/controllers/upload-attachments.controller'
import { UploadAttachmentsUseCase } from '@/domain/use-cases/upload-attachments'
import { ListCategoriesController } from '@/application/controllers/list-categories.controller'
import { ListCategoriesUseCase } from '@/domain/use-cases/list-categories'
import { AuthenticateController } from '@/application/controllers/authenticate.controller'
import { CreateAccountController } from '@/application/controllers/create-account.controller'
import { FetchProfileController } from '@/application/controllers/fetch-profile.controller'
import { UploadAttachmentController } from '@/application/controllers/upload-attachment.controller'
import { CreateProductController } from '@/application/controllers/create-product.controller'
import { CreateProductUseCase } from '@/domain/use-cases/create-product'
import { ListProductsController } from '@/application/controllers/list-products.controller'
import { ListProductsUseCase } from '@/domain/use-cases/list-products'
import { GetProductController } from '@/application/controllers/get-product.controller'
import { GetProductUseCase } from '@/domain/use-cases/get-product'
import { EditProductController } from '@/application/controllers/edit-product.controller'
import { EditProductUseCase } from '@/domain/use-cases/edit-product'
import { ListSellerProductsController } from '@/application/controllers/list-seller-products.controller'
import { ListSellerProductsUseCase } from '@/domain/use-cases/list-seller-products'
import { ProductMetricsController } from '@/application/controllers/product-metrics.controller'
import { GetProductMetricsUseCase } from '@/domain/use-cases/get-product-metrics'
import { RegisterProductViewUseCase } from '@/domain/use-cases/register-product-view'
import { ProductReviewsController } from '@/application/controllers/product-reviews.controller'
import { CreateProductReviewUseCase } from '@/domain/use-cases/create-product-review'
import { ListProductReviewsUseCase } from '@/domain/use-cases/list-product-reviews'

@Module({
  imports: [PrismaModule, AuthModule, StorageModule],
  controllers: [
    RegisterSellerController,
    AuthenticateSellerController,
    GetSellerProfileController,
    UploadAttachmentsController,
    ListCategoriesController,
    CreateProductController,
    ListProductsController,
    GetProductController,
    EditProductController,
    ListSellerProductsController,
    ProductMetricsController,
    ProductReviewsController,
  ],
  providers: [
    RegisterSellerUseCase,
    AuthenticateSellerUseCase,
    GetSellerProfileUseCase,
    UploadAttachmentsUseCase,
    ListCategoriesUseCase,
    CreateProductUseCase,
    ListProductsUseCase,
    GetProductUseCase,
    EditProductUseCase,
    ListSellerProductsUseCase,
    GetProductMetricsUseCase,
    RegisterProductViewUseCase,
    CreateProductReviewUseCase,
    ListProductReviewsUseCase,
  ],
})
export class HttpModule {} 