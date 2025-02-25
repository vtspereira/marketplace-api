import { User as PrismaUser, Prisma } from '@prisma/client'
import { User } from '@/domain/entities/user'

export class PrismaUserMapper {
  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      avatarId: user.avatarId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  }

  static toDomain(raw: PrismaUser): User {
    return new User(
      {
        name: raw.name,
        email: raw.email,
        phone: raw.phone,
        password: raw.password,
        avatarId: raw.avatarId,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    )
  }
} 