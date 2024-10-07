import { successResponseSchema } from '../success'
import { reserveListingSchema } from '.'
import { z } from 'zod'

export const reservedListingResponseSchema =
  successResponseSchema.merge(reserveListingSchema)

export type ReservedListingResponse = z.infer<
  typeof reservedListingResponseSchema
>
