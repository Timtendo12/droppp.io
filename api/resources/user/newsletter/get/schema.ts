import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'

const newsletterSubscriptionSchema = z.object({
  subscribed: z.boolean(),
  subscribed_email: z.string().nullable()
})

export const userNewsletterResponseSchema = successResponseSchema.merge(
  newsletterSubscriptionSchema
)

export type NewsletterSubscription = z.infer<
  typeof newsletterSubscriptionSchema
>

export type UserNewsletterGetResponse = z.infer<
  typeof userNewsletterResponseSchema
>
