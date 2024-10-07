import React from 'react'
import { Asset } from '@/api/resources/asset/get/schema'
import FluidContainer from '@/components/FluidContainer'
import { getDropBrandImage } from '@/config/drops'
import CatalogItem from '@/components/ProductCard/Catalog'
import { BREAKPOINTS } from '@/constants'
import { useWindowWidth } from '@/contexts/windowDimensions'

interface ProductTransactionCardProps {
  asset: Asset
}

const PADDING_X = 32

const ProductTransactionCard = ({ asset }: ProductTransactionCardProps) => {
  const windowWidth = useWindowWidth()
  const isSmallLayout = windowWidth < BREAKPOINTS.listViewModalSm

  const targetWidth = isSmallLayout ? windowWidth + PADDING_X : 320

  return (
    <FluidContainer
      targetWidth={targetWidth}
      className="flex-1 min-[570px]:min-w-[150px] min-[570px]:max-w-[340px]"
    >
      <div className={isSmallLayout ? '' : 'aspect-[3/4] flex'}>
        <CatalogItem
          isMiniLayout={isSmallLayout}
          className="w-full"
          hidePriceComponent
          brandImage={getDropBrandImage(asset.drop_id)}
          asset={{ rarity: asset.attributes.rarity, ...asset }}
          drop_name={asset.drop_name}
        />
      </div>
    </FluidContainer>
  )
}

export default ProductTransactionCard
