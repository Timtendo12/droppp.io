import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'

export const userNewsletterResponseSchema = successResponseSchema

export type UserNewsletterUnsubscribeResponse = z.infer<
  typeof userNewsletterResponseSchema
>
