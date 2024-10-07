import { isNull, uniqBy } from 'lodash'
import { isPfp } from '@/api/resources/shared/drop'
import { Rarity } from '@/api/resources/shared/rarity'
import { RARITY_REDEEMABLE_TYPES, RARITY_TYPES } from '@/enum'
import { Asset } from '@/api/resources/asset/get/schema'
import { AssetLike } from '@/components/ProductCard'
import { mediaNameEnum } from '@/api/resources/shared/media'
import { DROPPP_MONSTERS_ID } from '@/constants'
import { SizeZeroMedia } from '../api/resources/shared/media'
import { isIn } from './typeHelper'
import { PACK_TYPE } from '@/api/resources/shared/asset'

export const isOneOfOne = (rarity: Rarity) => {
  return rarity === RARITY_TYPES['1 of 1']
}

export const isRedeemable = (rarity: Rarity) => {
  return rarity === RARITY_TYPES.Redeemable
}

export const isItemRedeemable = (
  item: { redeem_start_date?: string },
  rarity: Rarity
) => {
  return (
    item.redeem_start_date &&
    RARITY_REDEEMABLE_TYPES.some(type => type === rarity)
  )
}

export const isUniqueProduct = (product: {
  rarity?: Rarity
  drop_type?: number
}) => {
  return (
    isOneOfOne(product.rarity) || (isPfp(product) && !isNull(product.rarity))
  )
}

export const isMonsterProduct = (dropId: number) => {
  return dropId === DROPPP_MONSTERS_ID
}

export const getOwnerAddress = (assets: Asset[]) => {
  return uniqBy(assets, asset => asset.owner).map(({ owner }) => owner)
}

export const currencyAndUpSuffix = (
  isUniqueProduct: boolean,
  availableListingCount?: number
): string =>
  `USDC ${
    !isUniqueProduct &&
    (availableListingCount !== undefined ? availableListingCount > 1 : true)
      ? ' & UP'
      : ''
  }`
export interface GroupedAsset {
  id: number
  drop_id: number
  drop_type: number
  label: string
  media: SizeZeroMedia
  items: { id: number; mint_num: number }[]
}

export function groupByInventories(arr, criteria): GroupedAsset[] {
  const newObj = arr.reduce(function (acc, currentValue) {
    if (!acc[currentValue[criteria]]) {
      acc[currentValue[criteria]] = []
    }
    acc[currentValue[criteria]].push(currentValue)
    return acc
  }, {})

  const mapObject = Object.keys(newObj).map(key => {
    const item = newObj[key][0]
    const { name, openable, rarity, variant, media, id, drop_id, drop_type } =
      item

    // Catch the case where variants are null
    const newVariant = variant ? variant : ''
    let label = openable ? name : `${name} - ${rarity} ${newVariant}`
    label = label.trim()

    return {
      id,
      drop_id,
      drop_type,
      label: label,
      media: media[0],
      items: newObj[key]
    }
  })
  return mapObject
}

export const getRedeemActiveAssets = (template, excludedAssets) => {
  const { assets, redeem_template_id } = template

  if (!excludedAssets[redeem_template_id]) {
    return assets
  }
  const activeAssets = assets.filter(
    ({ redeem_asset_id }) =>
      !excludedAssets[redeem_template_id].includes(redeem_asset_id)
  )
  return activeAssets
}

export const getRedeemTotalAssets = (redeem, excludedAssets) => {
  const totalAssets = []
  redeem?.templates.forEach(template => {
    const assets = getRedeemActiveAssets(template, excludedAssets)
    totalAssets.push(...assets)
  })
  return totalAssets
}

export const shouldProductShowTimeline = (product: {
  rarity?: Rarity
  redeem_start_date?: string
  name?: string
}) => {
  return (
    isItemRedeemable(product, product.rarity) || isIn(PACK_TYPE, product.name)
  )
}

export const isFullWidthProductMedia = (asset: AssetLike): boolean => {
  const { rarity, attributes, media } = asset
  const _rarity = rarity || attributes?.rarity
  const mediaAsset = media[0]
  return (
    mediaAsset.name === mediaNameEnum.enum.img &&
    _rarity !== undefined &&
    _rarity !== RARITY_TYPES.Redeemable &&
    _rarity !== RARITY_TYPES.Series &&
    mediaAsset.size0_height === mediaAsset.size0_width
  )
}
