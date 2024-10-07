import _ from 'lodash'
import { useRouter } from 'next/router'
import React from 'react'
import { DROP_TYPES, RARITY_TYPES, TRACKER_SECTION_IDS } from '@/enum'
import { getDropType } from '@/util/dropHelpers'
import { RARITIES_GROUP } from '@/constants'
import {
  CollectionGroupCollapse,
  CollectionCardGroup,
  CollectionRedemptionDetail,
  CollectionRedeemablesGroup,
  CollectionRoyaltyState,
  MultiToggle,
  Icon,
  Loading
} from '@/components'
import { CollectionsItemType } from '@/api/resources/user/tracker/drops/get/schema'
import { COLLECTION_DETAIL_PARAMS } from '@/constants/searchParams'
import { useGetCollection } from '@/api/resources/user/tracker/drop/progress/get'
import { useAuth } from '@/contexts/auth'
import CollectionBanner from '../CollectionBanner'
import useNextQueryParams from '@/hooks/useNextQueryParams'
import useBreakpoints from '@/hooks/useBreakpoints'

interface Props {
  activeCollection: CollectionsItemType
}

const CollectionDetail = ({ activeCollection }: Props) => {
  const { selectedWallet } = useAuth()
  const router = useRouter()
  const { query } = router
  const { view, set } = useNextQueryParams<{ view: string; set: string }>()
  const { isMedium } = useBreakpoints(['md'])

  const { fallback, id: activeCollectionId } = activeCollection

  // If no view query param is provided, default to the tracker view on non fallback drops
  if (!fallback) {
    if (view === undefined) {
      query.view = COLLECTION_DETAIL_PARAMS.view.tracker
      query.set = COLLECTION_DETAIL_PARAMS.set.royalty
      query.collection_id = activeCollection.id.toString()
      router.replace(router, null, { scroll: false, shallow: true })
    }
    // if accessing a normal collection and the set is catalog and the view is tracker, update the set to royalty
    if (
      view === COLLECTION_DETAIL_PARAMS.view.tracker &&
      set !== COLLECTION_DETAIL_PARAMS.set.royalty
    ) {
      query.set = COLLECTION_DETAIL_PARAMS.set.royalty
      router.replace(router, null, { scroll: false, shallow: true })
    }
  }
  // always update set to catalog on fallback collections
  else if (fallback && set !== COLLECTION_DETAIL_PARAMS.set.catalog) {
    query.set = COLLECTION_DETAIL_PARAMS.set.catalog
    router.replace(router, null, { scroll: false, shallow: true })
  }

  // Fallback collections always override the view to always be catalog but not stored in the URL
  const activeView = fallback
    ? COLLECTION_DETAIL_PARAMS.view.catalog
    : view?.toString()

  // LOAD DETAIL COLLECTION
  const { data: collectionData, isLoading } = useGetCollection(
    query,
    set,
    activeCollectionId?.toString(),
    selectedWallet?.address,
    {
      enabled: !!activeCollectionId,
      keepPreviousData: true
    }
  )

  if (isLoading) {
    return <Loading size="large" />
  }

  const {
    progress: collection,
    progress: { cards, exclusive, collected_rarity_counts }
  } = collectionData
  const dropType = getDropType(activeCollection)

  const handleToggleView = value => {
    router.query.view = value
    router.query.set =
      value === COLLECTION_DETAIL_PARAMS.view.tracker
        ? COLLECTION_DETAIL_PARAMS.set.royalty
        : COLLECTION_DETAIL_PARAMS.set.catalog
    router.replace(router, null, { scroll: false, shallow: true })
  }

  const renderFullSet = () => {
    const packs = cards.filter(card => card.openable)
    const cardsByCategory = _.groupBy(
      cards.filter(card => !card.openable),
      card => card.rarity
    )
    let redeemables = cards.filter(
      card => card.rarity === RARITY_TYPES.Redeemable
    )

    if (dropType !== DROP_TYPES.POST_TOKEN) {
      redeemables = redeemables.filter(card => card.collected_count)
    }

    return (
      <>
        {!!redeemables.length && dropType !== DROP_TYPES.PRE_TOKEN && (
          <CollectionGroupCollapse
            id={TRACKER_SECTION_IDS.REDEMPTION_TOKENS}
            title="Redemption Tokens"
            disabled
          >
            <CollectionCardGroup
              rarity={RARITY_TYPES.Redeemable}
              redeemable={dropType !== DROP_TYPES.POST_REDEMPTION_DEADLINE}
              items={redeemables}
            />
          </CollectionGroupCollapse>
        )}
        {!!packs && !!packs.length && (
          <CollectionGroupCollapse
            id={TRACKER_SECTION_IDS.PACKS}
            title="Packs"
            disabled
          >
            <CollectionCardGroup items={packs} />
          </CollectionGroupCollapse>
        )}
        <CollectionGroupCollapse
          id={TRACKER_SECTION_IDS.COLLECTIBLES}
          title="Collectibles"
          disabled
        >
          {RARITIES_GROUP.collectibles.map(rarity => (
            <CollectionCardGroup
              key={rarity}
              rarity={rarity}
              dropType={dropType}
              redeemable={dropType === DROP_TYPES.PRE_TOKEN}
              items={cardsByCategory[rarity]}
            />
          ))}
        </CollectionGroupCollapse>
      </>
    )
  }

  const renderRoyaltySet = () => {
    const cardsByRarity = _.groupBy(cards, card => card.rarity)
    return (
      <div className="space-y-4">
        <CollectionGroupCollapse
          id={TRACKER_SECTION_IDS.ROYALTY_SET}
          title="Royalty Set"
        >
          <CollectionRoyaltyState
            collection={collection}
            isPostRedemption={dropType === DROP_TYPES.POST_REDEMPTION_DEADLINE}
          />
          <div className="mt-3">
            {RARITIES_GROUP.royalty.map(rarity => (
              <CollectionCardGroup
                key={rarity}
                groupId={3}
                dropType={dropType}
                viewAsCatalog={false}
                rarity={rarity}
                items={cardsByRarity[rarity]}
              />
            ))}
          </div>
        </CollectionGroupCollapse>
        {dropType === DROP_TYPES.PRE_TOKEN && (
          <CollectionGroupCollapse
            id={TRACKER_SECTION_IDS.REDEEMABLES}
            title="Redeemables"
          >
            {RARITIES_GROUP.redeemables
              .filter(rarity => collected_rarity_counts?.[rarity] !== undefined)
              .map(rarity => {
                return (
                  <CollectionRedeemablesGroup
                    key={rarity}
                    rarity={rarity}
                    items={cardsByRarity[rarity]}
                  />
                )
              })}
          </CollectionGroupCollapse>
        )}
      </div>
    )
  }

  const renderContent = (activeView: string) => {
    if (activeView === COLLECTION_DETAIL_PARAMS.view.tracker) {
      const {
        redeem_start_date: redeemStartDate,
        redeem_end_date: redeemEndDate,
        hover_color: hoverColor
      } = activeCollection
      return (
        <>
          <CollectionRedemptionDetail
            dropType={dropType}
            redeemStartDate={redeemStartDate}
            redeemEndDate={redeemEndDate}
            hoverColor={hoverColor}
            collection={collection}
          />
          {renderRoyaltySet()}
        </>
      )
    }

    return renderFullSet()
  }

  const royaltyTrack =
    dropType === DROP_TYPES.POST_TOKEN ||
    dropType === DROP_TYPES.POST_REDEMPTION_DEADLINE

  const views = {
    [COLLECTION_DETAIL_PARAMS.view.tracker]: {
      label: `${royaltyTrack ? 'Royalty' : 'Redemption'} Tracker`,
      value: COLLECTION_DETAIL_PARAMS.view.tracker
    },
    [COLLECTION_DETAIL_PARAMS.view.catalog]: {
      label: 'Catalog',
      value: COLLECTION_DETAIL_PARAMS.view.catalog
    }
  }

  return (
    <div className="relative w-full min-h-screen space-y-4 pb-12">
      <CollectionBanner collection={activeCollection} />

      {!isMedium && dropType === DROP_TYPES.MINI_AND_PROMO ? null : (
        <div className="flex items-center">
          {isMedium && (
            <div className="min-w-0 flex-1">
              <h5 className="h8 text-gray-300 mb-[6px]">Collection Tracker</h5>
              <div className="flex items-center">
                <h1 className="h5 truncate">{collection.name}</h1>
                {exclusive && (
                  <Icon name="exclusiveBadge" className="ml-1" size={20} />
                )}
              </div>
            </div>
          )}

          {dropType !== DROP_TYPES.MINI_AND_PROMO && (
            <div className="flex-1 md:flex-none">
              <MultiToggle
                items={Object.values(views)}
                value={activeView}
                onToggle={handleToggleView}
              />
            </div>
          )}
        </div>
      )}
      {renderContent(activeView)}
    </div>
  )
}

export default CollectionDetail
