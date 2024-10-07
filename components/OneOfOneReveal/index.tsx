import React from 'react'
import { MEDIA_SIZES } from '@/constants'
import classNames from 'classnames'
import RarityBadge from '@/components/RarityBadge'
import Image from 'next/legacy/image'
import Traits from '@/components/Traits'

const containerClasses =
  'px-3 mx-auto w-full max-w-[1152px] min-[650px]:flex gap-8 min-[650px]:px-8 min-[650px]:pt-8'
const imageColumnClasses = 'flex-1 max-w-[358px]'

const OneOfOneReveal = ({ inventory }) => {
  const { media, name, traits } = inventory

  return (
    <div className="flex-1">
      {/* image */}
      <div className="max-[650px]:mt-3 min-[650px]:fixed sm:top-[132px] md:top-[72px] inset-0 mb-3 -z-10">
        <div className={containerClasses}>
          <div
            className={classNames(
              'max-[650px]:mx-auto max-[650px]:max-w-[250px]',
              imageColumnClasses
            )}
          >
            <div className="aspect-1 relative bg-gray-200 rounded-[32px] overflow-hidden">
              <Image
                layout="fill"
                src={media[0][MEDIA_SIZES.ORIGINAL.url]}
                alt="One of One"
              />
            </div>
          </div>

          {/* dummy column */}
          <div className="flex-1" />
        </div>
      </div>

      {/* Body content for scrolling */}

      <div className={classNames('mb-3', containerClasses)}>
        {/* dummy column to take up space for fixed image */}
        <div className={imageColumnClasses} />

        <div className="flex-1 text-white">
          <div className="max-[650px]:flex flex-col max-[650px]:items-center md:block">
            <RarityBadge
              rarity="1 of 1"
              className="mb-[12px]"
              redeemable={false}
            />
            <h1 className="h2 mb-3">{name}</h1>
            <h5 className="h5 mb-3">Traits</h5>
          </div>
          {!!traits?.length && (
            <Traits
              className="min-[510px]:!grid-cols-2 min-[650px]:!grid-cols-1 min-[1030px]:!grid-cols-2"
              items={traits}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default OneOfOneReveal
