import { z } from 'zod'
import { mediaItemSchema } from './media'
import { successResponseSchema } from './success'
import { userSchema } from './user'

export const dropPurchaseSchema = z.object({
  template_id: z.number(),
  name: z.string(),
  price: z.number(),
  count: z.number(),
  redeemable: z.boolean(),
  media: z.array(mediaItemSchema),
  style: z.string().nullable()
})

export const addressPurchaseSchema = z.object({
  template_id: z.number(),
  name: z.string(),
  price: z.number(),
  count: z.number(),
  media: z.array(mediaItemSchema),
  address: z.string()
})

export type DropPurchase = z.infer<typeof dropPurchaseSchema>
export type AddressPurchase = z.infer<typeof addressPurchaseSchema>

// prepare/complete purchases
export const orderSchema = z.object({
  id: z.number(),
  action_id: z.number().optional(),
  invoice_url: z.string().nullable()
})

export const completedPurchaseSchema = z.object({
  action_id: z.number().optional(),
  user: userSchema,
  order: orderSchema
})

const standardPurchaseResponse = successResponseSchema
  .extend({
    payment_intent_client_secret: z.undefined()
  })
  .merge(completedPurchaseSchema)

export const intendedPurchaseSchema = z.object({
  payment_intent_client_secret: z.string()
})

const threeDimensionalSecurePurchaseResponse = successResponseSchema.merge(
  intendedPurchaseSchema
)

export const purchaseResponseSchema = standardPurchaseResponse.or(
  threeDimensionalSecurePurchaseResponse
)
export const completedPurchaseResponseSchema = successResponseSchema.merge(
  completedPurchaseSchema
)

export type PurchaseResponse = z.infer<typeof purchaseResponseSchema>

export type CompletedOrder = z.infer<typeof orderSchema>

export type IntendedPurchase = z.infer<typeof intendedPurchaseSchema>

export type CompletedPurchase = z.infer<typeof completedPurchaseSchema>

export type CompletedPurchaseResponse = z.infer<
  typeof completedPurchaseResponseSchema
>
