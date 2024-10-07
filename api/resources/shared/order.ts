import { z } from 'zod'
import { mediaItemSchema } from './media'
import { rarityEnum } from './rarity'
import { cartItemAddonSchema } from './cartItemAddon'

// @TODO - look at splitting this from drop order and redeem order - Josh Dobson - 7/8/24
export const summaryLineSchema = z.object({
  description: z.string(),
  media: mediaItemSchema,
  qty: z.number(),
  assets: z.array(
    z
      .object({
        redeem_asset_id: z.string(),
        mint_num: z.string()
      })
      .optional()
  ),
  addons: z.array(cartItemAddonSchema.optional()).optional(),
  rarity: rarityEnum,
  sku: z.string(),
  redeem_template_id: z.number(),
  name: z.string()
})

export const addressVerificationCodeSchema = z.enum(['Y', 'WARNING', 'N'])

export const orderSchema = z.object({
  order_id: z.number().optional(),
  status_display: z.string().optional(),
  shipping_address: z
    .object({
      receiver_first_name: z.string().nullable().optional(),
      receiver_last_name: z.string().nullable().optional(),
      receiver_full_name: z.string().nullable().optional(),
      street_address1: z.string().nullable().optional(),
      street_address2: z.string().nullable().optional(),
      city: z.string().nullable().optional(),
      state: z.string().nullable().optional(),
      postal_code: z.string().nullable().optional(),
      country_name: z.string().optional(),
      country_id: z.number().optional(),
      verification_code: addressVerificationCodeSchema.nullable().optional()
    })
    .optional()
    .nullable(),
  address_suggestions: z
    .array(
      z.object({
        receiver_first_name: z.string().nullable().optional(),
        receiver_last_name: z.string().nullable().optional(),
        receiver_full_name: z.string().nullable().optional(),
        street_address1: z.string().nullable().optional(),
        street_address2: z.string().nullable().optional(),
        city: z.string().nullable().optional(),
        state: z.string().nullable().optional(),
        postal_code: z.string().nullable().optional(),
        country_name: z.string().optional(),
        country_id: z.number().optional(),
        verification_code: addressVerificationCodeSchema.nullable().optional()
      })
    )
    .optional()
    .nullable(),
  order_date: z.string().optional(),
  estimated_ship_target: z.string().nullable(),
  redeem_ship_date: z.string().nullable().optional(),
  summary_lines: z.array(summaryLineSchema),
  item_count: z.number(),
  shipping: z.number(),
  discount: z.number(),
  total: z.number(),
  tax: z.number().nullable(),
  editable: z.boolean().optional(),
  tracking_urls: z
    .array(
      z.object({
        tracking_url: z.string()
      })
    )
    .optional(),
  licensor: z.string().optional().nullable(),
  address_warning: z.boolean().optional()
})

export type SummaryLineType = z.infer<typeof summaryLineSchema>
export type OrderType = z.infer<typeof orderSchema>
export type AddressVerificationCode = z.infer<
  typeof addressVerificationCodeSchema
>
