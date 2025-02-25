import { Category } from '../entities/category'
import { CategoriesRepository } from '../repositories/categories-repository'

interface ListCategoriesUseCaseResponse {
  categories: Category[]
}

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute(): Promise<ListCategoriesUseCaseResponse> {
    const categories = await this.categoriesRepository.findMany()

    return {
      categories,
    }
  }
} 