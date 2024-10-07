import { ReactNode } from 'react'
import { dateToLocal } from '@/util/timeHelpers'
import { Attribute } from './components/AttributeList'
import BaseDetail, { ItemDetail } from './BaseDetail'
import { findDropConfigById } from '@/config/drops'
import { shouldProductShowTimeline } from '@/util/assetHelpers'
import ImportantDatesSection from './components/ImportantDatesSection'
import { DetailPresentationStyle } from '../InventoryBrowser/hooks/useDetailPresentationStyle'
import SubtitleMintNumber from './components/SubtitleMintNumber'
import { InfoBlockDefinition } from '@/components/InfoBlocks/InfoBlock'

interface Props {
  isPublic?: boolean
  item: ItemDetail
  assetActionsSlot?: ReactNode
  marketplaceSlot?: ReactNode
  subtitle?: ReactNode
  highLevelInfo?: InfoBlockDefinition[]
  badgeSlot?: ReactNode
  salesHistorySlot?: ReactNode
  presentationStyle: DetailPresentationStyle
  onClose: () => void
}

const InventoryDetail = ({
  isPublic,
  item,
  highLevelInfo,
  badgeSlot,
  salesHistorySlot,
  assetActionsSlot,
  marketplaceSlot,
  presentationStyle,
  onClose
}: Props) => {
  const { timestamp, drop_id } = item
  const owner = typeof item.owner === 'string' ? item.owner : item.owner?.name

  const drop = {
    ...findDropConfigById(drop_id),
    redeem_ship_date: item.redeem_ship_date
  }
  const shouldShowTimeline = shouldProductShowTimeline(item)
  const eventLocation = isPublic ? 'profile-detail' : 'inventory-detail'

  return (
    <BaseDetail
      drop={drop}
      asset={item}
      highLevelInfo={highLevelInfo}
      assetActionsSlot={assetActionsSlot}
      marketplaceSlot={marketplaceSlot}
      presentationStyle={presentationStyle}
      onClose={onClose}
      subtitle={
        <SubtitleMintNumber number={item.mint_num} count={item.mint_count} />
      }
      badgeSlot={badgeSlot}
      importantDatesSlot={
        shouldShowTimeline && (
          <ImportantDatesSection drop={drop} eventLocation={eventLocation} />
        )
      }
      salesHistorySlot={salesHistorySlot}
      attributesComponent={
        <>
          <Attribute label="Owner" value={owner} />
          <Attribute
            label="Date Received"
            value={dateToLocal({
              date: timestamp,
              format: 'MMM D, YYYY - hh:mm A'
            })}
          />
        </>
      }
    />
  )
}

export default InventoryDetail
