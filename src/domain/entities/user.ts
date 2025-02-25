import { randomUUID } from 'node:crypto'

export interface UserProps {
  name: string
  email: string
  phone: string
  password: string
  avatarId?: string | null
  createdAt?: Date
  updatedAt?: Date
}

export class User {
  private _id: string
  private props: UserProps

  constructor(props: UserProps, id?: string) {
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

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get phone() {
    return this.props.phone
  }

  get password() {
    return this.props.password
  }

  get avatarId() {
    return this.props.avatarId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  update(props: Partial<UserProps>) {
    this.props = {
      ...this.props,
      ...props,
      updatedAt: new Date(),
    }
  }
} 