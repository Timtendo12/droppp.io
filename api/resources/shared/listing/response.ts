import { successResponseSchema } from '../success'
import { listingsSchema } from './listing'

export const listingResponseSchema = successResponseSchema.extend({
  listings: listingsSchema
})
