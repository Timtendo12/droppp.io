import React from 'react'
import moment from 'moment'
// Helpers, Enum & API Hooks
import { CARD_TYPES } from '@/enum'
// Components
import Icon from '@/components/Icon'
import RoundedBox from '@/components/RoundedBox'
import FluidContainer from '@/components/FluidContainer'
import { FluidText } from '@/components/FluidText'
import { WalletOption } from '@/contexts/auth/types'
import { AvatarMedia } from '@/api/resources/shared/avatar'

////////////////////////////////////////////////////////////////////////////////
// Interface & Enum

interface Props {
  avatar: AvatarMedia
  wallet: WalletOption
}

enum WALLET_LABEL {
  BASIC = 'Basic Wax Address',
  CUSTOM = 'Custom Wax Address'
}

////////////////////////////////////////////////////////////////////////////////
// Components

export const WalletAddress = ({ wallet, avatar }: Props) => {
  // Setup ////////////////////////////////////////////////////////////////////////

  const { type, address, chain_url, date } = wallet
  const isBasic = type === CARD_TYPES.FREE
  const walletLabel = isBasic ? WALLET_LABEL.BASIC : WALLET_LABEL.CUSTOM

  // Render ///////////////////////////////////////////////////////////////////////

  return (
    <RoundedBox className="!bg-gray-800 !p-3">
      <div className="lg:grid lg:grid-cols-8 max-lg:text-center items-center gap-2 pb-2 mb-2 border-b border-gray-700 ">
        {avatar && (
          <div className="max-lg:mb-2 max-lg:mx-auto max-w-[103px] col-span-2 flex-shrink basis-[105px]">
            <div className="bg-black rounded-[25%]">
              <div
                className="aspect-1 rounded-[25%] bg-contain"
                style={{ backgroundImage: `url(${avatar.size2_url})` }}
              />
            </div>
          </div>
        )}
        <div className="col-span-6 flex-1 flex-shrink-0">
          <p className="max-lg:mb-half utility-sm text-gray-300">
            {walletLabel}
          </p>
          <FluidContainer targetWidth={320}>
            <FluidText
              min={20}
              targetSize={32}
              max={32}
              className="h3 normal-case"
            >
              {address}
            </FluidText>
          </FluidContainer>
        </div>
      </div>
      {chain_url && (
        <div className="flex flex-col gap-2 lg:gap-1">
          {date && (
            <WalletInfoItem
              property={'Created on'}
              value={moment(date).format('MMMM D, YYYY')}
            />
          )}
          <WalletInfoItem
            property="Transactions"
            value={
              <a
                href={chain_url}
                target="_blank"
                rel="noopener noreferrer"
                className="utility flex items-center text-blue--light"
              >
                <Icon name="blockchain" className="mr-1 h-[20px] w-[20px]" />
                View on blockchain
              </a>
            }
          />
        </div>
      )}
    </RoundedBox>
  )
}

const WalletInfoItem = ({ property, value }) => {
  return (
    <div className="flex max-lg:flex-col items-center justify-between">
      <span className="text-gray-300">{property}</span>
      <span className="body-sm">{value}</span>
    </div>
  )
}
