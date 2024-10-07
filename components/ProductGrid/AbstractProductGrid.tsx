import React, { ReactNode } from 'react'
import type { Size } from '@/types/grid'
import { PRODUCT_CARD_MAX_SIZE, PRODUCT_CARD_MIN_WIDTH } from '@/components/ProductCard'
import ProductFluidContainer, { CardMetrics } from '@/components/ProductFluidContainer'
import { Layout, GRID_GAP } from './'

export interface Card<Details> {
  id: number
  content: (layout: Layout, cardMetrics: CardMetrics) => ReactNode
  details: Details
}

export type DefaultLayoutGenerator = {
  type: 'default'
  containerWidth: number
  gap?: number
}

export type PrecomputedLayout = {
  type: 'precomputed'
} & Layout

export type CustomLayoutGenerator = {
  type: 'custom'
  generate: (maximumCardSize: Size, minimumCardWidth: number) => Layout
}

export type LayoutGenerator =
  | DefaultLayoutGenerator
  | CustomLayoutGenerator
  | PrecomputedLayout

export const performLayout = (
  maximumCardSize: Size,
  minimumCardWidth: number,
  { containerWidth, gap = GRID_GAP.regular }: DefaultLayoutGenerator
): Layout => {
  for (let i = 1; i > 0; i++) {
    const gaps = (i - 1) * gap
    const columnWidth = (containerWidth - gaps) / i
    const nextCardWidth = (containerWidth - i * gap) / (i + 1)

    const layout = {
      columns: i,
      columnWidth: columnWidth,
      gap: gap
    }

    if (nextCardWidth < minimumCardWidth) {
      return layout
    }

    // If the columnWidth is greater than the the maximum allowed card width, then continue the loop
    // and introduce another column.
    if (columnWidth > maximumCardSize.width) {
      continue
    }

    return layout
  }
}

interface Props<Details> {
  cards: (layout: Layout) => Card<Details>[]
  layoutGenerator: LayoutGenerator
  maximumCardSize?: Size
  minimumCardWidth?: number
  className?: string
}

const AbstractProductGrid = <Details,>({
  cards,
  layoutGenerator,
  maximumCardSize = PRODUCT_CARD_MAX_SIZE,
  minimumCardWidth = PRODUCT_CARD_MIN_WIDTH,
  className
}: Props<Details>) => {
  let layout: Layout | undefined = undefined

  if (!!layoutGenerator.type) {
    switch (layoutGenerator.type) {
      case 'custom':
        layout = layoutGenerator.generate(maximumCardSize, minimumCardWidth)
        break
      case 'default':
        layout = performLayout(
          maximumCardSize,
          minimumCardWidth,
          layoutGenerator
        )
        break
      case 'precomputed':
        layout = layoutGenerator
        break
    }
  }

  const items = cards(layout)

  return (
    <ProductFluidContainer cardWidth={layout.columnWidth}>
      {cardMetrics => (
        <div
          className={`grid ${className}`}
          style={{
            gap: `${layout.gap}px`,
            gridTemplateColumns: `repeat(${layout.columns}, minmax(0, 1fr))`,
            gridAutoRows: `${cardMetrics.cardSize.height}px`
          }}
        >
          {items.map(item => (
            <React.Fragment key={item.id}>
              {item.content(layout, cardMetrics)}
            </React.Fragment>
          ))}
        </div>
      )}
    </ProductFluidContainer>
  )
}

export default AbstractProductGrid
