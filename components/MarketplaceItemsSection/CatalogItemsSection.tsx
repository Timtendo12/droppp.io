import { CatalogItem as CatalogItemType } from '@/api/resources/catalog/details/get/schema'
import MarketplaceItemsSection, {
  Props as MarketplaceItemsSectionProps
} from './'
import Link from 'next/link'
import { getDropBrandImage } from '@/config/drops'
import CatalogItem from '@/components/ProductCard/Catalog'

interface Props<Item extends CatalogItemType>
  extends Omit<MarketplaceItemsSectionProps<Item>, 'itemComponent'> {
  drop_id?: number
}

const CatalogItemsSection = <Item extends CatalogItemType>({
  drop_id,
  items,
  ...props
}: Props<Item>) => {
  return (
    <MarketplaceItemsSection<Item>
      items={layout => {
        let candidates = typeof items === 'function' ? items(layout) : items

        candidates = drop_id
          ? candidates.map(item => {
              return {
                drop_id: drop_id,
                ...item
              }
            })
          : candidates

        return candidates
      }}
      itemComponent={(item, _, cardMetrics) => {
        const id = item.template_id || item.chain_template_id
        return (
          <Link key={id} className="block card--hover" href={`/products/${id}`}>
            <CatalogItem
              isCatalogAsset={true}
              asset={item}
              drop_name={item.drop_name}
              isSmallLayout={cardMetrics.cardLayout === 'small'}
              brandImage={getDropBrandImage(item.drop_id)}
            />
          </Link>
        )
      }}
      {...props}
    />
  )
}

export default CatalogItemsSection
