import classNames from 'classnames'
import React from 'react'
import ProductCardInfo, {
  ProductCardInfoInterface
} from '@/components/ProductCard/ProductCardInfo'
import OwnedBadge, {
  Display as OwnedBadgeDisplay,
  shouldShowOwnedBadge
} from '@/components/OwnedBadge'
import ExclusiveProductBadge from '@/components/ProductCard/ExclusiveProductBadge'

interface Props extends ProductCardInfoInterface {
  owned_count?: number
  isExclusive: boolean
}

const CatalogItemInfo = ({
  owned_count,
  className,
  isExclusive,
  ...props
}: Props) => {
  const { isSmallLayout } = props

  return (
    <ProductCardInfo
      className={classNames(
        'bg-gray-850 flex-1 flex flex-col justify-top',
        className
      )}
      pillSlot={
        // It's important to do this check and conditionally show the owned badge.
        // That way if the owned badge is not to be shown, an actual undefined value
        // will be held in the pillSlot which is needed in the ProductCardInfo's rather
        // than a component that returns null.
        <>
          {shouldShowOwnedBadge(owned_count) && (
            <OwnedBadge
              owned_count={owned_count}
              display={
                isSmallLayout
                  ? OwnedBadgeDisplay.Compact
                  : OwnedBadgeDisplay.Default
              }
              size={isSmallLayout ? 'fluid-sm' : 'fluid-lg'}
              overrideIconSize={true}
            />
          )}
          <ExclusiveProductBadge
            isVisible={isExclusive}
            isSmallLayout={isSmallLayout}
          />
        </>
      }
      {...props}
    />
  )
}

export default CatalogItemInfo
