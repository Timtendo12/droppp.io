import moment, { Moment } from 'moment'
import { dateToMoment, isOnOrBeforeNow } from './time'
import {
  DROP_TYPES,
  DynamicDropState,
  DropState,
  DROP_NO_LISTING_TYPES
} from '@/enum'
import { DROP_PAGE_TARGET } from '@/constants/drops'
import { isMonsterProduct, isOneOfOne } from './assetHelpers'
import { Drop } from '@/types/drop'
import { timeDifference } from '@/util/timeHelpers'
import { Rarity } from '@/api/resources/shared/rarity'
import { NextPageContext } from 'next'
import { QueryClient } from '@tanstack/react-query'
import { catalogQueryKey, getCatalog } from '@/api/resources/catalog/get'
import { serverQueryContext } from '@/api/core/query/options'
import { DropManager } from '@/services/dropManager'

export function hasMythicRarity(drop: Drop) {
  return drop.additionalRarities?.includes('Mythic')
}

export function raritiesIncludeMythic(rarities: Rarity[]) {
  return rarities?.includes('Mythic')
}
export function raritiesIncludeUltra(rarities: Rarity[]) {
  return rarities?.includes('Ultra')
}

export function hasUltraRarity(drop: Drop) {
  return drop.additionalRarities?.includes('Ultra')
}

export const isDropLaunched = (drop: Drop) => {
  return (
    isDropStatePostSale(drop.state as DropState) ||
    isOnOrBeforeNow(drop.time_launch)
  )
}

export const isDropPostSnapshot = (drop: Drop) => {
  return isOnOrBeforeNow(drop.redeem_start_date)
}

export const isDropPostRedemption = (drop: Drop) => {
  return isOnOrBeforeNow(drop.redeem_end_date)
}

export const isDropShipping = (drop: Drop) => {
  return (
    drop.redeem_ship_date !== undefined &&
    isOnOrBeforeNow(drop?.redeem_ship_date)
  )
}

export const isDropPostShipping = (drop: Drop) => {
  return (
    drop.redeem_ship_date !== undefined &&
    isOnOrBeforeNow(drop.redeem_ship_date)
  )
}

export function getDropType(collection) {
  const { redeem_start_date, redeem_end_date } = collection || {}

  if (redeem_start_date) {
    if (moment().isBefore(moment.utc(redeem_start_date))) {
      return DROP_TYPES.PRE_TOKEN
    } else if (
      moment().isBetween(
        moment.utc(redeem_start_date),
        moment.utc(redeem_end_date)
      )
    ) {
      return DROP_TYPES.POST_TOKEN
    } else if (
      redeem_end_date &&
      moment.utc(redeem_end_date).isBefore(moment())
    ) {
      return DROP_TYPES.POST_REDEMPTION_DEADLINE
    }
  }

  return DROP_TYPES.MINI_AND_PROMO
}

export const isPostDropSale = (dynamicDropState: DynamicDropState) => {
  return [
    DynamicDropState.PostPackSale,
    DynamicDropState.PostTokenDrop,
    DynamicDropState.PostRedemption,
    DynamicDropState.PostShipping
  ].includes(dynamicDropState)
}

export const isDropStatePostSale = (dropState: DropState) => {
  return [DropState.SaleEnded, DropState.SoldOut].includes(dropState)
}

export function getDynamicDropState(drop) {
  if (
    [
      DropState.AnnounceFull,
      DropState.AnnounceLiteMystery,
      DropState.AnnounceLiteUltra,
      DropState.AnnounceFullCatalogEnabled
    ].includes(drop.state)
  ) {
    return DynamicDropState.Announce
  } else if (
    [DropState.SaleEnded, DropState.SoldOut].includes(drop.state) &&
    moment().isBefore(moment.utc(drop.redeem_start_date))
  ) {
    return DynamicDropState.PostPackSale
  } else if ([DropState.SaleEnded, DropState.SoldOut].includes(drop.state)) {
    if (
      drop.redeem_ship_date &&
      dateToMoment(drop.redeem_ship_date).isBefore(moment())
    ) {
      return DynamicDropState.PostShipping
    } else if (
      moment().isBetween(
        moment.utc(drop.redeem_start_date),
        moment.utc(drop.redeem_end_date)
      )
    ) {
      return DynamicDropState.PostTokenDrop
    }
  }
  return DynamicDropState.PostRedemption
}

export function showDropStatusIndicator(date1: Moment, date2: Moment) {
  let now = dateToMoment()

  // if now is between d1 and d2
  if (
    Math.floor(moment.duration(now.diff(date1)).asSeconds()) > 0 &&
    Math.floor(moment.duration(now.diff(date2)).asSeconds()) < 0
  ) {
    if (Math.floor(moment.duration(date2.diff(date1)).asSeconds()) > 0) {
      return true
    } else {
      return false
    }
  }

  return false
}

export function dropPageTargetUrl(
  dropPageTarget: DROP_PAGE_TARGET,
  url: string
) {
  switch (dropPageTarget) {
    case DROP_PAGE_TARGET.shop:
      return `${url}/shop`
    case DROP_PAGE_TARGET.physicals:
      return `${url}/physicals`
    default:
      return url
  }
}

export function getDropNoListingType(drop) {
  const { drop_id, rarity, collected_count } = drop
  if (isMonsterProduct(drop_id)) {
    return !collected_count
      ? DROP_NO_LISTING_TYPES.IN_CRATE
      : DROP_NO_LISTING_TYPES.NOT_FOR_SALE
  }
  if (isOneOfOne(rarity)) {
    return !collected_count
      ? DROP_NO_LISTING_TYPES.NOT_COLLECTED
      : DROP_NO_LISTING_TYPES.NOT_FOR_SALE
  }
  return DROP_NO_LISTING_TYPES.NO_LISTINGS
}

export function sortDropsByLaunchDate(
  drops: Drop[],
  announcementDuration: moment.Duration = moment.duration(8, 'hours')
): any[] {
  return drops.sort((a, b) => {
    const now = moment()
    const announcementDurationInSeconds = announcementDuration.as('seconds')
    const aTimeAnnounce = moment.utc(a.time_announce)
    const bTimeAnnounce = moment.utc(b.time_announce)

    let aTimeAnnounceBeforeNow = timeDifference(now, aTimeAnnounce)
    let bTimeAnnounceBeforeNow = timeDifference(now, bTimeAnnounce)

    // First ensure that any drop that has a state of `SaleContinued`, `SoldOut`,
    // or `SaleEnded` gets pushed to the bottom of the list.
    if (
      [
        DropState.SaleContinued,
        DropState.SaleEnded,
        DropState.SoldOut
      ].includes(a.state as DropState)
    ) {
      return 1
    } else if (
      [
        DropState.SaleContinued,
        DropState.SaleEnded,
        DropState.SoldOut
      ].includes(b.state as DropState)
    ) {
      return -1
    }

    // Both `a` and `b` have an announcement time defined.
    if (
      aTimeAnnounceBeforeNow !== undefined &&
      bTimeAnnounceBeforeNow !== undefined
    ) {
      // If a's announcement is newer than b's announcement, set
      // `bTimeAnnounceBeforeNow` to undefined so that a's will be considered
      // below. Do the opposite if b's announcement is newer than a's.
      if (aTimeAnnounceBeforeNow < bTimeAnnounceBeforeNow) {
        bTimeAnnounceBeforeNow = undefined
      } else if (bTimeAnnounceBeforeNow < aTimeAnnounceBeforeNow) {
        aTimeAnnounceBeforeNow = undefined
      }
    }

    // If `aTimeAnnounceBeforeNow` is defined, verify that it occurred
    // within announcementDurationInSeconds before now. If it did, return -1
    // to indicate that `a` should appear before `b`.
    if (
      aTimeAnnounceBeforeNow !== undefined &&
      aTimeAnnounceBeforeNow < announcementDurationInSeconds
    ) {
      return -1
    }

    // If `bTimeAnnounceBeforeNow` is defined, verify that it occurred
    // within announcementDurationInSeconds before now. If it did, return 1
    //to indicate that `b` should appear before `a`.
    if (
      bTimeAnnounceBeforeNow !== undefined &&
      bTimeAnnounceBeforeNow < announcementDurationInSeconds
    ) {
      return 1
    }

    // Neither `a` or `b` have an announcement time defined or they do but
    // none of their announcement times occurred within `announcementDurationInSeconds`
    // before now, so order based on their `time_launch` values.
    return moment(a.time_launch) > moment(b.time_launch) ? 1 : -1
  })
}

export const getDropFromUrl = async (
  dropManager: DropManager,
  nextPageContext: NextPageContext
): Promise<Drop> => {
  const { id, name } = nextPageContext.query
  const drops = await dropManager.refresh(
    (drop: Drop) =>
      drop.id == Number(id) &&
      ![DropState.AnnounceLiteUltra].includes(drop.state as DropState) &&
      drop.urlName === name
  )
  let drop: Drop = drops[0]

  return drop
}

export const getMergedDrop = async (
  drop: Drop,
  nextPageContext: NextPageContext
) => {
  const queryClient = new QueryClient()

  try {
    const { drop: apiDrop } = await queryClient.fetchQuery(
      catalogQueryKey(drop.id.toString()),
      queryContext =>
        getCatalog(
          drop.id.toString(),
          serverQueryContext(queryContext, nextPageContext)
        )
    )

    delete apiDrop.time_launch
    delete apiDrop.redeem_start_date
    delete apiDrop.redeem_end_date

    drop = { ...drop, ...apiDrop }

    apiDrop.openable.forEach((pack, index) => {
      drop.openables.items[index] = { ...pack, ...drop.openables.items[index] }
    })

    drop = { ...drop, ...apiDrop }
  } catch (e) {
    drop.drop_marketplace_disabled_primary = true

    // eslint-disable-next-line no-console
    console.log('Drop not fetched', e.originalResponse.errorNotFound)
  }

  return drop
}
