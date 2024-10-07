import { z } from 'zod'
import { assetSchema } from '@/api/resources/shared/asset'
import { successResponseSchema } from '@/api/resources/shared/success'

export const userAssetSchema = assetSchema

export const userAssetResponseSchema = successResponseSchema.extend({
  asset: userAssetSchema
})

export type UserAssetResponse = z.infer<typeof userAssetResponseSchema>
export type UserAsset = z.infer<typeof userAssetSchema>
