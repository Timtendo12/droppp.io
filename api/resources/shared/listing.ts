import { z } from 'zod'
import { assetSchema } from './asset'
import { catalogItemSchema } from '../catalog/details/get/schema'

export const listingSchema = z.object({
  id: z.number(),
  chain_asset_id: z.number(),
  data_id: z.number(),
  listing_price: z.number(),
  status: z.number(),
  seller_account: z.string().optional(),
  seller_user_id: z.number(),
  reservation_id: z.string(),
  associated_redemption_coin: catalogItemSchema.nullable(),
  price_quote_waxusd: z.number(),
  timeout: z.number(),
  max_timeout: z.number(),
  net_amount: z.number().optional(),
  net_fee: z.number().optional(),
  collection_fee_amount: z.number().optional(),
  blockchain_fee_amount: z.number().optional(),
  marketplace_fee_amount: z.number().optional(),
  asset: assetSchema
})

export type ListingItem = z.infer<typeof listingSchema>
