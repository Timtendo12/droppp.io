import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'

const newsletterInputSchema = z.object({
  email: z.string()
})

export type NewsletterInput = z.infer<typeof newsletterInputSchema>

export const userNewsletterResponseSchema = successResponseSchema

export type UserNewsletterSubscribeResponse = z.infer<
  typeof userNewsletterResponseSchema
>
