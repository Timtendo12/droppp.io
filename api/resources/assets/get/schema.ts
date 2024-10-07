import { z } from 'zod'
import { assetSchema } from '@/api/resources/shared/asset'
import { collectionSchema } from '@/api/resources/shared/collection'
import { successResponseSchema } from '@/api/resources/shared/success'

const publicAssetSchema = assetSchema.extend({
  listing_price: z.number().nullable()
})

export const assetsSchema = z.array(publicAssetSchema)

export const assetsResponseSchema = successResponseSchema.extend({
  data: assetsSchema,
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

export const assetsRequestSchema = z.object({
  account: z.string(),
  dropId: z.string().nullable().optional(),
  type: z.string().nullable().optional(),
  search: z.string().nullable().optional(),
  owners: z.string().nullable().optional(),
  collections: z.string().nullable().optional(),
  rarities: z.string().nullable().optional(),
  variants: z.string().nullable().optional(),
  sort: z.string().nullable().optional(),
  showDuplicates: z.string().nullable().optional(),
  excludeLowest: z.string().nullable().optional(),
  show_only_listings: z.string().nullable().optional()
})

export type AssetsRequest = z.infer<typeof assetsRequestSchema>
export type AssetsResponse = z.infer<typeof assetsResponseSchema>
export type Assets = z.infer<typeof assetsSchema>
