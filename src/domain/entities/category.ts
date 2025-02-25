import { randomUUID } from 'node:crypto'

export interface CategoryProps {
  title: string
  slug: string
  createdAt?: Date
  updatedAt?: Date
}

export class Category {
  private _id: string
  private props: CategoryProps

  constructor(props: CategoryProps, id?: string) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    }
  }

  get id() {
    return this._id
  }

  get title() {
    return this.props.title
  }

  get slug() {
    return this.props.slug
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  update(props: Partial<CategoryProps>) {
    this.props = {
      ...this.props,
      ...props,
      updatedAt: new Date(),
    }
  }
} 