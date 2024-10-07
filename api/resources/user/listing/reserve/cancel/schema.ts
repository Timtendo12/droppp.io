import { successResponseSchema } from '@/api/resources/shared/success'
import { z } from 'zod'

export const cancelReservationResponseSchema = successResponseSchema.extend({
  listing_id: z.number()
})

export type CancelReservationResponse = z.infer<
  typeof cancelReservationResponseSchema
>
