import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'

const subscriptionSubscribeInputSchema = z.object({
  email: z.string(),
  drop_id: z.number()
})

export const subscriptionSubscribeResponseSchema = successResponseSchema

export type SubscriptionSubscribeInput = z.infer<
  typeof subscriptionSubscribeInputSchema
>

export type SubscriptionSubscribeResponse = z.infer<
  typeof subscriptionSubscribeResponseSchema
>
