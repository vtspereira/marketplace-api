import { z } from 'zod'

export const uploadAttachmentsResponseSchema = z.object({
  attachments: z.array(
    z.object({
      id: z.string().uuid(),
      url: z.string().url(),
    }),
  ),
})

export type UploadAttachmentsResponseSchema = z.infer<
  typeof uploadAttachmentsResponseSchema
> 