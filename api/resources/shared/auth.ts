import { z } from 'zod'
import { successResponseSchema } from './success'
import { tokenSchema } from './token'
import { userSchema } from './user'

export const authInputSchema = z.object({
  email: z.string(),
  password: z.string(),
  client_id: z.string().optional(),
  redirect_uri: z.string().optional(),
  scope: z.string().optional(),
  state: z.string().optional(),
  captcha_token: z.string().optional()
})

export const loginResponseSchema = successResponseSchema.extend({
  token: tokenSchema,
  // @fix - https://app.asana.com/0/1202989033368709/1204919255420342/f - Josh Dobson - 6/27/23
  user: userSchema,
  redirect_uri: z.string().nullable(),
  mfa_required: z.boolean(),
  email_code_required: z.boolean().optional()
})

export type AuthInput = z.infer<typeof authInputSchema>

export type LoginResponse = z.infer<typeof loginResponseSchema>
