import classnames from 'classnames'
import moment from 'moment'
import React from 'react'
import { DROP_TYPES, RARITY_TYPES, TRACKER_SECTION_IDS } from '@/enum'
import { ScrollToButton } from '@/components/Button'
import { CollectionThumb, Icon } from '@/components'
import { Collection } from '@/api/resources/user/tracker/drop/progress/get/schema'
import styles from '@/components/RarityBadge/styles.module.scss'
import { Rarity } from '@/api/resources/shared/rarity'
import { classNames } from '@/util/tailwindHelpers'
import { formattedPacificDate } from '@/util/time/pt'
import { DateFormatter } from '@/util/time'

const rewardClasses = 'h7 flex items-center h-5 p-1 rounded-full border'

interface Props {
  dropType: number
  redeemStartDate: string
  redeemEndDate: string
  hoverColor: string
  collection: Collection
}

const CollectionRedemptionDetail = ({
  dropType,
  redeemStartDate,
  redeemEndDate,
  hoverColor,
  collection
}: Props) => {
  const { royalty_count, collected_rarity_counts, time_complete_set } =
    collection
  const royaltyTrack =
    dropType === DROP_TYPES.POST_TOKEN ||
    dropType === DROP_TYPES.POST_REDEMPTION_DEADLINE

  const mythic_count = collected_rarity_counts?.Mythic
  const grail_count = collected_rarity_counts?.Grail
  const legendary_count = collected_rarity_counts?.Legendary
  const ultra_count = collected_rarity_counts?.Ultra

  const hasMythic = collected_rarity_counts?.Mythic !== undefined
  const hasUltra = collected_rarity_counts?.Ultra !== undefined
  const hasMythicAndUltra = hasMythic && hasUltra

  const renderRedemptionDetail = () => {
    if (dropType === DROP_TYPES.POST_TOKEN) {
      const utcStartTime = moment.utc(redeemStartDate)
      const utcEndTime = moment.utc(redeemEndDate)
      const ptStartTime = moment.tz(utcStartTime, 'America/Los_Angeles')
      const ptEndTime = moment.tz(utcEndTime, 'America/Los_Angeles')
      return (
        <div className="max-w-[500px] text-sm text-center mt-2 mx-auto text-gray-400">
          Redemption tokens were issued for this collection on{' '}
          {ptStartTime.format('MMM D, YYYY')} and must be redeemed by{' '}
          {ptEndTime.format('MMM D, YYYY')}. No further redemption tokens will
          be issued for completing additional Royalty Sets.
        </div>
      )
    }
    if (dropType === DROP_TYPES.POST_REDEMPTION_DEADLINE) {
      const utcTime = moment.utc(redeemEndDate)
      const ptTime = moment.tz(utcTime, 'America/Los_Angeles')
      return (
        <div className="max-w-[500px] text-sm text-center mt-2 mx-auto text-gray-400">
          The redemption window for this collection expired on{' '}
          {ptTime.format('MMM D, YYYY')}. No further redemption tokens will be
          issued for completing additional Royalty Sets.
        </div>
      )
    }

    return (
      <>
        <div
          className={classNames(
            'flex justify-center flex-wrap mb-3 mx-auto gap-2',
            {
              'max-w-md': hasMythicAndUltra
            }
          )}
        >
          {hasMythic && (
            <ScrollToRarityButton
              rarity={RARITY_TYPES.Mythic}
              redeem_count={mythic_count}
              target_id={`collection-redeemables-${RARITY_TYPES.Mythic}`}
            />
          )}
          <ScrollToRarityButton
            rarity={RARITY_TYPES.Grail}
            redeem_count={grail_count}
            target_id={`collection-redeemables-${RARITY_TYPES.Grail}`}
          />
          <ScrollToRarityButton
            rarity={RARITY_TYPES.Legendary}
            redeem_count={legendary_count}
            target_id={`collection-redeemables-${RARITY_TYPES.Legendary}`}
          />
          {hasUltra && (
            <ScrollToRarityButton
              rarity={RARITY_TYPES.Ultra}
              redeem_count={ultra_count}
              target_id={`collection-redeemables-${RARITY_TYPES.Ultra}`}
            />
          )}
          <ScrollToRarityButton
            rarity={RARITY_TYPES.Royalty}
            redeem_count={royalty_count}
            target_id={`collection-group-${TRACKER_SECTION_IDS.ROYALTY_SET}`}
          />
        </div>

        <div className="flex items-center justify-center text-sm">
          <Icon className="mr-1" name="calendar" />
          Collect by{' '}
          {formattedPacificDate(
            time_complete_set,
            DateFormatter.LongMonthShortDayHours
          )}{' '}
          PT
        </div>
      </>
    )
  }

  return (
    <div style={{ '--hoverColor': hoverColor }}>
      <CollectionThumb
        collection={collection}
        size="large"
        className="mx-auto mb-3"
      />
      <div className="h4 text-center mb-2">
        {royaltyTrack ? 'Royalty Tracker' : 'Redeemables'}
      </div>
      {renderRedemptionDetail()}
    </div>
  )
}

type ScrollToRarityButtonProps = {
  rarity: Rarity
  redeem_count: number
  target_id: string
}

const ScrollToRarityButton = ({
  rarity,
  redeem_count,
  target_id
}: ScrollToRarityButtonProps) => {
  const buttonLabel = rarity === RARITY_TYPES.Royalty ? 'Royalty Set' : rarity
  const isMythicRarity = rarity === RARITY_TYPES.Mythic

  const buttonStyles = isMythicRarity
    ? styles['rarityBadge--mythic']
    : `bg-rarity-${rarity.toLowerCase()}/30 !border-rarity-${rarity.toLowerCase()}`

  return (
    <ScrollToButton
      className={classnames(rewardClasses, buttonStyles)}
      targetId={target_id}
    >
      <Icon className="mr-[4px]" name="diamond" />
      {buttonLabel}
      <RedeemCount count={redeem_count} />
    </ScrollToButton>
  )
}

const RedeemCount = ({ count }) => {
  return (
    <div className="flex items-center justify-center w-3 h-3 rounded-3xl bg-white ml-1 text-sm font-extrabold mix-blend-screen text-black">
      {count}
    </div>
  )
}

export default CollectionRedemptionDetail
