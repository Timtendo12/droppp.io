import { AssetAttributes } from '@/api/resources/shared/assetAttributes'

export const isActiveInventoryItem = (
  assetId: number,
  searchParam: string | string[]
): boolean => assetId === Number(searchParam)

export const getAssetName = (
  name: string,
  attributes: AssetAttributes
): string => {
  return attributes.variant ? `${name} - ${attributes.variant}` : name
}

export const isTransferring = (chainStatus: string): boolean => {
  return chainStatus !== 'final'
}
