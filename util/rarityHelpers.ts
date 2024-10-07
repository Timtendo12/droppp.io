import { Drop } from '@/types/drop'
import { hasMythicRarity, hasUltraRarity } from './dropHelpers'

export function redeemableRarityString(drop: Drop) {
  return `${hasMythicRarity(drop) ? 'Mythic,' : ''} Grail, Legendary, ${
    hasUltraRarity(drop) ? 'Ultra,' : ''
  } or Royalty Set`
}
