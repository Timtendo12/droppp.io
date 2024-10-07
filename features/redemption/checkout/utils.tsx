import {
  RedeemAsset,
  RedeemTemplate
} from '@/api/resources/redeem/assets/get/schema'
import { RedemptionOrderAssets } from './types'
import { SummaryLineType } from '@/api/resources/shared/order'

export const initializeOrderAssets = (
  templates: SummaryLineType[]
): RedemptionOrderAssets => {
  // get pop protector addon
  if (!templates) return null
  return templates.reduce((acc, { redeem_template_id, assets, addons }) => {
    acc[redeem_template_id] = {
      assets: assets.map(asset => asset.redeem_asset_id),
      // we only have one current addon
      addons: addons[0]?.qty
    }
    return acc
  }, {})
}

export const initializeCollectionAssets = (
  collection: RedeemAsset
): RedemptionOrderAssets => {
  if (!collection) return null
  return collection.templates.reduce((acc, { redeem_template_id, assets }) => {
    acc[redeem_template_id] = {
      assets: assets.map(asset => asset.redeem_asset_id),
      addons: 0
    }
    return acc
  }, {})
}

export const getAssetIdsFromOrder = (orderItems: RedemptionOrderAssets) => {
  if (!orderItems) return ''
  return Object.values(orderItems)
    .reduce((acc, { assets }) => [...acc, ...assets], [])
    .join()
}

export const getRedemptionAssetsQty = (templates: RedeemTemplate[]): number => {
  return templates.reduce(
    (accumulator, template) => accumulator + template.assets.length,
    0
  )
}
export const getSummaryAssetsQty = (templates: SummaryLineType[]): number => {
  return templates.reduce(
    (accumulator, template) => accumulator + template.assets.length,
    0
  )
}

export const getAddonsFromOrderAssets = (
  assets: RedemptionOrderAssets
): string => {
  if (!assets) return ''
  // in the future we may have more than one type of addon - Josh Dobson - 6/27/24
  const addonType: number = 1
  return Object.entries(assets)
    .reduce((acc, [redeem_template_id, { addons }]) => {
      if (!addons) return acc
      return [...acc, `${redeem_template_id}:${addonType}:${addons}`]
    }, [])
    .join(',')
}
