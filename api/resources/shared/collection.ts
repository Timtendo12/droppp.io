import { z } from 'zod'
import { rarityEnum } from './rarity'

export const collectionSchema = z.object({
  name: z.string(),
  display_name: z.string(),
  drop_id: z.string(),
  drop_name: z.string(),
  rarities: z.array(rarityEnum),
  variants: z.array(z.string()),
  count: z.number()
})

export type CollectionItem = z.infer<typeof collectionSchema>
