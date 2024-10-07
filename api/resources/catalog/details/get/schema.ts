import { z } from 'zod'
import { mediaItemSchema } from '@/api/resources/shared/media'
import { itemRaritySchema, rarityEnum } from '@/api/resources/shared/rarity'

const raritySchema = z.object({
  rarity: rarityEnum,
  count: z.number()
})

const variantSchema = z.object({
  variant: z.string(),
  count: z.number()
})

export const catalogItemSchema = z.object({
  id: z.number().optional(),
  cardid: z.number().nullable(),
  chain_template_id: z.number().optional(),
  template_id: z.number().optional(),
  data_id: z.number(),
  drop_id: z.number().optional(),
  drop_name: z.string().optional(),
  listing_price: z.number().nullable(),
  media: z.array(mediaItemSchema),
  name: z.string(),
  owned_count: z.number().optional().nullable(),
  rarity: itemRaritySchema,
  variant: z.string().nullable(),
  redeemable: z.boolean().nullable(),
  exclusive: z.boolean().optional(),
  redeem_start_date: z.string().optional().nullable(),
  redeem_end_date: z.string().optional().nullable(),
  collected_count: z.number().optional().nullable()
})

const requestSchema = z.object({
  drop_id: z.string(),
  page: z.number().optional(),
  sort: z.string().optional(),
  search: z.string().optional(),
  variants: z.array(z.string()).optional(),
  rarities: z.array(z.string()).optional(),
  traits: z.string().optional(),
  show_only_listings: z.string().optional()
})

export const responseSchema = z.object({
  data: z.array(catalogItemSchema),
  description: z.string().optional(),
  drop_type: z.number(),
  id: z.number(),
  filtered_count: z.number(),
  name: z.string(),
  rarities: z.array(raritySchema),
  series: z.number(),
  time_launch: z.string(),
  more: z.boolean(),
  total_count: z.number(),
  variants: z.array(variantSchema)
})

export type CatalogItem = z.infer<typeof catalogItemSchema>
export type CatalogDetailsGetRequest = z.infer<typeof requestSchema>
export type CatalogDetailsGetResponse = z.infer<typeof responseSchema>
