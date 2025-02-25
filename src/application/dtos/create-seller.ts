import { z } from 'zod'

export const createSellerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  password: z.string().min(6),
  passwordConfirmation: z.string(),
  avatarId: z.string().uuid().nullable().optional(),
})

export type CreateSellerBodySchema = z.infer<typeof createSellerBodySchema>

export const createSellerResponseSchema = z.object({
  seller: z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    avatar: z
      .object({
        id: z.string().uuid(),
        url: z.string().url(),
      })
      .nullable(),
  }),
})

export type CreateSellerResponseSchema = z.infer<typeof createSellerResponseSchema> 