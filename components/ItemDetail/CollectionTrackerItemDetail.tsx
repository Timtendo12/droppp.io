import BaseDetail from './BaseDetail'
import { useGetCollectionAsset } from '@/api/resources/user/tracker/drop/asset/get'
import Loading from '@/components/Loading'
import { useAuth } from '@/contexts/auth'
import OwnedBadge from '@/components/OwnedBadge'
import { findDropConfigById } from '@/config/drops'
import { isUniqueProduct, shouldProductShowTimeline } from '@/util/assetHelpers'
import { useCatalogItemDetailQuery } from '@/api/resources/catalog/item/get'
import { useCatalogItemSalesHistoryQuery } from '@/api/resources/catalog/item/sales/history/get'
import SalesHistory, {
  ItemDisplay
} from '../PageSpecificComponents/pdp/SalesHistory'
import ImportantDatesSection from './components/ImportantDatesSection'
import { DetailPresentationStyle } from '../InventoryBrowser/hooks/useDetailPresentationStyle'
import SubtitleLowestPrice from './components/SubtitleLowestPrice'
import { InfoBlockDefinition } from '@/components/InfoBlocks/InfoBlock'
import MarketplaceSection from './components/MarketplaceSection'

const CollectionTrackerItemDetail = ({
  id,
  presentationStyle,
  onClose
}: {
  id: string
  presentationStyle: DetailPresentationStyle
  onClose: () => void
}) => {
  const { selectedWallet } = useAuth()
  const { isLoading, data } = useGetCollectionAsset(
    id,
    selectedWallet?.address || ''
  )

  const { isLoading: isCatalogItemDetailLoading, data: catalogItemDetailData } =
    useCatalogItemDetailQuery(data?.card.chain_template_id.toString(), {
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

  const { card } = data
  const { cardid, owned_count, drop_marketplace_disabled_primary } = card
  const { stats, chain_url } = catalogItemDetailData.card

  const drop = {
    ...findDropConfigById(card.drop_id),
    redeem_ship_date: card.redeem_ship_date
  }

  const asset = {
    ...card,
    card_id: cardid,
    chain_url,
    time_launch: drop.time_launch
  }

  const salesHistoryItemTitle = card.rarity
    ? card.rarity + ' - ' + card.name
    : card.name

  const highLevelInfo = ((): InfoBlockDefinition[] => {
    let definitions: InfoBlockDefinition[] = []

    if (drop_marketplace_disabled_primary) return definitions

    if (!isUniqueProduct(card)) {
      definitions.push({
        label: 'Available Listings',
        value: {
          type: 'numeric',
          value: card.listing_count
        }
      })
    }

    return definitions
  })()

  return (
    <>
      <BaseDetail
        presentationStyle={presentationStyle}
        drop={drop}
        asset={asset}
        isPdd
        subtitle={<SubtitleLowestPrice item={card} />}
        highLevelInfo={highLevelInfo}
        marketplaceSlot={
          <MarketplaceSection
            displayMode={'catalog'}
            item={card}
            drop={drop}
            disabledMarketplaceConfig={
              !!drop_marketplace_disabled_primary && {
                timeLaunch: drop.time_launch,
                dropUrl: drop.url
              }
            }
          />
        }
        importantDatesSlot={
          shouldProductShowTimeline(card) && (
            <ImportantDatesSection
              drop={drop}
              eventLocation="collection-tracker-detail"
            />
          )
        }
        salesHistorySlot={
          <SalesHistory
            history={salesHistoryData}
            stats={stats}
            type={ItemDisplay.PDD}
            itemTitle={salesHistoryItemTitle}
          />
        }
        badgeSlot={
          <OwnedBadge owned_count={owned_count} size="lg" showOwnedLabel />
        }
        onClose={onClose}
      />
    </>
  )
}

export default CollectionTrackerItemDetail
