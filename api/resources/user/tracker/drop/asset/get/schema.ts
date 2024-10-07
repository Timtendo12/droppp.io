import { z } from 'zod'
import { assetCollectionSchema } from '@/api/resources/shared/asset'
import { assetAttributesSchema } from '@/api/resources/shared/assetAttributes'
import { mediaItemSchema } from '@/api/resources/shared/media'
import { itemRaritySchema } from '@/api/resources/shared/rarity'
import { successResponseSchema } from '@/api/resources/shared/success'

export const collectionAssetSchema = z.object({
  id: z.number(),
  drop_id: z.number(),
  drop_name: z.string(),
  name: z.string(),
  descr: z.string().nullable(),
  rarity: itemRaritySchema,
  variant: z.string().nullable(),
  schema_name: z.string(),
  author: z.string(),
  chain_template_id: z.number(),
  transferable: z.boolean(),
  burnable: z.boolean(),
  cardid: z.number().nullable(),
  mint_count: z.number(),
  description: z.string(),
  legal: z.string(),
  attributes: assetAttributesSchema.optional(),
  media: z.array(mediaItemSchema),
  collection: assetCollectionSchema,
  atomichub_url: z.string(),
  neftyblocks_url: z.string(),
  nfthive_url: z.string(),
  chainchamps_url: z.string(),
  owned_count: z.number(),
  collected_count: z.number(),
  holders_count: z.number(),
  remaining_count: z.number(),
  burned_count: z.number(),
  listing_count: z.number(),
  listings_available: z.number(),
  listing_price: z.number().nullable(),
  redeemable: z.boolean().optional(),
  time_launch: z.string().optional(),
  redeem_start_date: z.string().optional().nullable(),
  redeem_end_date: z.string().optional().nullable(),
  redeem_ship_date: z.string().optional().nullable(),
  estimated_ship_target: z.string().optional().nullable(),
  exclusive: z.boolean().optional(),
  drop_marketplace_disabled_primary: z.boolean().optional(),
  fallback: z.number()
})

export const collectionAssetGetResponseSchema = successResponseSchema.extend({
  card: collectionAssetSchema
})

export type CollectionAssetGetResponse = z.infer<
  typeof collectionAssetGetResponseSchema
>
export type CollectionAsset = z.infer<typeof collectionAssetSchema>
