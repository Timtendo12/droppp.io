import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'

const userPasswordResetInputSchema = z.object({
  token: z.string(),
  password: z.string()
})

export const userPasswordResetResponseSchema = successResponseSchema

export type UserPasswordResetInput = z.infer<
  typeof userPasswordResetInputSchema
>

export type UserPasswordResetResponse = z.infer<
  typeof userPasswordResetResponseSchema
>
