import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'

const reserveDropOrderAssetsInputSchema = z.object({
  drop_id: z.string(),
  assets: z.string(),
  quantities: z.string(),
  queue_it_token: z.string().optional()
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

export const reserveDropOrderAssetsResponseSchema = successResponseSchema.merge(
  reservedDropOrderAssetsSchema
)

export type ReserveDropOrderAssetsInput = z.infer<
  typeof reserveDropOrderAssetsInputSchema
>

export type ReservedDropOrderAsset = z.infer<
  typeof reservedDropOrderAssetSchema
>

export type ReservedDropOrderAssets = z.infer<
  typeof reservedDropOrderAssetsSchema
>

export type ReserveDropOrderAssetsResponse = z.infer<
  typeof reserveDropOrderAssetsResponseSchema
>
