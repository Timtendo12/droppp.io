import { ResponsiveItemCount } from '@/components/ItemSlider'
import classNames from 'classnames'
import { ReactElement, ReactNode, useRef } from 'react'
import ProductGrid, { Layout } from '@/components/ProductGrid'
import { CardMetrics } from '@/components/ProductFluidContainer'
import { Size } from '@/types/grid'
import useElementWidth from '@/hooks/useElementWidth'

interface MarketplaceItemsSectionItem {
  id?: number
}

export interface Props<Item extends MarketplaceItemsSectionItem> {
  id: string
  items?: Item[] | ((layout: Layout) => Item[])
  title?: string
  drop_type?: number
  titleClass?: string
  description?: ReactElement
  className?: string
  descriptionClass?: string
  headerClass?: string
  headerLogos?: ReactNode
  style?: any
  itemComponent: (
    item: Item,
    layout: Layout,
    cardMetrics: CardMetrics
  ) => ReactNode
  sliderBreakpoints?: ResponsiveItemCount
  subHeader?: ReactNode
  icon?: ReactNode
  children?: ReactNode
  maximumCardSize?: Size
}

const MarketplaceItemsSection = <Item extends MarketplaceItemsSectionItem>({
  id,
  items,
  title,
  titleClass = 'h3',
  description,
  descriptionClass,
  headerClass,
  headerLogos,
  className,
  subHeader,
  icon,
  style,
  itemComponent,
  maximumCardSize
}: Props<Item>) => {
  const containerRef = useRef<HTMLDivElement>()
  const { width: containerWidth } = useElementWidth(containerRef)

  if (items.length < 1) return null

  return (
    <section
      className={classNames(className, 'w-full')}
      style={{ ...style }}
      id={id}
    >
      <div ref={containerRef}>
        <div className={classNames('flex flex-col items-center', headerClass)}>
          {icon && <div className="mb-1">{icon}</div>}
          {headerLogos && <div>{headerLogos}</div>}
          <div className={classNames(titleClass, 'mb-1')}>{title}</div>
          <div
            className={classNames(
              descriptionClass,
              'body lg:body-lg text-gray-300 max-w-3xl'
            )}
          >
            {description}
          </div>
          {subHeader}
        </div>
        <div className="w-full">
          <ProductGrid
            items={items}
            containerWidth={containerWidth}
            maximumCardSize={maximumCardSize}
            itemComponent={itemComponent}
            className="w-full mt-4"
          />
        </div>
      </div>
    </section>
  )
}

export default MarketplaceItemsSection
