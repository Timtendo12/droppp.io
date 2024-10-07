import { z } from 'zod'
import { assetSchema } from '@/api/resources/shared/asset'
import { successResponseSchema } from '@/api/resources/shared/success'

export const assetGetResponseSchema = successResponseSchema.extend({
  asset: assetSchema
})

export type AssetGetResponse = z.infer<typeof assetGetResponseSchema>
export type Asset = z.infer<typeof assetSchema>
