import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'
import { mediaItemSchema } from '@/api/resources/shared/media'
import { itemRaritySchema, rarityEnum } from '@/api/resources/shared/rarity'
import { avatarMediaSchema } from '@/api/resources/shared/avatar'
import { traitSchema } from '@/api/resources/shared/trait'

export const collectionSchema = z.object({
  name: z.string(),
  display_name: z.string(),
  preview_url: z.string(),
  preview_interface: z.string().optional(),
  id: z.number()
})

export const immutablesSchema = z.object({
  cardid: z.number().optional(),
  rarity: rarityEnum.optional(),
  variant: z.string().optional(),
  'release date': z.string().optional(),
  tid: z.number().optional(),
  redeemable: z.boolean().optional(),
  series: z.number(),
  EULA: z.string().optional()
})

export const ownerSchema = z.object({
  name: z.string(),
  avatar_media: avatarMediaSchema.optional()
})

export const catalogItemStatsSchema = z.object({
  owned_count: z.number(),
  active_listing_count: z.number(),
  sold_listing_count: z.number(),
  last_sold_price: z.number(),
  lowest_sold_price: z.number(),
  median_sold_price: z.number(),
  highest_sold_price: z.number(),
  lowest_listing_price: z.number(),
  highest_listing_price: z.number(),
  holders_count: z.number(),
  burned_count: z.number(),
  collected_count: z.number(),
  remaining_count: z.number(),
  listings_available: z.number()
})

export const catalogItemDetailSchema = z.object({
  drop_id: z.number(),
  name: z.string(),
  rarity: itemRaritySchema,
  variant: z.string().nullable(),
  schema_name: z.string(),
  author: z.string(),
  chain_template_id: z.number().optional(),
  transferable: z.boolean(),
  burnable: z.boolean(),
  cardid: z.number().nullable(),
  mint_count: z.number(),
  series: z.number(),
  drop_name: z.string(),
  description: z.string().optional(),
  legal: z.string().optional(),
  media: z.array(mediaItemSchema),
  collection: collectionSchema,
  chain_url: z.string(),
  atomichub_url: z.string(),
  neftyblocks_url: z.string(),
  nfthive_url: z.string(),
  chainchamps_url: z.string(),
  listing_count: z.number(),
  listing_price: z.number().nullable(),
  listings_available: z.number(),
  data_id: z.number(),
  immutables: immutablesSchema,
  drop_type: z.number(),
  time_launch: z.string(),
  redeem_start_date: z.string().nullable(),
  redeem_end_date: z.string().nullable(),
  redeem_ship_date: z.string().optional().nullable(),
  estimated_ship_target: z.string().nullable(),
  is_mine: z.boolean().optional(),
  owner: ownerSchema.optional(),
  traits: z.array(traitSchema).optional(),
  redeemable: z.boolean().optional(),
  owned_count: z.number().optional(),
  exclusive: z.boolean().optional(),
  drop_marketplace_disabled_primary: z.boolean().optional(),
  collected_count: z.number().nullable(),
  stats: catalogItemStatsSchema.optional()
})

export const catalogItemDetailGetResponseSchema = successResponseSchema.extend({
  card: catalogItemDetailSchema
})

export type CatalogItemDetail = z.infer<typeof catalogItemDetailSchema>
export type Collection = z.infer<typeof collectionSchema>
export type Immutables = z.infer<typeof immutablesSchema>
export type Owner = z.infer<typeof ownerSchema>

export type CatalogItemDetailGetResponse = z.infer<
  typeof catalogItemDetailGetResponseSchema
>

export type CatalogItemDetailStats = z.infer<typeof catalogItemStatsSchema>
