import { z } from 'zod'

export const rarityValues = [
  'Common',
  'Uncommon',
  'Mythic',
  'Grail',
  'Legendary',
  'Rare',
  'Epic',
  'Ultra',
  'Series',
  'Royalty',
  'Redeemable',
  '1 of 1',
  'Unique Webbian'
] as const

export const rarityEnum = z.enum(rarityValues)

export const itemRaritySchema = rarityEnum.nullable()

export type Rarity = z.infer<typeof itemRaritySchema>
