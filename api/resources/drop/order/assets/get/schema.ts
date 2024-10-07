import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'
import { mediaItemSchema } from '@/api/resources/shared/media'
import { orderReservationsDropSchema } from '@/api/resources/shared/drop'
import { packTypeEnum } from '@/api/resources/shared/asset'

const dropOrderAssetsGetInputSchema = z.object({
  drop_id: z.string(),
  t_did: z.string().optional(),
  answer: z.string().optional(),
  queue_it_token: z.string().optional()
})

const dropOrderAssetSchema = z.object({
  data_id: z.number(),
  chain_template_id: z.number(),
  id: z.number(),
  name: packTypeEnum,
  price: z.number(),
  total: z.number(),
  redeemable: z.boolean(),
  style: z.string().nullable(),
  avail: z.number(),
  media: z.array(mediaItemSchema),
  pack_limit: z.number().optional(),
  open_asset_count: z.number()
})

const dropOrderAssetsSchema = z.object({
  drop: orderReservationsDropSchema,
  purchase_limit: z.number(),
  timeout: z.number(),
  max_timeout: z.number(),
  assets: z.array(dropOrderAssetSchema)
})

export const dropOrderAssetsGetResponseSchema = successResponseSchema.merge(
  dropOrderAssetsSchema
)

export type DropOrderAssetsGetInput = z.infer<
  typeof dropOrderAssetsGetInputSchema
>

export type DropOrderAsset = z.infer<typeof dropOrderAssetSchema>

export type DropOrderAssets = z.infer<typeof dropOrderAssetsSchema>

export type DropOrderAssetsGetResponse = z.infer<
  typeof dropOrderAssetsGetResponseSchema
>
