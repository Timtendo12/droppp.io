import { ReactNode } from 'react'
import { useHeaderContext } from './index'
import RarityBadge from '@/components/RarityBadge'
import OwnedBadge from '@/components/OwnedBadge'
import { Price } from './Price'
import { formatNumber } from '@/util/numberHelpers'
import { isUniqueProduct } from '@/util/assetHelpers'
import Icon from '@/components/Icon'

export type ContentProps = {
  itemHero: ReactNode
  itemAction: ReactNode
}

const AvailableListings = () => {
  const { catalogItem } = useHeaderContext()
  if (isUniqueProduct(catalogItem)) return null

  const { listings_available } = catalogItem
  const haveListings = listings_available > 0

  return haveListings ? (
    <div className="flex items-center gap-1 body">
      <div className="text-gray-300">Available Listings</div>
      <div>{formatNumber(listings_available, 0)}</div>
    </div>
  ) : null
}

export function Content({ itemHero, itemAction }: ContentProps) {
  const { catalogItem } = useHeaderContext()
  const { rarity, redeemable, name, media, owned_count, exclusive } =
    catalogItem

  return (
    <div className="w-full flex flex-col gap-4">
      {media.length > 0 ? itemHero : null}
      <div className="flex flex-col items-center md:items-start gap-3">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex flex-row gap-1 mb-[12px]">
            <RarityBadge
              rarity={rarity}
              redeemable={redeemable}
              className="uppercase"
              size="lg"
            />
            {exclusive && <Icon name="exclusiveBadge" size={28} />}
            <OwnedBadge owned_count={owned_count} size="lg" showOwnedLabel />
          </div>
          <h2 className="h2 text-4xl md:text-5xl text-center md:text-left mb-1">
            {name}
          </h2>
          <div className="flex flex-col gap-1 items-center md:items-start">
            <Price />
            <AvailableListings />
          </div>
        </div>
        {itemAction}
      </div>
    </div>
  )
}
