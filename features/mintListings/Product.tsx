import React from 'react'
import classNames from 'classnames'
import CatalogItem from '@/components/ProductCard/Catalog'
import ProductFluidContainer from '@/components/ProductFluidContainer'
import { getDropBrandImage } from '@/config/drops'
import useElementWidth from '@/hooks/useElementWidth'
import { PRODUCT_CARD_SMALL_LAYOUT_THRESHOLD } from '@/components/ProductCard'
import RarityBadge from '@/components/RarityBadge'
import { InventoryItemMedia } from '@/components/InventoryItem/InventoryItemMedia'
import { isPfp } from '@/api/resources/shared/drop'
import OwnedBadge from '@/components/OwnedBadge'
import { useMintListingsContext } from './MintListingsProvider'
import ExclusiveProductBadge from '@/components/ProductCard/ExclusiveProductBadge'
import BuyAction, { PRICE_DISCLAIMER } from '@/components/Actions/BuyAction'

export const Product = () => {
  return (
    <>
      <ProductPortrait className="max-listViewModalSm:hidden" />
      <ProductLandscape className="listViewModalSm:hidden pb-3" />
    </>
  )
}

export type Props = {
  className?: string
}

export const ProductPortrait = ({ className }: Props) => {
  const cardContainerRef = React.useRef<HTMLDivElement>(null)
  const { width: cardContainerWidth } = useElementWidth(cardContainerRef)
  const { product } = useMintListingsContext()

  if (!product) return null

  const {
    drop_id,
    drop_name,
    data_id,
    rarity,
    listing_price,
    listings_available
  } = product

  return (
    <div ref={cardContainerRef} className={className}>
      <div className="flex flex-col gap-2">
        <ProductFluidContainer cardWidth={cardContainerWidth}>
          {({ cardSize: { width } }) => (
            <CatalogItem
              hidePriceComponent={true}
              asset={product}
              isSmallLayout={width <= PRODUCT_CARD_SMALL_LAYOUT_THRESHOLD}
              brandImage={getDropBrandImage(drop_id)}
              drop_name={drop_name}
            />
          )}
        </ProductFluidContainer>
        <div>
          <BuyAction
            className="w-full"
            data_id={data_id}
            rarity={rarity}
            listing_price={listing_price}
            listings_available={listings_available}
          />
        </div>
        <div className="body-xs text-gray-300">{PRICE_DISCLAIMER}</div>
      </div>
    </div>
  )
}

export const ProductLandscape = ({ className }: Props) => {
  const { product } = useMintListingsContext()

  if (!product) return null

  const { name, rarity, drop_name, media, owned_count, exclusive, redeemable } =
    product

  const mediaItem = media[0]
  const shouldRoundCorners = isPfp(product)
  const isRatio1x1 = mediaItem.size0_height % mediaItem.size0_width === 0

  return (
    <div className={classNames('flex gap-2 min-w-0', className)}>
      <div
        className={classNames('flex flex-shrink-0 ', {
          'w-10': isRatio1x1,
          'w-[52px] h-[73px]': !isRatio1x1
        })}
      >
        <InventoryItemMedia
          objectFit={'contain'}
          media={mediaItem}
          className={classNames({
            'rounded-2xl overflow-hidden': shouldRoundCorners,
            'aspect-1': isRatio1x1
          })}
          alt={name}
        />
      </div>
      <div className="flex-1 flex flex-col justify-center min-w-0">
        <div className="mb-[6px] flex gap-1">
          <RarityBadge rarity={rarity} redeemable={redeemable} />
          {!!owned_count && <OwnedBadge owned_count={owned_count} />}
          <ExclusiveProductBadge isVisible={exclusive} className="!w-[22px]" />
        </div>
        <h2 className="h7 mb-half truncate">{name}</h2>
        <p className="body-xs text-gray-300 truncate">{drop_name}</p>
      </div>
    </div>
  )
}
