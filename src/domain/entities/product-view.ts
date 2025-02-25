import { randomUUID } from 'node:crypto'

export interface ProductViewProps {
  productId: string
  viewerId?: string | null
  createdAt?: Date
}

export class ProductView {
  private _id: string
  private props: ProductViewProps

  constructor(props: ProductViewProps, id?: string) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }
  }

  get id() {
    return this._id
  }

  get productId() {
    return this.props.productId
  }

  get viewerId() {
    return this.props.viewerId
  }

  get createdAt() {
    return this.props.createdAt
  }
} 