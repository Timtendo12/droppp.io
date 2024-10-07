import { spacing } from '@/util/tailwindHelpers'
import { ReactNode } from 'react'
import AbstractProductGrid, {
  Card,
  LayoutGenerator
} from './AbstractProductGrid'
import { CardMetrics } from '@/components/ProductFluidContainer'
import useBreakpoints from '@/hooks/useBreakpoints'
import {
  PRODUCT_CARD_MAX_SIZE,
  PRODUCT_CARD_MIN_WIDTH,
  PRODUCT_CARD_MIN_WIDTH_MOBILE
} from '@/components/ProductCard'
import { Size } from '@/types/grid'

export const GRID_GAP = {
  regular: spacing(3),
  small: spacing(2)
}

export const GRID_X_PADDING = {
  default: spacing(4),
  mobile: spacing(2)
}

export type Layout = {
  columns: number
  columnWidth: number
  gap: number
}

export interface ProductGridItem {
  id?: number
}

export interface Props<Item> {
  className?: string
  containerWidth?: number
  maximumCardSize?: Size
  items?: Item[] | ((layout: Layout) => Item[])
  itemComponent: (
    item: Item,
    layout: Layout,
    cardMetrics: CardMetrics,
    index?: number
  ) => ReactNode
  layoutGenerator?: LayoutGenerator
}

const ProductGrid = <Item extends ProductGridItem>({
  items,
  containerWidth,
  itemComponent,
  maximumCardSize = PRODUCT_CARD_MAX_SIZE,
  ...props
}: Props<Item>) => {
  const { isMobile } = useBreakpoints(['mobile'])

  if (containerWidth == undefined) return null

  const cards = (layout: Layout): Card<Item>[] =>
    (typeof items === 'function' ? items(layout) : items).map(
      (item, index) =>
        ({
          index: index,
          id: item?.id || index,
          content: (layout, cardMetrics) =>
            itemComponent(item, layout, cardMetrics, index),
          details: item
        } as Card<Item>)
    )

  if (cards.length < 1) return null

  // @todo: Make a utility class that contains this logic as well as the same logic
  // contained within the inventory browser's grid layout logic.
  // Trevor - 05/08/2023
  const gap = isMobile ? GRID_GAP.small : GRID_GAP.regular
  const productCardMinWidth = isMobile
    ? PRODUCT_CARD_MIN_WIDTH_MOBILE
    : PRODUCT_CARD_MIN_WIDTH
  return (
    <AbstractProductGrid
      cards={cards}
      minimumCardWidth={productCardMinWidth}
      maximumCardSize={maximumCardSize}
      layoutGenerator={{
        type: 'default',
        containerWidth: containerWidth,
        gap: gap
      }}
      {...props}
    />
  )
}

export default ProductGrid
