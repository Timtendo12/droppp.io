import { ReactNode } from 'react'
import classNames from 'classnames'
import { MediaItem } from '@/api/resources/shared/media'
import { AssetAttributes } from '@/api/resources/shared/assetAttributes'
import { Rarity } from '@/api/resources/shared/rarity'
import { InventoryItemMedia } from '@/components/InventoryItem/InventoryItemMedia'
import FluidAssetMintNumber from '@/components/InventoryItem/FluidAssetMintNumber'
import ProductCardBrandIcon from './ProductCardBrandIcon'
import { cssFormattedSpacing } from '@/util/tailwindHelpers'
import { isFullWidthProductMedia } from '@/util/assetHelpers'

export const PRODUCT_CARD_MAX_SIZE = { width: 338, height: 450 }
export const PRODUCT_CARD_MIN_WIDTH = 150
export const PRODUCT_CARD_MIN_WIDTH_MOBILE = 150
export const PRODUCT_CARD_SMALL_LAYOUT_THRESHOLD = 200

export type AssetLike = {
  name?: string
  media?: MediaItem[]
  drop_name?: string
  attributes?: AssetAttributes
  mint_num?: number
  mint_count?: number
  rarity?: Rarity
}

export interface ProductCardInterface {
  onClick?: () => void
  isMiniLayout?: boolean
  isSmallLayout?: boolean
  onLayoutChange?: (isSmallLayout: boolean) => void
  overlayChildren?: ReactNode
  isActive?: boolean
  isHovered?: boolean
  setIsHovered?: (hovered: boolean) => void
  infoSlot?: ReactNode
  pillSlot?: ReactNode
  className?: string
  mediaClasses?: string
  asset: AssetLike
  brandImage?: {
    id: string
    path: string
  }
  isCatalogAsset?: boolean
}

const ProductCardDetails = ({
  onClick,
  className = '',
  isActive = false,
  isHovered = false,
  setIsHovered = () => {},
  isMiniLayout,
  isSmallLayout,
  asset,
  overlayChildren,
  infoSlot,
  mediaClasses,
  brandImage,
  isCatalogAsset = false
}: ProductCardInterface) => {
  const { attributes, media, mint_num, mint_count, rarity } = asset

  // @fix - this is currently repeated in ProductCardInfo
  const _rarity = rarity || attributes?.rarity

  const mediaAsset = media[0]
  const isFullWidthAsset = isFullWidthProductMedia(asset)

  const itemMediaContainerClasses = getItemMediaContainerClasses(
    isFullWidthAsset,
    isCatalogAsset,
    isSmallLayout,
    isMiniLayout
  )

  const itemMediaObjectFit = isFullWidthAsset ? 'cover' : 'contain'
  const borderClasses = isActive
    ? 'before:border-blue--light'
    : 'before:border-defaultBorder'
  const borderRadius = isSmallLayout
    ? `calc(var(--extrinsicScale) * ${cssFormattedSpacing(4)})`
    : '4em'

  return (
    <div
      className={classNames(
        'flex flex-1 relative min-w-0 min-h-0 min-[570px]:aspect-[338/450] before:inset-[-1px] before:border-1.5 before:absolute before:content-[""] before:rounded-[var(--borderRadius)] before:z-[1] before:pointer-events-none',
        className,
        borderClasses
      )}
      style={{
        '--borderRadius': borderRadius
      }}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex flex-1 w-full overflow-hidden transform-gpu bg-gray-900"
        style={{
          borderRadius
        }}
      >
        <div
          className={classNames(
            'flex-1 relative h-full w-full flex',
            isMiniLayout ? 'min-[570px]:flex-col' : 'flex-col'
          )}
        >
          <div className={classNames('relative flex', mediaClasses)}>
            <InventoryItemMedia
              objectFit={itemMediaObjectFit}
              media={mediaAsset}
              className={itemMediaContainerClasses}
              alt={asset.name}
            />

            {brandImage && (
              <ProductCardBrandIcon
                image={brandImage}
                size={isMiniLayout ? 'sm' : isSmallLayout ? 'md' : 'lg'}
              />
            )}
          </div>

          <FluidAssetMintNumber
            mint_num={mint_num}
            mint_count={mint_count}
            shouldRevealMintCount={isHovered}
            rarity={_rarity}
            isSmallLayout={isSmallLayout || isMiniLayout}
          />

          {infoSlot}
        </div>
        {onClick && (
          <button
            className={`absolute inset-0 w-full ${
              !isActive &&
              'focus:outline-0 focus-visible:ring-[1.5px] ring-gray-500 ring-inset rounded-[inherit]'
            }`}
            onClick={onClick}
          />
        )}
        {overlayChildren}
      </div>
    </div>
  )
}

const getItemMediaContainerClasses = (
  isFullWidthAsset,
  isCatalogAsset,
  isSmallLayout,
  isMiniLayout
): string => {
  if (!isFullWidthAsset) {
    if (isMiniLayout) {
      return 'mx-[20px] my-2'
    } else if (isCatalogAsset) {
      if (isSmallLayout) {
        return 'p-[2em]'
      } else {
        return 'p-f3'
      }
    } else {
      if (isSmallLayout) {
        return 'px-[2em] pt-[2em]'
      } else {
        return 'px-[3em] pt-[4em]'
      }
    }
  } else {
    return ''
  }
}

const ProductCard = ({
  isSmallLayout,
  className,
  ...props
}: ProductCardInterface) => {
  return (
    <div className={classNames('relative flex flex-1 h-full', className)}>
      <ProductCardDetails isSmallLayout={isSmallLayout} {...props} />
    </div>
  )
}

export default ProductCard
