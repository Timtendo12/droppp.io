import { z } from 'zod'
import { assetSchema } from '../asset'

export const listingSchema = z.object({
  id: z.number(),
  chain_asset_id: z.number(),
  data_id: z.number(),
  listing_price: z.number(),
  status: z.number(),
  seller_user_id: z.number(),
  reservation_id: z.string().nullable(),
  price_quote_waxusd: z.number(),
  timeout: z.number(),
  max_timeout: z.number(),
  asset: assetSchema
})

export const listingsSchema = z.array(listingSchema)

export type Listing = z.infer<typeof listingSchema>
export type Listings = z.infer<typeof listingsSchema>
