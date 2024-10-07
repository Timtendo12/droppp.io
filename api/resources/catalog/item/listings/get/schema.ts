import { z } from 'zod'
import { itemRaritySchema } from '@/api/resources/shared/rarity'
import { mediaItemSchema } from '@/api/resources/shared/media'
import { successResponseSchema } from '@/api/resources/shared/success'
import { traitSchema } from '@/api/resources/shared/trait'
import { listingProfileSchema } from '@/api/resources/shared/listingProfile'

const catalogItemListingsGetInputSchema = z.object({
  chain_template_id: z.string(),
  sort: z.string().optional(),
  page: z.string().optional()
})

export const listedCatalogItemSchema = z.object({
  drop_type: z.number(),
  drop_id: z.number(),
  name: z.string(),
  rarity: itemRaritySchema,
  variant: z.string().nullable(),
  author: z.string(),
  chain_template_id: z.number(),
  mint_count: z.number(),
  series: z.number(),
  drop_name: z.string(),
  description: z.string().optional(),
  media: z.array(mediaItemSchema),
  listing_count: z.number(),
  listing_price: z.number().nullable(),
  listings_available: z.number(),
  data_id: z.number(),
  redeem_start_date: z.string().nullable(),
  redeem_end_date: z.string().nullable(),
  redeem_ship_date: z.string().optional().nullable(),
  is_mine: z.boolean().optional(),
  owned_count: z.number(),
  redeemable: z.boolean().optional(),
  exclusive: z.boolean().optional(),
  traits: z.array(traitSchema).optional()
})

export const mintListingSchema = z.object({
  asset_id: z.number(),
  mint_num: z.number(),
  user_id: z.number(),
  owner: z.string(),
  listing_id: z.number(),
  listing_price: z.number(),
  marketplace_fee: z.number(),
  time_created: z.string(),
  time_reserve: z.string().nullable(),
  status: z.number(),
  is_reserved: z.boolean(),
  is_mine: z.boolean().optional(),
  seller: listingProfileSchema
})

const catalogItemListingsSchema = z.object({
  count: z.number(),
  more: z.boolean(),
  card: listedCatalogItemSchema,
  data: z.array(mintListingSchema)
})

export const catalogItemListingsGetResponseSchema = successResponseSchema.merge(
  catalogItemListingsSchema
)

export type ListedCatalogItem = z.infer<typeof listedCatalogItemSchema>

export type MintListing = z.infer<typeof mintListingSchema>

export type CatalogItemListings = z.infer<typeof catalogItemListingsSchema>

export type CatalogItemListingsGetInput = z.infer<
  typeof catalogItemListingsGetInputSchema
>

export type CatalogItemListingsGetResponse = z.infer<
  typeof catalogItemListingsGetResponseSchema
>
