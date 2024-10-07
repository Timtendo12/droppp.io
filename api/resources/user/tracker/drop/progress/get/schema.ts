import { z } from 'zod'
import { mediaItemSchema } from '@/api/resources/shared/media'
import { successResponseSchema } from '@/api/resources/shared/success'
import { itemRaritySchema } from '@/api/resources/shared/rarity'

const rarityCountSchema = z.object({
  Mythic: z.number().optional(),
  Grail: z.number(),
  Legendary: z.number(),
  Ultra: z.number().optional()
})

export const collectionCardSchema = z.object({
  id: z.number(),
  name: z.string(),
  variant: z.string().nullable(),
  openable: z.boolean(),
  redeemable: z.boolean(),
  expired: z.boolean(),
  rarity: itemRaritySchema.nullable(),
  preview_url: z.string(),
  preview_type: z.string(),
  media: z.array(mediaItemSchema),
  collected_count: z.number(),
  is_collected: z.boolean(),
  listing_price: z.number().nullable().optional(),
  owned_mint_nums: z.array(z.number()).optional()
})

export const collectionSchema = z.object({
  id: z.number(),
  name: z.string(),
  series: z.number(),
  drop_type: z.number(),
  collection_name: z.string(),
  time_complete_set: z.string().nullable(),
  completed_set_count: z.number().optional(),
  drop_asset_count: z.number().optional(),
  current_set_collected_count: z.number().optional(),
  royalty_count: z.number().optional(),
  collected_rarity_counts: rarityCountSchema.optional(),
  redeemables_count: z.number().optional(),
  cards: z.array(collectionCardSchema),
  exclusive: z.boolean(),
  redeem_img: z.string().optional(),
  redeem_media_size0_url: z.string(),
  redeem_media_size1_url: z.string(),
  redeem_media_size2_url: z.string(),
  redeem_media_size3_url: z.string(),
  redeem_media_size4_url: z.string()
})

export const collectionGetResponseSchema = successResponseSchema.extend({
  progress: collectionSchema
})

export type CollectionCard = z.infer<typeof collectionCardSchema>
export type Collection = z.infer<typeof collectionSchema>
export type CollectionGetResponseSchema = z.infer<
  typeof collectionGetResponseSchema
>
