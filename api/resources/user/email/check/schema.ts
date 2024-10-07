import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'

const userEmailCheckInputSchema = z.object({
  email: z.string(),
  captcha_token: z.string()
})

const userEmailCheckSchema = z.object({
  registered: z.boolean(),
  captcha_enabled: z.boolean()
})

export const userEmailCheckResponseSchema =
  successResponseSchema.merge(userEmailCheckSchema)

export type UserEmailCheckInput = z.infer<typeof userEmailCheckInputSchema>

export type UserEmailCheckResponse = z.infer<
  typeof userEmailCheckResponseSchema
>
