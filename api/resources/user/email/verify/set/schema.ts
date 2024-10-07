import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'

export const emailVerifySetResponseSchema = successResponseSchema

const emailVerifySetInputSchema = z.object({
  code: z.string()
})

export type EmailVerifySetInput = z.infer<typeof emailVerifySetInputSchema>

export type EmailVerifySetResponse = z.infer<
  typeof emailVerifySetResponseSchema
>
