import { useQueryClient } from '@tanstack/react-query'
import { catalogItemDetailQueryKey } from '@/api/resources/catalog/item/get'
import { collectionAssetQueryKey } from '@/api/resources/user/tracker/drop/asset/get'
import { catalogItemListingsQueryKey } from '@/api/resources/catalog/item/listings/get'

export const useQueryCache = () => {
  const queryClient = useQueryClient()

  const invalidateQueries = (key: any) => queryClient.invalidateQueries(key)

  const invalidate = {
    catalogItemDetailQuery: (chainTemplateId: number) =>
      invalidateQueries(catalogItemDetailQueryKey(chainTemplateId?.toString())),

    catalogItemListingsQuery: (chainTemplateId: number) =>
      invalidateQueries(
        catalogItemListingsQueryKey({
          chain_template_id: chainTemplateId?.toString()
        })
      ),

    collectionAssetQuery: (assetId: number) =>
      invalidateQueries(collectionAssetQueryKey(assetId?.toString()))
  }

  return {
    cache: { invalidate }
  }
}
