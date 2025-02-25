import { User } from '@/domain/entities/user'
import { CreateSellerResponseSchema } from '../dtos/create-seller'

export class SellerMapper {
  static toHTTP(user: User): CreateSellerResponseSchema['seller'] {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatarId
        ? {
            id: user.avatarId,
            url: `https://example.com/avatars/${user.avatarId}`,
          }
        : null,
    }
  }
} 