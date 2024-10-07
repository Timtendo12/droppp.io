import { useState } from 'react'
import { useRouter } from 'next/router'
import { isRedeemable, isUniqueProduct } from '@/util/assetHelpers'
import ForSaleBadge from '@/components/Badge/ForSaleBadge'
import Button from '@/components/Button'
import { findDropConfigById } from '@/config/drops'
import InventoryDetail from './InventoryDetail'
import { useGetUserAsset } from '@/api/resources/user/asset/get'
import Loading from '@/components/Loading'
import { useInventory } from '@/hooks/useInventory'
import { useCatalogItemSalesHistoryQuery } from '@/api/resources/catalog/item/sales/history/get'
import SalesHistory, {
  ItemDisplay
} from '../PageSpecificComponents/pdp/SalesHistory'
import { useCatalogItemDetailQuery } from '@/api/resources/catalog/item/get'
import { DetailPresentationStyle } from '../InventoryBrowser/hooks/useDetailPresentationStyle'
import { InfoBlockDefinition } from '@/components/InfoBlocks/InfoBlock'
import MarketplaceSection from './components/MarketplaceSection'
interface Props {
  id: string
  presentationStyle: DetailPresentationStyle
  onClose: () => void
}

const PrivateInventoryDetail = ({ id, presentationStyle, onClose }: Props) => {
  const router = useRouter()
  const { isLoading, data } = useGetUserAsset(id)
  const { isLoading: isCatalogItemDetailLoading, data: catalogItemDetailData } =
    useCatalogItemDetailQuery(data?.asset.template_id.toString(), {
      enabled: !!data
    })
  const { isLoading: isSalesHistoryLoading, data: salesHistory } =
    useCatalogItemSalesHistoryQuery(
      {
        data_id: catalogItemDetailData?.card.data_id.toString()
      },
      {
        enabled: !!catalogItemDetailData
      }
    )

  const [opening, setOpening] = useState(false)
  const { openAsset } = useInventory()

  if (isLoading || !data) return <Loading />
  if (isCatalogItemDetailLoading || !catalogItemDetailData) return <Loading />
  if (isSalesHistoryLoading || !salesHistory) return <Loading />

  const {
    stats,
    name: itemName,
    rarity,
    redeem_ship_date,
    cardid,
    chain_template_id,
    drop_type
  } = catalogItemDetailData.card

  const asset = {
    ...data.asset,
    redeem_ship_date,
    card_id: cardid,
    chain_template_id,
    drop_type
  }

  let {
    attributes,
    redeemable,
    openable,
    marketplace,
    drop_marketplace_disabled,
    drop_marketplace_disabled_primary,
    drop_id
  } = asset

  const drop = findDropConfigById(data.asset.drop_id)
  const isListed = marketplace && marketplace.status !== null
  const hasRedeemable = isRedeemable(attributes.rarity) && redeemable
  const hasOpenable = openable
  const salesHistoryItemTitle = rarity ? rarity + ' - ' + itemName : itemName

  const handleRedeem = () =>
    router.push(`/redemptions/checkout/?drop_id=${drop_id}`)

  const handleOpen = () => {
    setOpening(true)
    openAsset(asset.id, asset.open_url).finally(() => setOpening(false))
  }

  const highLevelInfo = ((): InfoBlockDefinition[] => {
    let definitions: InfoBlockDefinition[] = []

    if (drop_marketplace_disabled || drop_marketplace_disabled_primary)
      return definitions

    const assetIsUnique = isUniqueProduct(asset)

    // The order of the definitions below is the order in which they will appear in the info blocks.
    // Do not attempt to consolidate Lowest Price and Active Listings under the same conditional check,
    // otherwise they will appear next to each other instead of surrounding Listed Price (if its avaiable for display).

    if (!assetIsUnique) {
      definitions.push({
        label: 'Lowest Price',
        value: {
          type: 'usdc',
          value: asset.marketplace.lowest_listing_price
        }
      })
    }

    if (
      asset.marketplace.listing_price &&
      asset.marketplace.status == 'active'
    ) {
      definitions.push({
        label: 'Listed Price',
        value: {
          type: 'usdc',
          color:
            asset.marketplace.listing_price <=
            asset.marketplace.lowest_listing_price
              ? 'green'
              : 'white',
          value: asset.marketplace.listing_price
        }
      })
    }

    if (!assetIsUnique) {
      definitions.push({
        label: 'Active Listings',
        value: {
          type: 'numeric',
          value: asset.marketplace.available_listing_count
        }
      })
    }

    return definitions
  })()

  return (
    <>
      <InventoryDetail
        item={asset}
        highLevelInfo={highLevelInfo}
        assetActionsSlot={
          (hasRedeemable || openable) &&
          !isListed && (
            <>
              {hasRedeemable && (
                <Button
                  className="w-full"
                  theme="rainbow"
                  onClick={handleRedeem}
                >
                  Redeem
                </Button>
              )}
              {hasOpenable && (
                <Button
                  className="w-full"
                  theme="rainbow"
                  loading={opening}
                  onClick={handleOpen}
                >
                  Open
                </Button>
              )}
            </>
          )
        }
        marketplaceSlot={
          !drop_marketplace_disabled && (
            <>
              <MarketplaceSection
                displayMode={'inventory'}
                item={asset}
                drop={drop}
                disabledMarketplaceConfig={
                  !!asset.drop_marketplace_disabled_primary && {
                    timeLaunch: drop.time_launch,
                    dropUrl: drop.url
                  }
                }
              />
            </>
          )
        }
        salesHistorySlot={
          <SalesHistory
            history={salesHistory}
            stats={stats}
            type={ItemDisplay.PDD}
            itemTitle={salesHistoryItemTitle}
          />
        }
        badgeSlot={isListed && <ForSaleBadge size="lg" />}
        presentationStyle={presentationStyle}
        onClose={onClose}
      />
    </>
  )
}

export default PrivateInventoryDetail
