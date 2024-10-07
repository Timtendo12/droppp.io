import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'

const userPasswordSendInputSchema = z.object({
  email: z.string()
})

export const userPasswordSendResponseSchema = successResponseSchema

export type UserPasswordSendInput = z.infer<typeof userPasswordSendInputSchema>

export type UserPasswordSendResponse = z.infer<
  typeof userPasswordSendResponseSchema
>
