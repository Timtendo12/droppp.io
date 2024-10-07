import { z } from 'zod'
import { assetAttributesSchema } from './assetAttributes'
import { mediaItemSchema } from './media'
import { rarityEnum } from './rarity'
import { traitSchema } from './trait'

export const assetCollectionSchema = z.object({
  name: z.string(),
  display_name: z.string(),
  preview_url: z.string(),
  preview_type: z.string(),
  id: z.number()
})

export const assetMarketplaceSchema = z.object({
  available_listing_count: z.number(),
  lowest_listing_price: z.number().nullable(),
  listing_price: z.number().nullable(),
  status: z.enum(['active', 'pending']).nullable(),
  listing_id: z.number().optional()
})

export const openMediaItemSchema = z.object({
  size0_width: z.string(),
  size0_height: z.string(),
  size0_url: z.string(),
  size1_width: z.string(),
  size1_height: z.string(),
  size1_url: z.string(),
  size2_width: z.string(),
  size2_height: z.string(),
  size2_url: z.string(),
  size3_width: z.string(),
  size3_height: z.string(),
  size3_url: z.string(),
  size4_width: z.string(),
  size4_height: z.string(),
  size4_url: z.string()
})

export const assetSchema = z.object({
  id: z.number().optional(),
  cardid: z.number().nullable().optional(),
  mint_num: z.number().nullable().optional(),
  contract: z.any(),
  // zod union not working, need to figure it out
  // contract: z
  //   .union([
  //     z.object({
  //       name: z.string(),
  //       display_name: z.string(),
  //       preview_url: z.string(),
  //       preview_type: z.string()
  //     }),
  //     z.string()
  //   ])
  //   // .or(z.string())
  //   .nullable()
  //   .optional(),
  author: z.string().optional(),
  owner: z.string().nullable().optional(),
  burnable: z.boolean().optional(),
  transferable: z.boolean().optional(),
  schema_name: z.string().optional(),
  template_id: z.number().nullable().optional(),
  name: z.string(),
  descr: z.string().nullable().optional(),
  openable: z.boolean().nullable().optional(),
  timestamp: z.string().nullable().optional(),
  chain_id: z.number().nullable().optional(),
  chain_status_text: z.string().nullable().optional(),
  collection_id: z.number().nullable().optional(),
  network_id: z.number().nullable().optional(),
  mint_count: z.number().optional(),
  chain_status: z.number().nullable().optional(),
  burned_by: z.string().nullable().optional(),
  drop_name: z.string().nullable().optional(),
  drop_id: z.number().optional(),
  rarity: rarityEnum.nullable().optional(),
  variant: z.string().nullable().optional(),
  open_video_url: z.string().nullable().optional(),
  open_video_aspect_ratio: z.number().nullable().optional(),
  open_media: z.array(openMediaItemSchema).optional(),
  open_url: z.string().optional().nullable(),
  redeemable: z.boolean().nullable().optional(),
  media: z.array(mediaItemSchema).optional(),
  style: z.string().nullable().optional(),
  traits: z.array(traitSchema).optional(),
  description: z.string().optional(),
  legal: z.string().optional(),
  atomichub_url: z.string().optional(),
  neftyblocks_url: z.string().optional(),
  nfthive_url: z.string().optional(),
  chainchamps_url: z.string().optional(),
  trait_id: z.number().nullable().optional(),
  attributes: assetAttributesSchema.optional(),
  owned_count: z.number().nullable().optional(),
  collected_count: z.number().optional(),
  holders_count: z.number().optional(),
  remaining_count: z.number().optional(),
  burned_count: z.number().optional(),
  collection: assetCollectionSchema.optional(),
  marketplace: assetMarketplaceSchema.optional(),
  chain_url: z.string().nullable().optional(),
  count: z.number().nullable().optional(),
  drop_marketplace_disabled: z.boolean().optional(),
  drop_marketplace_disabled_snapshot: z.boolean().optional(),
  drop_marketplace_disabled_primary: z.boolean().optional(),
  exclusive: z.boolean().optional(),
  redeem_start_date: z.string().optional().nullable(),
  redeem_end_date: z.string().optional().nullable(),
  redeem_ship_date: z.string().optional().nullable(),
  estimated_ship_target: z.string().optional().nullable(),
  fallback: z.number().optional()
})
export const DEFAULT_PACK_TYPE = ['Standard Pack', 'Premium Pack'] as const
export const ADDITIONAL_PACK_TYPE = ['Mythic Pack'] as const

export const PACK_TYPE = [
  ...DEFAULT_PACK_TYPE,
  ...ADDITIONAL_PACK_TYPE
] as const

export const packTypeEnum = z.enum(PACK_TYPE)
export const defaultPackTypeEnum = z.enum(DEFAULT_PACK_TYPE)
export const additionalPackTypeEnum = z.enum(ADDITIONAL_PACK_TYPE)

export type AssetType = z.infer<typeof assetSchema>
export type AssetMarketplace = z.infer<typeof assetMarketplaceSchema>
export type AssetCollection = z.infer<typeof assetCollectionSchema>
export type OpenMediaItem = z.infer<typeof openMediaItemSchema>
export type PackType = z.infer<typeof packTypeEnum>
export type DefaultPackType = z.infer<typeof defaultPackTypeEnum>
export type AdditionalPackType = z.infer<typeof additionalPackTypeEnum>
