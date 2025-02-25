import { User } from '../entities/user'
import { UsersRepository } from '../repositories/users-repository'

interface GetSellerProfileUseCaseRequest {
  userId: string
}

interface GetSellerProfileUseCaseResponse {
  user: User
}

export class GetSellerProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetSellerProfileUseCaseRequest): Promise<GetSellerProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    return {
      user,
    }
  }
} 