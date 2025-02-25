import { Category } from '../entities/category'

export abstract class CategoriesRepository {
  abstract create(category: Category): Promise<void>
  abstract findById(id: string): Promise<Category | null>
  abstract findBySlug(slug: string): Promise<Category | null>
  abstract findMany(): Promise<Category[]>
  abstract save(category: Category): Promise<void>
  abstract delete(id: string): Promise<void>
} 