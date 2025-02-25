import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Env } from '@/env'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory(config: ConfigService<Env, true>) {
        const privateKey = config.get('JWT_SECRET', { infer: true })

        return {
          signOptions: { expiresIn: '7d' },
          secret: privateKey,
        }
      },
    }),
  ],
  providers: [JwtStrategy],
})
export class AuthModule {} 