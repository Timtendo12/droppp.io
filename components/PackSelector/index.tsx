import React, { ReactNode } from 'react'
import numeral from 'numeral'
import { MediaItem } from '@/api/resources/shared/media'
import { classNames } from '@/util/tailwindHelpers'
import { MEDIA_SIZES } from '@/constants'
import { Icon, PreviewMedia } from '..'
import SeriesBadge from '../SeriesBadge'
import { DropOrderAsset } from '@/api/resources/drop/order/assets/get/schema'
import NumberInput from '../NumberInput'

export interface IAsset {
  id: number
  name: string
  avail: number
  price: number
  media: MediaItem[]
  open_asset_count: number
}

export interface PackSelectorProps {
  asset: DropOrderAsset
  value: number
  layout?: 'small' | 'large'
  onChange: (id: number) => void
  children?: ReactNode
}

const PackSelector = ({
  asset,
  value,
  onChange,
  children,
  layout = 'small'
}: PackSelectorProps) => {
  const { name, avail, price, media, open_asset_count, pack_limit } = asset
  const packsAvailable = numeral(avail).format('0,0')

  const isPremium = name === 'Premium Pack'
  const isMythic = name === 'Mythic Pack'
  const isSoldOut = avail === 0
  const showBadgeDiamond = isMythic && !isSoldOut

  return (
    <div
      className="flex items-center justify-center max-[469px]:flex-col max-[469px]:gap-2 max-[469px]:border-b  max-[469px]:border-b-gray-700 max-[469px]:pb-3"
      aria-label="Select pack"
    >
      <PreviewMedia
        className={classNames(
          'w-[68px] h-10 object-contain mr-[12px] max-[469px]:m-0 max-[469px]:h-[180px] max-[469px]:w-full',
          { grayscale: isSoldOut }
        )}
        size={MEDIA_SIZES.SMALL}
        media={media[0]}
      />
      <div className="flex-1 flex flex-col items-start gap-[2px] w-full mr-2 max-[469px]:m-0 max-[469px]:flex-row max-[469px]:justify-between max-[469px]:items-center">
        <div className="flex flex-col items-start gap-[6px]">
          <SeriesBadge
            className={classNames('border-gray-300 relative', {
              'border-none border-redeemable bg-redeemable':
                isPremium && !isSoldOut,
              'border-none border-mythic bg-mythic/10': isMythic && !isSoldOut,
              ' !text-gray-300': isSoldOut
            })}
            size="lg"
            label={
              <div className="flex gap-half">
                {showBadgeDiamond && (
                  <div className="w-[15px] h-[11px] relative flex items-center">
                    <Icon name="diamond" className="" />
                  </div>
                )}
                {open_asset_count} DIGITAL POP!™
              </div>
            }
          />
          <div
            className={classNames('body space-y-half', {
              'text-gray-300': isSoldOut
            })}
          >
            {name} <br className="hidden max-[520px]:block" />
            <span className="text-gray-300">
              ({packsAvailable}&nbsp;available)
            </span>
          </div>
        </div>
        {!isSoldOut && (
          <div className="pricing-lg">${(price / 100).toFixed(2)}</div>
        )}
      </div>
      {isSoldOut ? (
        <p className="utility text-gray-300 max-[469px]:self-start max-[469px]:-mt-[10px]">
          Sold Out
        </p>
      ) : (
        <NumberInput
          layout={layout}
          value={value}
          onChange={onChange}
          max={pack_limit}
        />
      )}
      {children}
    </div>
  )
}

export default PackSelector
