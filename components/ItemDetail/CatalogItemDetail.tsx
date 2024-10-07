import BaseDetail from './BaseDetail'
import Loading from '@/components/Loading'
import { useCatalogItemDetailQuery } from '@/api/resources/catalog/item/get'
import OwnedBadge from '@/components/OwnedBadge'
import { isUniqueProduct, shouldProductShowTimeline } from '@/util/assetHelpers'
import { findDropConfigById } from '@/config/drops'
import { useCatalogItemSalesHistoryQuery } from '@/api/resources/catalog/item/sales/history/get'
import SalesHistory, {
  ItemDisplay
} from '../PageSpecificComponents/pdp/SalesHistory'
import ImportantDatesSection from './components/ImportantDatesSection'
import { DetailPresentationStyle } from '../InventoryBrowser/hooks/useDetailPresentationStyle'
import SubtitleLowestPrice from './components/SubtitleLowestPrice'
import { InfoBlockDefinition } from '@/components/InfoBlocks/InfoBlock'
import MarketplaceSection from './components/MarketplaceSection'

const CatalogItemDetail = ({
  id,
  presentationStyle,
  onClose
}: {
  id: string
  presentationStyle: DetailPresentationStyle
  onClose: () => void
}) => {
  const { isLoading, data } = useCatalogItemDetailQuery(id)
  const { isLoading: isSalesHistoryLoading, data: salesHistoryData } =
    useCatalogItemSalesHistoryQuery(
      {
        data_id: data?.card.data_id.toString()
      },
      {
        enabled: !!data
      }
    )

  if (isLoading || !data) return <Loading />
  if (isSalesHistoryLoading || !salesHistoryData) return <Loading />

  const { card } = data
  const {
    drop_id,
    owned_count,
    cardid,
    stats,
    drop_marketplace_disabled_primary
  } = card

  const drop = {
    ...findDropConfigById(drop_id),
    redeem_ship_date: card.redeem_ship_date
  }

  const salesHistoryItemTitle = card.rarity
    ? card.rarity + ' - ' + card.name
    : card.name

  const shouldShowTimeline = shouldProductShowTimeline(card)

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
        drop={drop}
        asset={{ ...card, card_id: cardid }}
        isPdd
        highLevelInfo={highLevelInfo}
        presentationStyle={presentationStyle}
        onClose={onClose}
        subtitle={<SubtitleLowestPrice item={card} />}
        marketplaceSlot={
          <MarketplaceSection
            displayMode={'catalog'}
            item={card}
            drop={drop}
            showMoreOptionsButton={false}
            disabledMarketplaceConfig={
              !!card.drop_marketplace_disabled_primary && {
                timeLaunch: drop.time_launch,
                dropUrl: drop.url
              }
            }
          />
        }
        importantDatesSlot={
          shouldShowTimeline && (
            <ImportantDatesSection drop={drop} eventLocation="shop-detail" />
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
      />
    </>
  )
}

export default CatalogItemDetail
