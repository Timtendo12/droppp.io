import React from 'react'
import NiceModal from '@ebay/nice-modal-react'
import { MODAL_ID } from '@/constants/modalId'
import DefaultModal from '.'
import { AssetType } from '@/api/resources/shared/asset'
import Icon from '@/components/Icon'
import { isMpEnabled } from '@/util'

export type ContentDisplayMode = 'buy' | 'sell'

const generateContent = (contentDisplayMode: ContentDisplayMode) => {
  switch (contentDisplayMode) {
    case 'buy':
      return {
        title: `${isMpEnabled() ? 'Other' : ''} Marketplace Options`,
        subtitle: `This item may be for sale on ${
          isMpEnabled() ? 'other' : ''
        } WAX-based marketplaces. If you make a purchase outside of Droppp, you can still transfer your items back to your Droppp account and manage your collection in one place!`
      }
    case 'sell':
      return {
        title: `Other Marketplace Options`,
        subtitle: `Explore other WAX-based marketplaces that have listings for this item.`
      }
  }
}

const Marketplaces = [
  {
    id: 'atomichub',
    name: 'Atomichub',
    icon: 'atomichub'
  },
  {
    id: 'nfthive',
    name: 'NFTHive',
    icon: 'nfthive'
  },
  {
    id: 'neftyblocks',
    name: 'NeftyBlocks',
    icon: 'neftyblocks'
  },
  {
    id: 'chainchamps',
    name: 'ChainChamps',
    icon: 'chainchamps'
  }
]

interface OtherMarketplaceOptionsModalProps {
  asset: AssetType
  contentDisplayMode: ContentDisplayMode
}

const OtherMarketplaceOptionsModal = NiceModal.create(
  ({
    asset,
    contentDisplayMode = 'buy'
  }: OtherMarketplaceOptionsModalProps) => {
    const hideModal = () => NiceModal.hide(MODAL_ID.otherMarketplaceOptions)

    const marketplaces = Marketplaces.map(marketplace => {
      const url = asset[`${marketplace.id}_url`]
      return url ? (
        <MarketOption
          key={marketplace.id}
          marketplace={marketplace}
          onClick={hideModal}
          url={url}
        />
      ) : null
    })

    const content = generateContent(contentDisplayMode)

    return (
      <DefaultModal id={MODAL_ID.otherMarketplaceOptions} title={content.title}>
        <div className="flex flex-col gap-2">
          <div className="body-base text-gray-400">{content.subtitle}</div>
          <hr className="-mx-3 block border-gray-700 md:border-gray-900 my-1" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {marketplaces}
          </div>
        </div>
      </DefaultModal>
    )
  }
)

interface MarketOptionProps {
  marketplace: {
    name: string
    icon: string
  }
  url: string
  onClick: () => void
}

function MarketOption({ marketplace, url, onClick }: MarketOptionProps) {
  const { name, icon } = marketplace

  return (
    <a
      href={url}
      rel="noreferrer noopener"
      target="_blank"
      onClick={onClick}
      className="bg-gray-700 rounded-2xl py-1 !h-auto card--hover cursor-pointer"
    >
      <div className="flex flex-col items-center">
        <div className="py-1">
          <Icon name={icon} size={34} />
        </div>
        <div className="uppercase text-white text-[11px] font-bold">{name}</div>
      </div>
    </a>
  )
}

export default OtherMarketplaceOptionsModal
