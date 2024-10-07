import classNames from 'classnames'
import { ReactNode } from 'react'
import { AssetAttributes } from '@/api/resources/shared/assetAttributes'
import { Rarity } from '@/api/resources/shared/rarity'
import RarityBadge from '@/components/RarityBadge'

export interface ProductCardInfoInterface {
  isMiniLayout?: boolean
  isSmallLayout?: boolean
  rarity?: Rarity
  redeemable?: boolean
  className?: string
  attributes?: AssetAttributes
  drop_name: string
  asset_name: string
  footer?: ReactNode
  footerLocation?: 'bottom' | 'bottom-content'
  pillSlot?: ReactNode
}

export const ProductCardInfoRenderer = ({
  isMiniLayout,
  isSmallLayout = false,
  className = '',
  rarity,
  redeemable,
  attributes,
  pillSlot,
  footer,
  footerLocation = 'bottom',
  asset_name,
  drop_name
}: ProductCardInfoInterface) => {
  const _rarity = rarity || attributes?.rarity

  // determines if a pill will be shown
  // which happens if there is a rarity or a pill
  // slot is not undefined
  const isShowingPill = !!(_rarity || pillSlot)

  const verticalGapStyle = { gap: isSmallLayout ? '1em' : '1.25em' }
  const pillContainerStyle = isSmallLayout ? 'gap-[0.75em]' : 'gap-[1em]'

  const renderFooter = (location: string, className?: string) =>
    !!footer &&
    footerLocation === location && <div className={className}>{footer}</div>

  return {
    content: (
      <div className={classNames('min-h-0', className)}>
        <div
          className="flex flex-col justify-center text-left flex-1"
          style={{ ...verticalGapStyle }}
        >
          {isShowingPill && (
            <div className={`flex ${pillContainerStyle}`}>
              <RarityBadge
                size={isSmallLayout ? 'fluid-sm' : 'fluid-lg'}
                className="self-start"
                rarity={_rarity}
                redeemable={redeemable}
              />
              {!isMiniLayout && pillSlot}
            </div>
          )}

          <div
            className="flex flex-col justify-center"
            style={{ gap: isSmallLayout ? '0.5em' : '0.75em' }}
          >
            {!!asset_name && (
              <p
                className={classNames(
                  'h5 w-full',
                  isMiniLayout ? 'line-clamp-2' : 'truncate'
                )}
                style={{
                  fontSize: isSmallLayout ? '1.5em' : '2.25em',
                  lineHeight: isSmallLayout ? '1.2em' : '1.1em'
                }}
              >
                {asset_name}
              </p>
            )}

            {!!drop_name && (
              <p
                className="body-sm truncate w-full"
                style={{
                  fontSize: isSmallLayout ? '1.5em' : '2em',
                  lineHeight: isSmallLayout ? '1.4em' : '1.4em'
                }}
              >
                {drop_name}
              </p>
            )}
            {renderFooter(
              'bottom-content',
              !isSmallLayout ? 'mt-[-0.25em]' : undefined
            )}
          </div>
        </div>
        {renderFooter('bottom')}
      </div>
    ),
    isShowingPill
  }
}

const ProductCardInfo = (props: ProductCardInfoInterface) => {
  return ProductCardInfoRenderer({ ...props }).content
}

export default ProductCardInfo
