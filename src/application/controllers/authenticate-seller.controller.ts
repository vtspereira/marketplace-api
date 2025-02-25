import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import {
  AuthenticateSellerBodySchema,
  authenticateSellerBodySchema,
} from '../dtos/authenticate-seller'
import { AuthenticateSellerUseCase } from '@/domain/use-cases/authenticate-seller'

@Controller('/sellers/sessions')
export class AuthenticateSellerController {
  constructor(
    private authenticateSeller: AuthenticateSellerUseCase,
    private jwt: JwtService,
  ) {}

  @Post()
  @HttpCode(200)
  async handle(
    @Body(new ZodValidationPipe(authenticateSellerBodySchema))
    body: AuthenticateSellerBodySchema,
  ) {
    try {
      const { userId } = await this.authenticateSeller.execute(body)

      const accessToken = this.jwt.sign({ sub: userId })

      return {
        accessToken,
      }
    } catch (error) {
      if (error.message === 'Invalid credentials') {
        throw new UnauthorizedException('Invalid credentials')
      }

      throw error
    }
  }
} 