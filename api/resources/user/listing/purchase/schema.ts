import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'

export const listingPurchaseInputSchema = z.object({
  reservation_id: z.number()
})

export const listingPurchaseSchema = z.object({
  id: z.number(),
  chain_asset_id: z.number(),
  seller_account_id: z.number().optional(),
  buyer_account_id: z.null().optional(),
  listing_price: z.number(),
  collection_fee: z.number(),
  blockchain_fee: z.number(),
  marketplace_fee: z.number(),
  drop_tx_id: z.number().nullable().optional(),
  time_created: z.string().optional(),
  time_updated: z.string().optional(),
  time_reserve: z.string().optional(),
  time_purchased: z.string().nullable(),
  buyer_wallet_history_id: z.number().nullable().optional(),
  seller_wallet_history_id: z.number().nullable().optional(),
  status: z.number(),
  seller_user_id: z.number(),
  buyer_user_id: z.number().optional(),
  reservation_id: z.string()
})

export const listingPurchaseResponseSchema = successResponseSchema.extend({
  listing: listingPurchaseSchema
})

export type ListingPurchase = z.infer<typeof listingPurchaseSchema>
export type ListingPurchaseResponse = z.infer<
  typeof listingPurchaseResponseSchema
>
export type ListingPurchaseInput = z.infer<typeof listingPurchaseInputSchema>
