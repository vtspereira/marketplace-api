import { z } from 'zod'

export const authenticateSellerBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type AuthenticateSellerBodySchema = z.infer<typeof authenticateSellerBodySchema>

export const authenticateSellerResponseSchema = z.object({
  accessToken: z.string(),
})

export type AuthenticateSellerResponseSchema = z.infer<typeof authenticateSellerResponseSchema> 