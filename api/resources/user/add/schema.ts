import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'
import { tokenSchema } from '@/api/resources/shared/token'
import { userSchema } from '@/api/resources/shared/user'

export const userSignupResponseSchema = successResponseSchema.extend({
  token: tokenSchema,
  user: userSchema,
  redirect_uri: z.string().nullable()
})

export type UserSignupResponse = z.infer<typeof userSignupResponseSchema>
