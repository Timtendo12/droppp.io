import React from 'react'
import classNames from 'classnames'

import { RARITY_TYPES, DIAMOND_RARITY_TYPES, DynamicDropState } from '@/enum'
import { RarityBadgeIcons } from '@/components/Icon'
import styles from './styles.module.scss'
import { Rarity } from '@/api/resources/shared/rarity'
import Badge, { BadgeProps } from '@/components/Badge'

interface RarityBadgeProps extends BadgeProps {
  rarity: Rarity
  redeemable: boolean
  dynamicDropState?: DynamicDropState
}

enum RedemptionState {
  None = 'none',
  Redeemable = 'redeemable',
  Expired = 'expired'
}

const redemptionState = (
  rarity: string,
  redeemable: boolean
): RedemptionState => {
  if (
    rarity === RARITY_TYPES.Redeemable &&
    typeof redeemable !== 'undefined' &&
    !redeemable
  ) {
    return RedemptionState.Expired
  } else if (DIAMOND_RARITY_TYPES.some(type => type === rarity) && redeemable) {
    return RedemptionState.Redeemable
  }

  return RedemptionState.None
}

const rarityBadgeIcon = (
  rarity: string,
  redemptionState: RedemptionState,
  dynamicDropState?: DynamicDropState
): RarityBadgeIcons => {
  if (redemptionState === RedemptionState.Expired) {
    return undefined
  }

  if (redemptionState === RedemptionState.Redeemable) {
    return 'diamond'
  } else if (rarity === RARITY_TYPES.Royalty) {
    // If the dynamic drop state is supplied, then we must check whether or not it is Pre or Post
    // Token drop before determining the icon.
    if (
      dynamicDropState &&
      ![
        DynamicDropState.PostRedemption,
        DynamicDropState.PostTokenDrop,
        DynamicDropState.PostShipping
      ].includes(dynamicDropState)
    ) {
      return 'diamond'
    } else {
      return 'crown'
    }
  }

  return undefined
}

export default function RarityBadge({
  className,
  rarity,
  redeemable = undefined,
  dynamicDropState,
  ...props
}: RarityBadgeProps) {
  if (!rarity) return null

  const state = redemptionState(rarity, redeemable)

  const label =
    state == RedemptionState.Expired
      ? 'Expired'
      : RARITY_TYPES[rarity] || rarity
  const icon = props.icon
    ? props.icon
    : rarityBadgeIcon(rarity, state, dynamicDropState)
  className =
    state == RedemptionState.Expired
      ? `text-gray-300 !border-gray-300 ${className}`
      : classNames(className, getRarityBadgeClasses(rarity), {
          [styles['rarityBadge--redeemable']]:
            rarity === RARITY_TYPES.Redeemable,
          [styles['rarityBadge--mythic']]: rarity === RARITY_TYPES.Mythic
        })

  return <Badge {...props} className={className} label={label} icon={icon} />
}

const getRarityBadgeClasses = (rarity: Rarity) => {
  switch (rarity) {
    case RARITY_TYPES['1 of 1']:
      return 'text-gray-900 !border-white bg-white'
    case RARITY_TYPES.Ultra:
      return 'text-white !border-rarity-ultra bg-rarity-ultra/30'
    case RARITY_TYPES.Mythic:
      return 'text-white'
    case RARITY_TYPES.Grail:
      return 'text-white !border-rarity-grail bg-rarity-grail/30'
    case RARITY_TYPES.Legendary:
      return 'text-white !border-rarity-legendary bg-rarity-legendary/30'
    case RARITY_TYPES.Redeemable:
      return 'text-white !border-transparent'
    case RARITY_TYPES.Epic:
      return 'text-white !border-rarity-epic bg-rarity-epic/30'
    case RARITY_TYPES.Rare:
      return 'text-white !border-rarity-rare bg-rarity-rare/30'
    case RARITY_TYPES.Uncommon:
      return 'text-white !border-rarity-uncommon bg-rarity-uncommon/30'
    case RARITY_TYPES.Series:
      return 'text-white !border-gray-300 bg-gray-500'
    case RARITY_TYPES.Royalty:
      return 'text-white !border-rarity-royalty bg-rarity-royalty/30'
    default:
      return 'text-white !border-rarity-common bg-rarity-common/30'
  }
}
