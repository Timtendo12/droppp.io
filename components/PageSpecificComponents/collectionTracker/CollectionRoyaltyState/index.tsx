import React from 'react'
import Icon from '@/components/Icon'
import { Collection } from '@/api/resources/user/tracker/drop/progress/get/schema'
import RoundedBox from '@/components/RoundedBox'
import Separator from '@/components/Separator'
interface Props {
  collection: Collection
  isPostRedemption: boolean
}

const CollectionRoyaltyState = ({ collection, isPostRedemption }: Props) => {
  const { completed_set_count, current_set_collected_count, drop_asset_count } =
    collection
  const totalPerc = `${
    Math.round(
      ((current_set_collected_count / drop_asset_count) * 100 +
        Number.EPSILON) *
        100
    ) / 100
  }%`

  return (
    <RoundedBox className="md:flex items-center !py-3 !rounded-2xl md:!rounded-[32px]">
      <div className="h6 leading-snug">
        Track your <br className="max-md:hidden" /> progress
      </div>
      <Separator className="h-7 mx-4 max-md:invisible" vertical />
      <div className="flex-1">
        <div className="h7">Royalty Set #{completed_set_count + 1}</div>
        <div className="flex items-center h-4 mt-1">
          <div className="w-full bg-gray-600 h-[10px] rounded-lg">
            <div
              className="bg-rarity-royalty h-[10px] rounded-lg relative"
              style={{ width: totalPerc }}
            >
              <div className="absolute translate-x-[50%] right-0 flex items-center justify-center bg-[#10385B] rounded-full w-4 h-4 border-[4px] border-rarity-royalty -top-[10px]">
                <Icon
                  size={16}
                  name={isPostRedemption ? 'funkoCrown' : 'diamond'}
                />
              </div>
            </div>
          </div>
          <div className="h5 ml-2">{totalPerc}</div>
        </div>
      </div>
    </RoundedBox>
  )
}

export default CollectionRoyaltyState
