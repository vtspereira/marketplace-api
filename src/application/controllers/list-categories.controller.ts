import { Controller, Get } from '@nestjs/common'
import { ListCategoriesUseCase } from '@/domain/use-cases/list-categories'
import { CategoryMapper } from '../mappers/category-mapper'

@Controller('/categories')
export class ListCategoriesController {
  constructor(private listCategories: ListCategoriesUseCase) {}

  @Get()
  async handle() {
    const { categories } = await this.listCategories.execute()

    return {
      categories: categories.map(CategoryMapper.toHTTP),
    }
  }
} 