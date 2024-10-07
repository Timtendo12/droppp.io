import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'

export const listingCancelResponseSchema = successResponseSchema.extend({
  listing_ids: z.array(z.number())
})

export type ListingCancelResponse = z.infer<typeof listingCancelResponseSchema>
