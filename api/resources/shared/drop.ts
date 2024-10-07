import { z } from 'zod'

export const PfpDropType = 3

export const isPfp = (obj: { drop_type?: number }): boolean => {
  if (!obj) return false
  return obj.drop_type === PfpDropType
}

export const orderReservationsDropSchema = z.object({
  prequeue: z.string(),
  started: z.string(),
  id: z.number(),
  name: z.string(),
  collection_id: z.number(),
  type: z.number(),
  mint_status: z.number(),
  purchase_limit: z.number(),
  time_launch: z.string(),
  hover_color: z.string().nullable(),
  active: z.boolean(),
  queue_enabled: z.boolean(),
  tracking_enabled: z.string(),
  time_created: z.string(),
  time_updated: z.string(),
  country_restriction_codes: z.string().nullable(),
  country_restriction_names: z.string().nullable(),
  country_restriction_redemption: z.string(),
  redeem_editable: z.string(),
  shipping_discount: z.string(),
  estimated_ship_target: z.string().nullable(),
  redeem_img: z.string().nullable(),
  redeem_media_id: z.string().nullable(),
  redeem_start_date: z.string().nullable(),
  redeem_end_date: z.string().nullable(),
  redeem_ship_date: z.null(),
  queue_key_count: z.string(),
  ui_key: z.string().nullable(),
  series: z.number(),
  marketplace_disabled_reason: z.string().nullable(),
  exclusive: z.boolean(),
  drop_name: z.string(),
  display_name: z.string(),
  eula_url: z.string(),
  licensor: z.string().nullable()
})

export type OrderReservationsDrop = z.infer<typeof orderReservationsDropSchema>
