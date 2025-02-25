import { Category } from '@/domain/entities/category'
import { ListCategoriesResponseSchema } from '../dtos/list-categories'

export class CategoryMapper {
  static toHTTP(category: Category): ListCategoriesResponseSchema['categories'][0] {
    return {
      id: category.id,
      title: category.title,
      slug: category.slug,
    }
  }
} 