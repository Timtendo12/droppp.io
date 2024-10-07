import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'

const userPasswordSetInputSchema = z.object({
  current_password: z.string(),
  new_password: z.string()
})

export const userPasswordSetResponseSchema = successResponseSchema

export type UserPasswordSetInput = z.infer<typeof userPasswordSetInputSchema>

export type UserPasswordSetResponse = z.infer<
  typeof userPasswordSetResponseSchema
>
