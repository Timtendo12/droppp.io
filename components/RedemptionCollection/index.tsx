import moment from 'moment-timezone'
import React from 'react'
import { MEDIA_SIZES, REDEMPTION_LOGOS } from '@/constants'
import { MediaItem } from '@/api/resources/shared/media'
import { Icon, PreviewMedia, Separator } from '..'
import CloudinaryImage from '@/components/CloudinaryImage'
import RoundedBox from '@/components/RoundedBox'
import styles from './styles.module.scss'
import { formattedPacificDate } from '@/util/time/pt'
import { DateFormatter, diffFromNow, formattedDate } from '@/util/time'
import ExclusiveProductBadge from '@/components/ProductCard/ExclusiveProductBadge'
import { findDropConfigById } from '@/config/drops'
import { classNames } from '@/util/tailwindHelpers'
import { ButtonLink } from '../Button'
import { getRedemptionAssetsQty } from '@/features/redemption/checkout/utils'

interface IRedemption {
  className?: string
  drop_id: number
  collection_id: number
  drop_name: string
  start_date: string
  end_date: string
  templates: any[]
  media: MediaItem
  active?: boolean
  inDetail: boolean
}

const RedemptionCollection = ({
  className,
  drop_id,
  collection_id,
  drop_name,
  start_date,
  end_date,
  templates,
  media,
  active,
  inDetail
}: IRedemption) => {
  const redemptionLogo = REDEMPTION_LOGOS[collection_id]

  const hasStarted = moment.utc(start_date).isBefore(moment())
  const hasEnded = moment.utc(end_date).isBefore(moment())

  const endDataFormatted = formattedDate(end_date)
  const startDateFormatted = formattedDate(start_date)
  const durationToEnd = diffFromNow(new Date(end_date))

  const drop = findDropConfigById(drop_id)

  let statusLabel = `Redemption starting on ${startDateFormatted}`

  if (hasStarted) {
    statusLabel = `Redemption ending on ${endDataFormatted}`
  }

  if (hasEnded) {
    statusLabel = `Redemption ended on ${endDataFormatted}`
  }

  const totalAssets = getRedemptionAssetsQty(templates)
  const canRedeem = active && totalAssets > 0

  return (
    <RoundedBox
      className={classNames(
        styles.container,
        active || inDetail
          ? 'bg-gray-850'
          : 'bg-gray-900 border border-gray-800',
        className
      )}
    >
      <div className="block md:flex justify-start min-h-[220px]">
        <div className="flex flex-col justify-center items-start pr-[15px]">
          <div className="flex items-center">
            <div className="flex gap-1 items-center">
              <Icon name="funkologo" />
              {drop?.exclusive && (
                <ExclusiveProductBadge
                  isVisible={drop.exclusive}
                  className="!w-[24px]"
                />
              )}
            </div>
            {redemptionLogo && (
              <div className="relative w-[24px] h-[24px] ml-1">
                <CloudinaryImage
                  imageId={redemptionLogo.imageId}
                  path={`drops/${redemptionLogo.path}/`}
                  alt={drop_name}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            )}
          </div>
          <div className="h4 mt-2">{drop_name}</div>
          {(active || inDetail) && (
            <div
              className={classNames(styles.rewards, {
                [styles.active]: !!templates.length
              })}
            >
              <Icon name="diamond" />
              <div className="h7 mx-[6px] leading-none">Redemptions</div>
              <div
                className={classNames(
                  `flex items-center justify-center min-w-[24px] h-3 h7 px-[4px] leading-none rounded-full`,
                  !!templates.length
                    ? 'text-[#511735] bg-white'
                    : 'text-gray-800 bg-gray-300'
                )}
              >
                {totalAssets}
              </div>
            </div>
          )}
          {!inDetail && (
            <div className="mt-2 body text-gray-300">{statusLabel}</div>
          )}
        </div>
        <div className={styles.preview}>
          <div
            className={classNames(
              'flex justify-center items-center h-full max-md:-mb-7',
              {
                '!items-end': inDetail
              }
            )}
          >
            <PreviewMedia
              alt={`${drop_name} - redemption character`}
              className={classNames(
                'min-w-[220px] max-w-[350px] max-h-full m-0 object-contain',
                {
                  '!-mb-2': inDetail
                }
              )}
              size={MEDIA_SIZES.LARGE}
              media={media}
            />
          </div>
        </div>
      </div>
      {inDetail && hasStarted && (
        <div
          className={classNames(
            'flex items-center px-2 md:px-4 py-3 -m-3 lg:-m-4 !mt-0 bg-gray-800 border-t border-b border-gray-900',
            {
              '!border-error !bg-error-opaque': durationToEnd < 7
            }
          )}
        >
          <Icon className="shrink-0 mr-2" name="clockFill" />
          <div>
            <div className="h7 text-white">
              Redemption tokens must be used before:
              <br />
              {formattedPacificDate(
                end_date,
                DateFormatter.LongHoursMinutesSeconds,
                true
              )}
            </div>
            <div className="mt-1 body-sm text-gray-300">
              Tokens will remain in your account afterwards but will not be
              redeemable.
            </div>
          </div>
        </div>
      )}
      {canRedeem && (
        <div className="md:pt-3">
          <Separator className="-mx-3 lg:-mx-4 border-gray-900" />
          <ButtonLink
            href={`/redemptions/checkout/?drop_id=${drop_id}`}
            className="w-full mt-3"
            size="lg"
            theme="rainbow"
          >
            Redeem
          </ButtonLink>
        </div>
      )}
    </RoundedBox>
  )
}

export default RedemptionCollection
