import { number, z } from 'zod'
import { orderSchema } from '@/api/resources/shared/order'

const requestSchema = z.object({
  order_id: z.number().optional(),
  country_id: z.number(),
  assets: z.string(),
  addons: z.string(),
  save_address: z.boolean().optional(),
  selected_address: z.string().optional(),

  receiver_first_name: z.string().optional(),
  receiver_last_name: z.string().optional(),
  receiver_full_name: z.string().optional(),
  street_address1: z.string().optional(),
  street_address2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postal_code: z.string().optional(),
  country_name: z.string().optional()
})

export const redeemOrderGetResponseSchema = orderSchema.extend({
  status: number().optional(),
  addon_count: z.number().optional(),
  addon_amount: z.number().optional()
})

export type RedeemOrderGetRequest = z.infer<typeof requestSchema>
export type RedeemOrderGetResponse = z.infer<
  typeof redeemOrderGetResponseSchema
>
