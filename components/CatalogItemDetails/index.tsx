import { CatalogItemDetail } from '@/api/resources/catalog/item/get/schema'
import { PfpDetails } from './Pfp/Details'
import { NormalDetails } from './Normal/Details'
import { DropConfig } from '@/config/drops/schema'
import { isPfp } from '@/api/resources/shared/drop'
import { CatalogItemSalesHistory } from '@/api/resources/catalog/item/sales/history/get/schema'

type Props = {
  catalogItem: CatalogItemDetail
  catalogItemSalesHistory?: CatalogItemSalesHistory
  drop?: DropConfig
}

export function CatalogItemDetails({
  catalogItem,
  catalogItemSalesHistory,
  drop
}: Props) {
  return isPfp(catalogItem) ? (
    <PfpDetails catalogItem={catalogItem} drop={drop} />
  ) : (
    <NormalDetails
      catalogItem={catalogItem}
      catalogItemSalesHistory={catalogItemSalesHistory}
      drop={drop}
    />
  )
}
