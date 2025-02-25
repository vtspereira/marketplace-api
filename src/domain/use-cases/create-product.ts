import { Product } from '../entities/product'
import { ProductsRepository } from '../repositories/products-repository'
import { UsersRepository } from '../repositories/users-repository'
import { CategoriesRepository } from '../repositories/categories-repository'
import { AttachmentsRepository } from '../repositories/attachments-repository'

interface CreateProductUseCaseRequest {
  title: string
  description: string
  priceInCents: number
  categoryId: string
  attachmentsIds: string[]
  ownerId: string
}

interface CreateProductUseCaseResponse {
  product: Product
}

export class CreateProductUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private usersRepository: UsersRepository,
    private categoriesRepository: CategoriesRepository,
    private attachmentsRepository: AttachmentsRepository,
  ) {}

  async execute({
    title,
    description,
    priceInCents,
    categoryId,
    attachmentsIds,
    ownerId,
  }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
    const owner = await this.usersRepository.findById(ownerId)

    if (!owner) {
      throw new Error('Owner not found')
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

    const product = new Product({
      title,
      description,
      priceInCents,
      categoryId,
      attachmentsIds,
      ownerId,
    })

    await this.productsRepository.create(product)

    return {
      product,
    }
  }
} 