import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'

const userSupportAuthInputSchema = z.object({
  code: z.string()
})

const reservedDropOrderAssetSchema = z.object({
  asset_id: z.number(),
  quantity: z.number(),
  price: z.number()
})

const reservedDropOrderAssetsSchema = z.object({
  reservation_id: z.string(),
  subtotal: z.number(),
  processing_fee: z.number(),
  total: z.number(),
  timeout: z.number(),
  max_timeout: z.number(),
  reserved: z.array(reservedDropOrderAssetSchema)
})

export const userSupportAuthResponseSchema = successResponseSchema.merge(
  reservedDropOrderAssetsSchema
)

export type UserSupportAuthInput = z.infer<typeof userSupportAuthInputSchema>

export type ReservedDropOrderAsset = z.infer<
  typeof reservedDropOrderAssetSchema
>

export type ReservedDropOrderAssets = z.infer<
  typeof reservedDropOrderAssetsSchema
>

export type UserSupportAuthResponse = z.infer<
  typeof userSupportAuthResponseSchema
>
