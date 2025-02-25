import {
  Controller,
  Get,
  NotFoundException,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { GetSellerProfileUseCase } from '@/domain/use-cases/get-seller-profile'
import { SellerMapper } from '../mappers/seller-mapper'

@Controller('/sellers/me')
@UseGuards(JwtAuthGuard)
export class GetSellerProfileController {
  constructor(private getSellerProfile: GetSellerProfileUseCase) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    try {
      const { user: seller } = await this.getSellerProfile.execute({
        userId: user.sub,
      })

      return {
        seller: SellerMapper.toHTTP(seller),
      }
    } catch (error) {
      if (error.message === 'User not found') {
        throw new NotFoundException('User not found')
      }

      throw error
    }
  }
} 