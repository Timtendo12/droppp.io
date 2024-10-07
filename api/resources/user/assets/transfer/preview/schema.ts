import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'
import { assetSchema } from '@/api/resources/shared/asset'

export const transferPreviewInputSchema = z.object({
  assets: z.array(z.number()),
  to: z.string().optional()
})

export const nonTransferableTypeEnum = z.enum([
  'EXCLUSIVE',
  'SNAPSHOT',
  'PRIMARY',
  'LISTED',
  'SELF',
  'BLOCKCHAIN'
])

export const nonTransferableAssetSchema = z.object({
  type: nonTransferableTypeEnum,
  title: z.string(),
  description: z.string(),
  assets: z.array(assetSchema)
})

export const nonTransferableAssetsSchema = z.array(nonTransferableAssetSchema)

export const TransferableAssetsSchema = z.array(assetSchema)

export const transferPreviewResponseSchema = successResponseSchema.extend({
  non_transferable_assets: nonTransferableAssetsSchema,
  transferable_assets: TransferableAssetsSchema
})

export type TransferPreviewInput = z.infer<typeof transferPreviewInputSchema>
export type NonTransferableTypeEnum = z.infer<typeof nonTransferableTypeEnum>
export type NonTransferableAssets = z.infer<typeof nonTransferableAssetsSchema>
export type NonTransferableAsset = z.infer<typeof nonTransferableAssetSchema>
export type TransferableAssets = z.infer<typeof TransferableAssetsSchema>

export type TransferPreviewResponse = z.infer<
  typeof transferPreviewResponseSchema
>
