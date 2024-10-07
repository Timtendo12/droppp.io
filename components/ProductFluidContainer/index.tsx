import React, { ReactNode, CSSProperties } from 'react'
import type { Size } from '@/types/grid'
import {
  calculateDynamicFontMetrics,
  DynamicFontMetrics
} from '@/hooks/useDynamicFont'
import {
  PRODUCT_CARD_MAX_SIZE,
  PRODUCT_CARD_SMALL_LAYOUT_THRESHOLD
} from '@/components/ProductCard'

export type CardLayout = 'regular' | 'small'

export type CardMetrics = {
  cardSize: Size
  cardLayout: CardLayout
  dynamicFontMetrics: DynamicFontMetrics
  extrinsicScale: number
  isCardSizeExceedingMaximumSize: boolean
}

const aspectResize = (base: Size, width: number): Size => {
  return {
    width: width,
    height: (width / base.width) * base.height
  }
}

export const cardMetrics = (
  columnWidth: number,
  maximumCardSize: Size,
  smallLayoutThreshold: number
): CardMetrics => {
  const isSmallLayout = columnWidth < (smallLayoutThreshold || 0)

  const targetWidth = isSmallLayout
    ? smallLayoutThreshold
    : maximumCardSize.width

  const dynamicFontMetrics = calculateDynamicFontMetrics(
    columnWidth,
    targetWidth
  )

  const cardSize = aspectResize(maximumCardSize, columnWidth)
  const extrinsicScale = columnWidth / maximumCardSize.width

  return {
    cardSize: cardSize,
    cardLayout: isSmallLayout ? 'small' : 'regular',
    dynamicFontMetrics: dynamicFontMetrics,
    extrinsicScale: extrinsicScale,
    isCardSizeExceedingMaximumSize: columnWidth > maximumCardSize.width
  }
}

interface Props {
  cardWidth: number
  maximumCardSize?: Size
  minimumCardWidth?: number
  smallLayoutThreshold?: number
  className?: string
  style?: CSSProperties
  children: (cardMetrics: CardMetrics) => ReactNode
}

const ProductFluidContainer = ({
  cardWidth,
  maximumCardSize = PRODUCT_CARD_MAX_SIZE,
  smallLayoutThreshold = PRODUCT_CARD_SMALL_LAYOUT_THRESHOLD,
  className,
  style,
  children
}: Props) => {
  const metrics = cardMetrics(cardWidth, maximumCardSize, smallLayoutThreshold)
  const { dynamicFontMetrics, extrinsicScale } = metrics

  return (
    <div
      className={`${className}`}
      style={{
        fontSize: `${dynamicFontMetrics.fontSize}px`,
        '--baseFontSize': `${dynamicFontMetrics.fontSize}`,
        '--extrinsicScale': `${extrinsicScale}`,
        '--intrinsicScale': `${dynamicFontMetrics.scale}`,
        '--fluidUnit': `1em`, // @todo: Remove --fluidUnit and replace all calcs in the code that use it with `em` values. Trevor - 05/03/2023
        ...style
      }}
    >
      {children(metrics)}
    </div>
  )
}

export default ProductFluidContainer
