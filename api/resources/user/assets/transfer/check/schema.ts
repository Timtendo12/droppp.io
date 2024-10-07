import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'

export const transferCheckResponseSchema = successResponseSchema.extend({
  captcha_enabled: z.boolean()
})

export type TransferCheckResponse = z.infer<typeof transferCheckResponseSchema>
