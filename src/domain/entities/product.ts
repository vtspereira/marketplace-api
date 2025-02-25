import { randomUUID } from 'node:crypto'

export type ProductStatus = 'AVAILABLE' | 'SOLD' | 'CANCELLED'

export interface ProductProps {
  title: string
  description: string
  priceInCents: number
  status?: ProductStatus
  ownerId: string
  categoryId: string
  attachmentsIds: string[]
  createdAt?: Date
  updatedAt?: Date
}

export class Product {
  private _id: string
  private props: ProductProps

  constructor(props: ProductProps, id?: string) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      status: props.status ?? 'AVAILABLE',
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

  get description() {
    return this.props.description
  }

  get priceInCents() {
    return this.props.priceInCents
  }

  get status() {
    return this.props.status
  }

  get ownerId() {
    return this.props.ownerId
  }

  get categoryId() {
    return this.props.categoryId
  }

  get attachmentsIds() {
    return this.props.attachmentsIds
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  update(props: Partial<ProductProps>) {
    this.props = {
      ...this.props,
      ...props,
      updatedAt: new Date(),
    }
  }

  changeStatus(status: ProductStatus) {
    if (this.props.status === 'SOLD' && status === 'CANCELLED') {
      throw new Error('Cannot cancel a sold product')
    }

    if (this.props.status === 'CANCELLED' && status === 'SOLD') {
      throw new Error('Cannot sell a cancelled product')
    }

    this.props.status = status
    this.props.updatedAt = new Date()
  }
} 