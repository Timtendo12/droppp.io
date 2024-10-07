import classnames from 'classnames'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { MEDIA_SIZE } from '@/constants'
import { useLayoutData } from '@/contexts/layout'
import { Icon, CollectionMedia, Button } from '@/components'
import styles from './styles.module.scss'
import { MediaLoadingSkeleton } from '@/components/MediaLoadingSkeleton'
import classNames from 'classnames'
import { CollectionCard } from '@/api/resources/user/tracker/drop/progress/get/schema'
import { SEARCH_PARAMS } from '@/constants/searchParams'
import CatalogItemPrice from '@/components/ProductCard/Catalog/CatalogItemPrice'

interface Props {
  card: CollectionCard
  viewAsRedeemable?: Boolean
  mint_num?: string
}

// viewAsRedeemable is a optional prop pass to the redeemable sections.
// the mint_num is grabbed from the array of owned_mint_numbers and passed along with each card you may own

const CollectionCard = ({ card, viewAsRedeemable, mint_num }: Props) => {
  const { openCollectionDetail } = useLayoutData()
  const [isReady, setIsReady] = useState(false)
  const { query } = useRouter()
  const {
    id,
    is_collected,
    media,
    collected_count,
    name,
    rarity,
    listing_price
  } = card

  let active = query[SEARCH_PARAMS.ITEM] == id.toString()
  const showLowestPrice =
    !viewAsRedeemable &&
    !query.hide_lowest_prices &&
    listing_price !== undefined

  if (mint_num) {
    active = active && query.mint_num == mint_num
  }

  return (
    <div key={id}>
      <Button
        key={id}
        className={classnames(styles.cardWrapper, {
          [styles.needCollected]: isReady && !is_collected,
          'border !border-white': active
        })}
        theme="clean"
        onClick={() => openCollectionDetail(id, mint_num)}
      >
        {!isReady && (
          <div className={styles.loadingIndicator}>
            <MediaLoadingSkeleton />
          </div>
        )}

        <div
          className={classNames('transition-opacity', !isReady && 'opacity-0')}
        >
          <CollectionMedia
            alt={`${name} - ${rarity}`}
            size={MEDIA_SIZE.tiny}
            media={media[0]}
            onReady={() => setIsReady(true)}
          />
        </div>

        {isReady && !is_collected && (
          <Icon
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            name="need-collected"
          />
        )}
      </Button>

      {!!mint_num ? (
        <div className="text-xs flex justify-center items-center mt-1">
          #{mint_num}
        </div>
      ) : (
        <div
          className={classnames(
            'text-xs flex justify-center items-center mt-1',
            {
              'text-gray-300': !is_collected
            }
          )}
        >
          <Icon className="mr-[4px]" name="collected" />
          {collected_count}
        </div>
      )}
      {showLowestPrice && (
        <CatalogItemPrice
          className="!text-xs text-center mt-[6px]"
          listing_price={listing_price}
          isUniqueProduct={false}
          isCatalogAsset
          hideUpSuffix
        />
      )}
    </div>
  )
}

export default CollectionCard
