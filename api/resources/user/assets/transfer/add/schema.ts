import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'

export const transferInputSchema = z.object({
  assets: z.array(z.number()),
  to: z.string(),
  memo: z.string().optional(),
  code: z.string().optional(),
  captcha_token: z.string().optional()
})

export const transferAddResponseSchema = successResponseSchema.extend({
  action: z.object({
    id: z.number(),
    type: z.string(),
    info: z.string(),
    info_count: z.number()
  })
})

export type TransferInput = z.infer<typeof transferInputSchema>

export type TransferAddResponse = z.infer<typeof transferAddResponseSchema>
