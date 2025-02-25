import {
  Body,
  Controller,
  ForbiddenException,
  NotFoundException,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import {
  EditProductBody,
  EditProductParams,
  editProductBodySchema,
  editProductParamsSchema,
} from '../dtos/edit-product'
import { EditProductUseCase } from '@/domain/use-cases/edit-product'

const bodyValidationPipe = new ZodValidationPipe(editProductBodySchema)
const paramsValidationPipe = new ZodValidationPipe(editProductParamsSchema)

@Controller('/products/:id')
@UseGuards(JwtAuthGuard)
export class EditProductController {
  constructor(private editProduct: EditProductUseCase) {}

  @Put()
  async handle(
    @Body(bodyValidationPipe) body: EditProductBody,
    @Param(paramsValidationPipe) params: EditProductParams,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, description, priceInCents, categoryId, attachmentsIds } = body
    const userId = user.sub

    try {
      const { product } = await this.editProduct.execute({
        productId: params.id,
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
    } catch (error) {
      if (error.message === 'Product not found') {
        throw new NotFoundException('Product not found')
      }

      if (error.message === 'Not allowed') {
        throw new ForbiddenException('Not allowed to edit this product')
      }

      throw error
    }
  }
} 