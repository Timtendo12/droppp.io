import { z } from 'zod'
import { listingResponseSchema } from '@/api/resources/shared/listing/response'

export const listingGetResponseSchema = listingResponseSchema.extend({
  status_display: z.object({
    active: z.number(),
    pending: z.number(),
    purchased: z.number()
  })
})

export type ListingGetResponse = z.infer<typeof listingGetResponseSchema>
