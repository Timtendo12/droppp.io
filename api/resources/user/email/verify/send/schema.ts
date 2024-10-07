import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'

export const emailVerifySendResponseSchema = successResponseSchema

export type EmailVerifySendResponse = z.infer<
  typeof emailVerifySendResponseSchema
>
