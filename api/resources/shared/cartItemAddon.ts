import { z } from 'zod'
import { mediaItemSchema } from './media'

export const cartItemAddonSchema = z.object({
  type: z.number(),
  sku: z.string(),
  name: z.string(),
  img: z.string(),
  media: mediaItemSchema,
  qty: z.number(),
  amount: z.number()
})
