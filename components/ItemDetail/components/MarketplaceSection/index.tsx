import Toast from '@/components/Toast'
import { DateFormatter, dateToMoment } from '@/util/time'
import { formattedPacificDate } from '@/util/time/pt'
import moment from 'moment'
import { DropConfig } from '@/config/drops/schema'
import Button from '@/components/Button'
import { UserAsset } from '@/api/resources/user/asset/get/schema'
import NiceModal from '@ebay/nice-modal-react'
import { MODAL_ID } from '@/constants/modalId'
import { PRICE_DISCLAIMER } from '@/components/Actions/BuyAction'
import ViewListingsAction from '@/components/Actions/ViewListingsAction'
import CardItemMarketplaceActions from './CardItemMarketplaceActions'
import PrivateInventoryMarketplaceActions from './PrivateInventoryMarketplaceActions'
import { ContentDisplayMode } from '@/components/Modals/ModalV2/OtherMarketplaceOptionsModal'
import TertiaryActions from '../TertiaryActions'

type Item = {
  id?: number
  data_id?: number
  chain_template_id?: number
  listings_available?: number
  listing_price?: number | null
  exclusive?: boolean
  drop_type?: number
  cardid?: number
}

type DisabledMarketplaceConfig = {
  timeLaunch: string
  dropUrl: string
}

export type Props = (
  | {
      displayMode: 'inventory'
      item: UserAsset
    }
  | {
      displayMode: 'catalog'
      item: Item
    }
) & {
  drop: DropConfig
  disabledMarketplaceConfig?: DisabledMarketplaceConfig
  showMoreOptionsButton?: boolean
}

const MarketplaceSection = ({
  displayMode,
  item,
  drop,
  disabledMarketplaceConfig,
  showMoreOptionsButton = true
}: Props) => {
  const isBeforePrimarySale = disabledMarketplaceConfig
    ? moment().isBefore(dateToMoment(disabledMarketplaceConfig.timeLaunch))
    : false

  const handleShowMoreOptions = (contentDisplayMode: ContentDisplayMode) => {
    NiceModal.show(MODAL_ID.otherMarketplaceOptions, {
      asset: item,
      contentDisplayMode: contentDisplayMode
    })
  }

  return (
    <>
      {disabledMarketplaceConfig && (
        <Toast
          type="information"
          inline
          description={
            isBeforePrimarySale
              ? `Packs for this collection go on sale on ${formattedPacificDate(
                  disabledMarketplaceConfig.timeLaunch,
                  DateFormatter.LongHoursMinutes,
                  true
                )}. You may buy and sell this item on the Droppp Marketplace once the drop has concluded.`
              : `Packs for this collection are currently on sale! You may buy and sell this item on the Droppp Marketplace once the drop has concluded.`
          }
          action={
            !isBeforePrimarySale
              ? {
                  label: 'Join The Drop',
                  href: `/reserve-drop/?drop_id=${drop.id}`
                }
              : {
                  label: 'View The Drop',
                  href: `${disabledMarketplaceConfig.dropUrl}`
                }
          }
        />
      )}
      <div className="flex flex-col gap-2">
        {!disabledMarketplaceConfig && (
          <>
            {displayMode == 'catalog' ? (
              <CardItemMarketplaceActions item={item} drop={drop} />
            ) : (
              <PrivateInventoryMarketplaceActions asset={item} drop={drop} />
            )}
            {!disabledMarketplaceConfig && (
              <ViewListingsAction
                product={{
                  chain_template_id:
                    displayMode == 'catalog'
                      ? item.chain_template_id
                      : item.template_id,
                  ...item
                }}
              />
            )}
          </>
        )}
        <TertiaryActions item={{ card_id: item.cardid, ...item }} drop={drop} />
        {!disabledMarketplaceConfig && (
          <>
            {displayMode == 'catalog' && item.listing_price != null && (
              <div className="body-xs text-gray-300">{PRICE_DISCLAIMER}</div>
            )}
            {showMoreOptionsButton && !item.exclusive && (
              <Button
                theme="clean"
                onClick={() => {
                  handleShowMoreOptions(
                    displayMode == 'catalog' ? 'buy' : 'sell'
                  )
                }}
                className="uppercase body-xs font-bold text-blue--light"
              >
                More Options
              </Button>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default MarketplaceSection
