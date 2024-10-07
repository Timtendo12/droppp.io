import { z } from 'zod'
import { assetSchema } from '@/api/resources/shared/asset'
import { successResponseSchema } from '@/api/resources/shared/success'

export const feeDisplaySchema = z.object({
  label: z.string(),
  amount: z.number(),
  info: z.string()
})

export const feeDisplaySchemaWithOptionalDiscount = feeDisplaySchema.extend({
  previous_amount: z.number().optional(),
  discount_applied: z.string().optional(),
  discount_removed: z.string().optional()
})

export const listingPreviewSchema = z.object({
  price: z.number(),
  net_amount: z.number(),
  lowest_price: z.number().nullable(),
  suggested_price: z.number().nullable(),
  purchase_history: z.object({}).nullable(),
  fee_display: z.object({
    collection_fee: feeDisplaySchema,
    blockchain_fee: feeDisplaySchema,
    marketplace_fee: feeDisplaySchemaWithOptionalDiscount
  }),
  asset: assetSchema
})

export const listingPreviewsSchema = z.record(listingPreviewSchema)

export const listingPreviewResponseSchema = successResponseSchema.extend({
  preview_listings: z.record(listingPreviewSchema)
})

export type FeeDisplay = z.infer<typeof feeDisplaySchema>
export type ListingPreview = z.infer<typeof listingPreviewSchema>
export type ListingPreviews = z.infer<typeof listingPreviewsSchema>

export type ListingPreviewResponse = z.infer<
  typeof listingPreviewResponseSchema
>
