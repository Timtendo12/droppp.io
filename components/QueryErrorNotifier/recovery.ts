import { useEffect } from 'react'
import { ApiError, isApiError } from '@/api/core/errors'
import { useInventory } from '@/hooks/useInventory'
import {
  assetIdFromQueryKey,
  path as userAssetGetPath
} from '@/api/resources/user/asset/get'

export function useQueryErrorRecovery(error: unknown): void {
  const { removeAssets } = useInventory()

  const attemptAssetErrorRecovery = (apiError: ApiError) => {
    const request = apiError.request

    if (request?.url === userAssetGetPath && request.queryKey) {
      const assetId = assetIdFromQueryKey(request.queryKey)
      if (assetId) {
        removeAssets([assetId])
      }
    }
  }

  const recover = (error: unknown) => {
    if (isApiError(error)) {
      attemptAssetErrorRecovery(error)
    }
  }

  useEffect(() => recover(error), [error])
}
