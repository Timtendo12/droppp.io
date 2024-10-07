import { z } from 'zod'
import { assetSchema } from './asset'
import { batchSchema } from './batch'
import { chargeSchema } from './charge'
import { listingSchema } from './listing'
import { orderSchema } from './order'

export const actionTypeEnum = z.enum([
  'purchase', // 1
  'transfer', // 3
  'transferbatch', // 4
  'redeem', // 5
  'purchaseaccount', // 6
  'createaccount', // 7
  'onboardpromo', // 8
  'fundwallet', // 9
  'withdrawwallet', // 10
  'mktsale', // 11
  'mktpurchase' // 12
])
export const depositTypeEnum = z.enum(['crypto_transfer', 'card'])

export const userAssetSchema = assetSchema.extend({
  price: z.number().nullable().optional()
})

export const actionSchema = z.object({
  id: z.number(),
  type: actionTypeEnum,
  info: z.string(),
  amount: z.number().optional(),
  info_count: z.number(),
  time_created: z.string()
})

const activityOrderSchema = orderSchema.extend({
  addon_amount: z.number().optional(),
  addon_count: z.number().optional()
})

export const actionDetailSchema = z.object({
  id: z.number(),
  item_id: z.number().optional().nullable(),
  type: actionTypeEnum,
  batches: z.array(batchSchema).optional(),
  charge: chargeSchema.optional(),
  detail: z
    .object({
      method: depositTypeEnum.optional(),
      status: z.string(),
      transaction_id: z.number().optional(),
      to_address: z.string().optional(),
      network: z.string(),
      token: z.string(),
      amount: z.number(),
      total_amount: z.number(),
      tx_url: z.string().optional(),
      merchant: z.string().optional(),
      payment_method: z.string().optional(),
      fees: z.number().optional()
    })
    .optional(),
  listing: listingSchema.optional(),
  info: z.string(),
  amount: z.number().optional(),
  time_created: z.string(),
  info_count: z.number(),
  assets: z.array(userAssetSchema).optional(),
  order: activityOrderSchema.optional()
})

export type ActionType = z.infer<typeof actionSchema>

export type ActionDetailType = z.infer<typeof actionDetailSchema>
