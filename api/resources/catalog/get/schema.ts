import { z } from 'zod'
// import { avatarMediaSchema } from '@/api/resources/shared/avatar'
import { mediaItemSchema } from '@/api/resources/shared/media'
import { itemRaritySchema } from '@/api/resources/shared/rarity'
import { successResponseSchema } from '@/api/resources/shared/success'
import { traitSchema } from '@/api/resources/shared/trait'

export const catalogOpenableItemSchema = z.object({
  data_id: z.number(),
  chain_template_id: z.number(),
  name: z.string(),
  price: z.number(),
  total: z.number(),
  redeemable: z.boolean().optional(),
  media: z.array(mediaItemSchema),
  avail: z.number(),
  listing_price: z.number().nullable(),
  drop_template_id: z.number(),
  owned_count: z.number().optional(),
  available_for_purchase: z.number().nullable()
})

const catalogRedeemableItemSchema = z.object({
  cardid: z.number(),
  chain_template_id: z.number(),
  data_id: z.number(),
  listing_price: z.number().nullable(),
  media: z.array(mediaItemSchema),
  name: z.string(),
  rarity: itemRaritySchema,
  redeemable: z.boolean().optional()
})

const catalogTrendingItemSchema = z.object({
  cardid: z.number().nullable(),
  id: z.number(),
  listing_price: z.number().nullable(),
  media: z.array(mediaItemSchema),
  name: z.string(),
  rarity: itemRaritySchema,
  redeemable: z.boolean().optional(),
  sales_count: z.number(),
  template_id: z.number(),
  variant: z.string().nullable()
})

// const catalogTopHoldersItemSchema = z.object({
//   owner: z.string(),
//   owned_count: z.number(),
//   avatar_media: avatarMediaSchema
// })

export const catalogStatsSchema = z.object({
  items: z.number(),
  owners: z.number(),
  owner_count: z.number(),
  floor_price: z.number(),
  last_24hr_sales_count: z.number(),
  last_24hr_sales_value: z.number(),
  redeemable_count: z.number(),
  total_sales_value: z.number()
})

export const catalogSchema = z.object({
  id: z.number(),
  description: z.string().optional(),
  drop_type: z.number(),
  redeem_start_date: z.string().optional().nullable(),
  redeem_end_date: z.string().optional().nullable(),
  redeem_ship_date: z.string().optional().nullable(),
  redemption_started: z.number().nullable(),
  redemption_ended: z.number().nullable(),
  estimated_ship_target: z.string().optional().nullable(),
  name: z.string(),
  series: z.number(),
  time_launch: z.string(),
  atomichub_url: z.string(),
  neftyblocks_url: z.string(),
  nfthive_url: z.string(),
  chainchamps_url: z.string(),
  stats: catalogStatsSchema,

  // these are only present when a marketplace is disabled
  marketplace_disabled_reason: z.string().optional(),
  drop_marketplace_disabled: z.boolean().optional(),
  drop_marketplace_disabled_snapshot: z.boolean().optional(),
  drop_marketplace_disabled_primary: z.boolean().optional(),

  openable: z.array(catalogOpenableItemSchema),
  starting_redemptions: z.array(catalogRedeemableItemSchema),
  closing_redemptions: z.array(catalogRedeemableItemSchema),
  trending: z.array(catalogTrendingItemSchema),
  exclusive: z.boolean(),
  // top_holders: z.array(catalogTopHoldersItemSchema), // Not currently being used - Josh Dobson
  traits: z.array(traitSchema)
})

export type Catalog = z.infer<typeof catalogSchema>
export type CatalogOpenableItem = z.infer<typeof catalogOpenableItemSchema>

export const CatalogGetResponseSchema = successResponseSchema.extend({
  drop: catalogSchema
})

export type CatalogGetResponse = z.infer<typeof CatalogGetResponseSchema>

export type CatalogStats = z.infer<typeof catalogStatsSchema>
