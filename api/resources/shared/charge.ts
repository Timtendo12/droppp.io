import { z } from 'zod'
import { currencyFormat } from '@/types/currency'

export const chargeSchema = z.object({
  amount: z.number(),
  currency: currencyFormat,
  description: z.string(),
  card_brand: z.string().nullable(),
  card_last4: z.string().nullable(),
  invoice_url: z.string(),
  time_created: z.string(),
  credit: z.number().nullable(),
  subtotal: z.number(),
  fee: z.number().optional(),
  tax: z.number()
})

export type ChargeItem = z.infer<typeof chargeSchema>
