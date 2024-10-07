import React, { useState } from 'react'
import ProductCard, { ProductCardInterface } from '..'
import { CatalogItem as CatalogItemType } from '@/api/resources/catalog/details/get/schema'
import CatalogItemInfo from './CatalogItemInfo'
import CatalogItemPrice from './CatalogItemPrice'
import { isUniqueProduct } from '@/util/assetHelpers'
import { getDropNoListingType } from '@/util/dropHelpers'

export interface CatalogItemInterface extends ProductCardInterface {
  asset: CatalogItemType
  className?: string
  drop_name?: string
  hidePriceComponent?: boolean
}

const CatalogItem = ({
  className,
  asset,
  isMiniLayout,
  isSmallLayout,
  drop_name,
  hidePriceComponent = false,
  isCatalogAsset,
  ...props
}: CatalogItemInterface) => {
  const [isHovered, setIsHovered] = useState(false)
  const { name, rarity, redeemable, owned_count, listing_price, exclusive } =
    asset

  const itemInfoClasses = isMiniLayout
    ? 'p-2 w-[calc(100%-139px)]'
    : isSmallLayout
    ? 'px-[1.5em] py-[1.625em]'
    : 'px-[3em] py-[2.25em]'

  return (
    <ProductCard
      isHovered={isHovered}
      setIsHovered={setIsHovered}
      className={className}
      asset={{ ...asset, drop_name }}
      isMiniLayout={isMiniLayout}
      isSmallLayout={isSmallLayout}
      isCatalogAsset
      mediaClasses={
        isMiniLayout
          ? 'aspect-1 h-[139px]'
          : isSmallLayout
          ? 'aspect-[200/159]'
          : 'aspect-[338/304]'
      }
      {...props}
      infoSlot={
        <CatalogItemInfo
          isMiniLayout={isMiniLayout}
          isSmallLayout={isSmallLayout}
          className={itemInfoClasses}
          asset_name={name}
          drop_name={drop_name}
          isExclusive={exclusive}
          owned_count={owned_count}
          rarity={rarity}
          redeemable={redeemable}
          footer={
            !hidePriceComponent && (
              <CatalogItemPrice
                isCatalogAsset={isCatalogAsset}
                size={isSmallLayout ? 'small' : 'default'}
                listing_price={listing_price}
                isUniqueProduct={isUniqueProduct(asset)}
                noListingType={getDropNoListingType(asset)}
              />
            )
          }
          footerLocation="bottom-content"
        />
      }
    />
  )
}

export default React.memo(CatalogItem)
