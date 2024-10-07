import { z } from 'zod'
import { listingResponseSchema } from '@/api/resources/shared/listing/response'

export const listingEditResponseSchema = listingResponseSchema

export type ListingEditResponse = z.infer<typeof listingEditResponseSchema>
