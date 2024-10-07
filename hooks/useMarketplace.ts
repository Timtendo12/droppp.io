import { useQueryCache } from './useQueryCache'

export const useMarketplace = () => {
  const { cache } = useQueryCache()

  const refreshCatalogItemListings = async (templateId: number) =>
    await cache.invalidate.catalogItemListingsQuery(templateId)

  const refreshCatalogItemDetail = async (templateId: number) =>
    await cache.invalidate.catalogItemDetailQuery(templateId)

  return {
    refreshCatalogItemListings,
    refreshCatalogItemDetail
  }
}
