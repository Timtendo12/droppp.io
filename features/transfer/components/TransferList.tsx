import { groupByInventories } from '@/util/assetHelpers'
import TransferListItem from './TransferListItem'
import { Asset } from '@/api/resources/asset/get/schema'

interface Props {
  items: Asset[]
}

const TransferList = ({ items }: Props) => {
  const groupedItemsByTemplate = groupByInventories(items, 'template_id')

  return (
    <>
      <ul className="flex flex-col gap-1">
        {groupedItemsByTemplate.map(item => {
          return <TransferListItem item={item} key={item.id} />
        })}
      </ul>
    </>
  )
}

export default TransferList
