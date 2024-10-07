import BuyAction from '@/components/Actions/BuyAction'
import { DropConfig } from '@/config/drops/schema'
import { Rarity } from '@/api/resources/shared/rarity'

type Item = {
  id?: number
  data_id?: number
  chain_template_id?: number
  listings_available?: number
  listing_price?: number | null
  rarity?: Rarity
  exclusive?: boolean
  drop_type?: number
  cardid?: number
}

type Props = {
  item: Item
  drop: DropConfig
  showMoreOptionsButton?: boolean
}

export default function CardItemMarketplaceActions({ item }: Props) {
  const { chain_template_id, listing_price, listings_available, rarity } = item
  const buyId = item.id || item.data_id

  return (
    <div className="flex flex-col gap-2">
      <BuyAction
        data_id={buyId}
        chain_template_id={chain_template_id}
        listing_price={listing_price}
        listings_available={listings_available}
        rarity={rarity}
      />
    </div>
  )
}
