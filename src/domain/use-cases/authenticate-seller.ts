import { compare } from 'bcrypt'
import { UsersRepository } from '../repositories/users-repository'

interface AuthenticateSellerUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateSellerUseCaseResponse {
  userId: string
}

export class AuthenticateSellerUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateSellerUseCaseRequest): Promise<AuthenticateSellerUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new Error('Invalid credentials')
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new Error('Invalid credentials')
    }

    return {
      userId: user.id,
    }
  }
} 