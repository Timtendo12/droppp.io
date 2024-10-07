import { z } from 'zod'
import { listingResponseSchema } from '@/api/resources/shared/listing/response'

export const listingAddInputSchema = z.object({
  price: z.number()
})

export const listingAddResponseSchema = listingResponseSchema

export type ListingAddInput = z.infer<typeof listingAddInputSchema>
export type ListingAddResponse = z.infer<typeof listingAddResponseSchema>
