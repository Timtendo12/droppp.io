import { CatalogItemDetail } from '@/api/resources/catalog/item/get/schema'
import { DropConfig } from '@/config/drops/schema'
import { Attributes } from '@/components/CatalogItemDetails/Shared/Attributes'
import { Disclosures } from '@/components/CatalogItemDetails/Shared/Disclosures'
import { Traits } from './Traits'
import { BuyACrate } from './BuyACrate'

type Props = {
  catalogItem: CatalogItemDetail
  drop?: DropConfig
}

export function PfpDetails({ catalogItem, drop }: Props) {
  return (
    <div className="container max-w-[392px] md:max-w-2xl">
      <div className="w-full flex flex-col items-center gap-8">
        <div className="w-full flex flex-col gap-8">
          <BuyACrate item={catalogItem} />
          <Traits traits={catalogItem.traits} />
          <Attributes catalogItem={catalogItem} />
          <Disclosures catalogItem={catalogItem} drop={drop} />
        </div>
      </div>
    </div>
  )
}
