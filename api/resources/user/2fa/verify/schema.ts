import { z } from 'zod'
import { successResponseSchema } from '../../../shared/success'

export const setup2faVerifyCodeResponseSchema = successResponseSchema.extend({
  recovery_phrase: z.string().optional()
})

export type Setup2faVerifyCodeResponse = z.infer<
  typeof setup2faVerifyCodeResponseSchema
>
