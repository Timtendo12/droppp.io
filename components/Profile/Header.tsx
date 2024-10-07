import Image from 'next/legacy/image'
import React, { useState } from 'react'
import { dateToLocal } from '@/util/timeHelpers'
import { Icon, ModalEditProfile } from '..'
import CircleIconLink from '@/components/CircleIconLink'
import SocialShareMenu from '@/components/SocialShareMenu'
import ProfileStickyHeader from './ProfileStickyHeader'
import ProfileStat from './ProfileStat'
import { ProfileGetResponse } from '@/api/resources/profile/schema'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { pluralize } from '@/util/stringHelpers'
import { useAuth } from '@/contexts/auth'
import { useGetAssets } from '@/api/resources/assets/get'
import TooltipMPValueDisclaimer from '../PageSpecificComponents/marketplace/TooltipMPValueDisclaimer'
import { useAssetsValue } from '@/api/resources/assets/value/get'
import { formatUSDC } from '@/util/currencyHelpers'

interface IProps {
  className?: string
  profile: ProfileGetResponse
}

export default function Profile({ profile, className }: IProps) {
  const { user } = useAuth()
  const { replace: replaceUrl, query, asPath } = useRouter()
  const { data } = useGetAssets(
    { account: profile.account.toString(), ...query },
    !!profile
  )
  const { data: assetsValue } = useAssetsValue(profile.account.toString(), {
    enabled: !!profile
  })

  // @ts-expect-error - related to infinite query not passing back type
  const { filtered_count } = data || {}
  const { inventory_value } = assetsValue || {}

  // checks for a parameter to automatically open the avatar selector
  const [openProfileModal, setOpenProfileModal] = useState(() => {
    let openByDefault = 'set-avatar' in query

    // since the set-avatar flag is present, replace the URL to
    // remove the flag
    if (openByDefault) {
      const url = asPath.replace('set-avatar', '')
      replaceUrl(url)
    }

    // set it the avatar selector is opened already
    return !!user && openByDefault
  })
  const {
    account,
    is_owner,
    media,
    join_date,
    stat,
    chain_url,
    kyc_completed
  } = profile
  const { legendary, grail, redeemed, royalty_set, mythic, ultra } = stat.user
  const avatar = media?.avatar_media?.size0_url
  const sticker = media?.sticker_media?.size4_url

  const closeEditModal = () => {
    setOpenProfileModal(false)
  }

  return (
    <>
      <div className={classNames('px-2 lg:pl-15 md:mb-4', className)}>
        <div
          className="absolute w-full left-0 right-0 h-[240px] -z-[1]"
          style={{
            background: 'linear-gradient(180deg, #242424 0%, #090909 100%)'
          }}
        />
        <div className="relative w-[150px] h-[150px] md:w-[232px] md:h-[232px] mt-8 md:mt-10 rounded-[48px] md:rounded-[64px] bg-gray-800 inline-block">
          {sticker && (
            <div className="absolute top-[-34px] right-[-29px] md:top-[-47px] md:right-[-47px] w-full max-w-[108px] md:max-w-[154px] aspect-[1/1] z-10 rotate-12">
              <Image
                src={sticker}
                layout="fill"
                alt="sticker"
                style={{
                  filter: 'drop-shadow(5px 5px 5px rgba(9, 9, 9, 0.5))'
                }}
              />
            </div>
          )}
          {avatar && (
            <button
              className="group"
              onClick={() => setOpenProfileModal(true)}
              disabled={!is_owner}
            >
              <Image
                src={avatar}
                layout="fill"
                objectFit="contain"
                alt={account}
                className="rounded-[48px] md:rounded-[64px]"
              />
              {is_owner && (
                <div className="absolute right-2 bottom-2 md:bottom-3 md:right-3 flex justify-center items-center border-0 w-4 h-4 md:w-6 md:h-6 bg-black/80 group-hover:bg-gray-700/80 rounded-3xl">
                  <Icon name="edit" className="max-md:w-[14px]" />
                </div>
              )}
            </button>
          )}
        </div>
        <div className="flex mt-3 gap-1">
          <h1 className="h2 md:h1">{account}</h1>
          {kyc_completed && (
            <Icon className="mt-[9px] max-md:w-[18px]" name="verified" />
          )}
        </div>
        <p className="body md:body-lg text-gray-400 mt-2">
          Joined on {dateToLocal({ date: join_date, format: 'MMM D, YYYY' })}
        </p>
        <div className="flex gap-3 mt-3">
          <SocialShareMenu />
          <CircleIconLink name="blockchain" url={chain_url} />
        </div>

        <div className="inline-grid md:flex grid-cols-2 md:grid-cols-4 gap-x-[59px] gap-y-3 md:gap-4 mt-3">
          <ProfileStat
            className="col-span-2"
            value={inventory_value && formatUSDC(inventory_value, 2, 2)}
            label={<TooltipMPValueDisclaimer label="Est. Collection Value" />}
            isUSDC
          />
          <ProfileStat
            value={redeemed}
            label={pluralize('Redemption', redeemed)}
          />
          <ProfileStat value={mythic} label={pluralize('Mythic', mythic)} />
          <ProfileStat value={grail} label={pluralize('Grail', grail)} />
          <ProfileStat
            value={legendary}
            label={pluralize('Legendary', legendary)}
          />
          <ProfileStat value={ultra} label={pluralize('Ultra', ultra)} />
          <ProfileStat
            value={royalty_set}
            label={pluralize('Royalty Set', royalty_set)}
          />
        </div>
      </div>
      <ProfileStickyHeader
        account={account}
        avatar={avatar}
        count={filtered_count}
      />
      {openProfileModal && (
        <ModalEditProfile
          account={account}
          profileMedia={media.avatar_media}
          open={openProfileModal}
          onClose={closeEditModal}
        />
      )}
    </>
  )
}
