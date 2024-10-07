import { NonTransferableAssets } from '@/api/resources/user/assets/transfer/preview/schema'

export const getNonTransferableAssetsCount = (
  non_transferable_assets: NonTransferableAssets
) => {
  if (!non_transferable_assets.length) {
    return 0
  } else {
    const uniqueAssets = new Set()

    non_transferable_assets.forEach(category => {
      category.assets.forEach(asset => uniqueAssets.add(asset.id))
    })

    return uniqueAssets.size
  }
}
