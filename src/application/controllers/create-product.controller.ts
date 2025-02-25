import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { CreateProductUseCase } from '@/domain/use-cases/create-product'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { createProductBodySchema } from '../dtos/create-product'

const bodyValidationPipe = new ZodValidationPipe(createProductBodySchema)

@Controller('/products')
@UseGuards(JwtAuthGuard)
export class CreateProductController {
  constructor(private createProduct: CreateProductUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: z.infer<typeof createProductBodySchema>,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, description, priceInCents, categoryId, attachmentsIds } = body
    const userId = user.sub

    const { product } = await this.createProduct.execute({
      title,
      description,
      priceInCents,
      categoryId,
      attachmentsIds,
      ownerId: userId,
    })

    return {
      product: {
        id: product.id,
        title: product.title,
        description: product.description,
        priceInCents: product.priceInCents,
        status: product.status,
        categoryId: product.categoryId,
        ownerId: product.ownerId,
        attachmentsIds: product.attachmentsIds,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
    }
  }
} 