import { randomUUID } from 'node:crypto'

export interface ProductReviewProps {
  productId: string
  authorId: string
  rating: number
  content: string
  createdAt?: Date
  updatedAt?: Date
}

export class ProductReview {
  private _id: string
  private props: ProductReviewProps

  constructor(props: ProductReviewProps, id?: string) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    }

    this.validate()
  }

  get id() {
    return this._id
  }

  get productId() {
    return this.props.productId
  }

  get authorId() {
    return this.props.authorId
  }

  get rating() {
    return this.props.rating
  }

  get content() {
    return this.props.content
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private validate() {
    if (this.props.rating < 1 || this.props.rating > 5) {
      throw new Error('Rating must be between 1 and 5')
    }

    if (this.props.content.length < 10) {
      throw new Error('Review content must be at least 10 characters long')
    }

    if (this.props.content.length > 1000) {
      throw new Error('Review content must be at most 1000 characters long')
    }
  }

  update(content: string, rating: number) {
    this.props.content = content
    this.props.rating = rating
    this.props.updatedAt = new Date()

    this.validate()
  }
} 