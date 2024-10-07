import NiceModal from '@ebay/nice-modal-react'
import Modal from '@/components/Modals/ModalV2'
import { MODAL_ID } from '@/constants/modalId'
import Icon from '@/components/Icon'
import { GroupedAsset, groupByInventories } from '@/util/assetHelpers'
import { NonTransferableTypeEnum } from '@/api/resources/user/assets/transfer/preview/schema'
import TransferListItem from '../components/TransferListItem'
import { isPfp } from '@/api/resources/shared/drop'

type NonTransferableCategoryProps = {
  type: NonTransferableTypeEnum
  title: string
  description: string
  assets: GroupedAsset[]
}

type Props = {
  categories: NonTransferableCategoryProps[]
}

const NonTransferableItemsModal = NiceModal.create(({ categories }: Props) => {
  return (
    <Modal
      title={`Non-Transferable Items`}
      id={MODAL_ID.transfer.nonTransferableAssets}
    >
      <div className="flex flex-col gap-3 pb-1">
        {categories &&
          Object.values(categories).map(category => (
            <NonTransferableCategory key={category.title} {...category} />
          ))}
      </div>
    </Modal>
  )
})

const NonTransferableCategory = ({
  title,
  description,
  assets,
  type
}: NonTransferableCategoryProps) => {
  const groupedItemsByTemplate = groupByInventories(assets, 'template_id')
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <div className="flex gap-1">
          {type === 'EXCLUSIVE' && <Icon name="exclusiveBadge" />}
          <h3 className="h5">{title}</h3>
        </div>

        <p className="text-gray-300">{description}</p>
      </div>
      <div className="flex flex-col gap-1">
        {groupedItemsByTemplate.map(asset => (
          <TransferListItem
            key={asset.id}
            item={{
              id: asset.id,
              media: asset.media,
              label: asset.label,
              items: asset.items,
              isPfp: isPfp(asset)
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default NonTransferableItemsModal
