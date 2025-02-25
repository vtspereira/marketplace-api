import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import {
  CreateSellerBodySchema,
  createSellerBodySchema,
} from '../dtos/create-seller'
import { RegisterSellerUseCase } from '@/domain/use-cases/register-seller'
import { SellerMapper } from '../mappers/seller-mapper'

@Controller('/sellers')
export class RegisterSellerController {
  constructor(private registerSeller: RegisterSellerUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(new ZodValidationPipe(createSellerBodySchema))
    body: CreateSellerBodySchema,
  ) {
    const { name, email, phone, password, passwordConfirmation, avatarId } = body

    if (password !== passwordConfirmation) {
      throw new BadRequestException('Password confirmation does not match')
    }

    try {
      const { user } = await this.registerSeller.execute({
        name,
        email,
        phone,
        password,
        avatarId,
      })

      return {
        seller: SellerMapper.toHTTP(user),
      }
    } catch (error) {
      if (error.message === 'Email already exists') {
        throw new ConflictException('Email already exists')
      }

      if (error.message === 'Phone already exists') {
        throw new ConflictException('Phone already exists')
      }

      throw error
    }
  }
} 