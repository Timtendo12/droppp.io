import { z } from 'zod'
import { rarityEnum } from './rarity'

export const assetAttributesSchema = z.object({
  rarity: rarityEnum.optional(),
  variant: z.string().optional(),
  cardid: z.number().optional(),
  tid: z.number().optional(),
  'release date': z.string().optional(),
  EULA: z.string().optional()
})

export type AssetAttributes = z.infer<typeof assetAttributesSchema>
