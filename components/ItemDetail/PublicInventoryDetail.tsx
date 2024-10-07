import InventoryDetail from './InventoryDetail'
import Loading from '@/components/Loading'
import { useGetAsset } from '@/api/resources/asset/get'
import { useCatalogItemDetailQuery } from '@/api/resources/catalog/item/get'
import { useCatalogItemSalesHistoryQuery } from '@/api/resources/catalog/item/sales/history/get'
import SalesHistory, {
  ItemDisplay
} from '../PageSpecificComponents/pdp/SalesHistory'
import { DetailPresentationStyle } from '../InventoryBrowser/hooks/useDetailPresentationStyle'

interface Props {
  id: string
  presentationStyle: DetailPresentationStyle
  onClose: () => void
}

const PublicInventoryDetail = ({ id, presentationStyle, onClose }: Props) => {
  const { isLoading, data } = useGetAsset(id)
  const { isLoading: isCatalogItemDetailLoading, data: catalogItemDetailData } =
    useCatalogItemDetailQuery(data?.asset.template_id.toString(), {
      enabled: !!data
    })
  const { isLoading: isSalesHistoryLoading, data: salesHistoryData } =
    useCatalogItemSalesHistoryQuery(
      {
        data_id: catalogItemDetailData?.card.data_id.toString()
      },
      {
        enabled: !!catalogItemDetailData
      }
    )

  if (isLoading) return <Loading />
  if (isCatalogItemDetailLoading || !catalogItemDetailData) return <Loading />
  if (isSalesHistoryLoading || !salesHistoryData) return <Loading />

  if (!data) return null

  const { asset } = data

  const {
    stats,
    name: itemName,
    rarity,
    redeem_ship_date,
    cardid
  } = catalogItemDetailData.card

  const mergedAsset = { ...asset, redeem_ship_date, card_id: cardid }

  const salesHistoryItemTitle = rarity ? rarity + ' - ' + itemName : itemName

  return (
    <>
      <InventoryDetail
        item={mergedAsset}
        isPublic={true}
        salesHistorySlot={
          <SalesHistory
            history={salesHistoryData}
            stats={stats}
            type={ItemDisplay.PDD}
            itemTitle={salesHistoryItemTitle}
          />
        }
        presentationStyle={presentationStyle}
        onClose={onClose}
      ></InventoryDetail>
    </>
  )
}

export default PublicInventoryDetail
