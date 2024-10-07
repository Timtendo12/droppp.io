import { z } from 'zod'
import { assetSchema } from '@/api/resources/shared/asset'
import { collectionSchema } from '@/api/resources/shared/collection'
import { successResponseSchema } from '@/api/resources/shared/success'

export const userAssetsSchema = z.array(
  assetSchema.extend({
    listing_price: z.number().nullable(),
    open_url: z.string().nullable()
  })
)

export const userAssetsResponseSchema = successResponseSchema.extend({
  data: userAssetsSchema,
  more: z.boolean(),
  collections: z.array(collectionSchema),
  owners: z.array(z.string()),
  filtered_count: z.number(),
  filtered_openable_count: z.number(),
  filtered_unopenable_count: z.number(),
  total_count: z.number(),
  total_openable_count: z.number(),
  total_unopenable_count: z.number()
})

export const userAssetsRequestSchema = z.object({
  dropId: z.string().nullable().optional(),
  type: z.string().nullable().optional(),
  search: z.string().nullable().optional(),
  owners: z.string().nullable().optional(),
  collections: z.string().nullable().optional(),
  rarities: z.string().nullable().optional(),
  variants: z.string().nullable().optional(),
  cardids: z.string().nullable().optional(),
  sort: z.string().nullable().optional(),
  show_duplicates: z.string().nullable().optional(),
  exclude_lowest_mint: z.string().nullable().optional(),
  show_only_listings: z.string().nullable().optional(),
  show_only_not_listings: z.string().nullable().optional()
})

export type UserAssetsRequest = z.infer<typeof userAssetsRequestSchema>
export type UserAssetsResponse = z.infer<typeof userAssetsResponseSchema>
export type UserAssets = z.infer<typeof userAssetsSchema>
