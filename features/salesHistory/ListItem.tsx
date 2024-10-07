import { formatUSDC } from '@/util/currencyHelpers'
import {
  default as ListViewModalItem,
  Props as ListItemProps
} from '@/components/ListViewModal/ListItem'
import { SalesHistoryItem } from '@/api/resources/catalog/item/sales/history/get/types'
import ActivityTime from '@/components/ActivityTime'
import { ItemDisplay } from '@/components/PageSpecificComponents/pdp/SalesHistory'

export type Props = Omit<ListItemProps, 'children'> & {
  item: SalesHistoryItem
  display?: ItemDisplay
}

const ListItem = ({
  item,
  className = '',
  display = ItemDisplay.PDP
}: Props) => {
  const { listing_price, time_purchased } = item

  const currencyClass =
    display === ItemDisplay.PDD
      ? 'h8 font-semibold text-gray-300 ml-half'
      : 'h8 font-semibold md:h7 md:font-semibold text-gray-300 ml-half'
  return (
    <ListViewModalItem item={item} className={className} display={display}>
      <div className="flex flex-col gap-1 min-w-0 items-end">
        <div className="flex items-baseline">
          <span className="h6">{formatUSDC(listing_price)}</span>
          <span className={currencyClass}>&nbsp;USDC</span>
        </div>
        <ActivityTime
          date={time_purchased}
          displayRelative
          duration={1}
          pillClassName="!text-[9px] flex-grow-0 justify-center !py-[4.5px] !px-[8px]"
        />
      </div>
    </ListViewModalItem>
  )
}

export default ListItem
