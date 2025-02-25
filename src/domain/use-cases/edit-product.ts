import { Product } from '../entities/product'
import { ProductsRepository } from '../repositories/products-repository'
import { CategoriesRepository } from '../repositories/categories-repository'
import { AttachmentsRepository } from '../repositories/attachments-repository'

interface EditProductUseCaseRequest {
  productId: string
  title: string
  description: string
  priceInCents: number
  categoryId: string
  attachmentsIds: string[]
  ownerId: string
}

interface EditProductUseCaseResponse {
  product: Product
}

export class EditProductUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private categoriesRepository: CategoriesRepository,
    private attachmentsRepository: AttachmentsRepository,
  ) {}

  async execute({
    productId,
    title,
    description,
    priceInCents,
    categoryId,
    attachmentsIds,
    ownerId,
  }: EditProductUseCaseRequest): Promise<EditProductUseCaseResponse> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      throw new Error('Product not found')
    }

    if (product.ownerId !== ownerId) {
      throw new Error('Not allowed')
    }

    const category = await this.categoriesRepository.findById(categoryId)

    if (!category) {
      throw new Error('Category not found')
    }

    const attachments = await this.attachmentsRepository.findManyByIds(
      attachmentsIds,
    )

    if (attachments.length !== attachmentsIds.length) {
      throw new Error('One or more attachments were not found')
    }

    product.update({
      title,
      description,
      priceInCents,
      categoryId,
      attachmentsIds,
    })

    await this.productsRepository.save(product)

    return {
      product,
    }
  }
} 