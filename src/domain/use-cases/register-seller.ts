import { hash } from 'bcrypt'
import { User } from '../entities/user'
import { UsersRepository } from '../repositories/users-repository'

interface RegisterSellerUseCaseRequest {
  name: string
  email: string
  phone: string
  password: string
  avatarId?: string
}

interface RegisterSellerUseCaseResponse {
  user: User
}

export class RegisterSellerUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    phone,
    password,
    avatarId,
  }: RegisterSellerUseCaseRequest): Promise<RegisterSellerUseCaseResponse> {
    const emailAlreadyExists = await this.usersRepository.findByEmail(email)

    if (emailAlreadyExists) {
      throw new Error('Email already exists')
    }

    const phoneAlreadyExists = await this.usersRepository.findByPhone(phone)

    if (phoneAlreadyExists) {
      throw new Error('Phone already exists')
    }

    const hashedPassword = await hash(password, 8)

    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      avatarId,
    })

    await this.usersRepository.create(user)

    return {
      user,
    }
  }
} 