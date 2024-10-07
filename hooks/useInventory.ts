import { useRouter } from 'next/router'
import { useQueryClient } from '@tanstack/react-query'
import { path as userAssetsGetPath } from '@/api/resources/user/assets/get'
import { assetQueryKey } from '@/api/resources/user/asset/get'
import { collectionAssetQueryKey } from '@/api/resources/user/tracker/drop/asset/get'
import { trackerDropProgressQueryKey } from '@/api/resources/user/tracker/drop/progress/get'
import { useAuth } from '@/contexts/auth'
import { hideModal, showModal } from '@/components/Modals/ModalV2'
import { MODAL_ID } from '@/constants/modalId'
import { isPendingSnapshotError } from '@/api/core/errors'
import { notifyPendingSnapshot } from '@/components/QueryErrorNotifier/notifiers/PendingSnapshot'
import {
  checkAssetStatus,
  checkAssetStatusQueryKey
} from '@/api/resources/user/asset/open/check'

export type UseInventoryResult = {
  removeAssets: (assetIds: number[]) => void
  refreshAssets: () => void
  openAsset: (assetId: number, openUrl?: string) => Promise<void>
}

const ITEM_QUERY_KEY_FUNCTIONS = [assetQueryKey, collectionAssetQueryKey]

export function useInventory(): UseInventoryResult {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { selectedWallet } = useAuth()

  const refreshAssets = () => {
    const { query } = router

    // invalidate any active item query
    if (query.item) {
      const item = query.item.toString()

      ITEM_QUERY_KEY_FUNCTIONS.forEach(queryKey => {
        queryClient.invalidateQueries(queryKey(item)).then()
      })
    }

    // collection tracker active drop
    if (query.collection_id) {
      const queryKey = trackerDropProgressQueryKey(
        query,
        query.set.toString(),
        query.collection_id.toString(),
        selectedWallet.address
      )
      queryClient.invalidateQueries(queryKey).then()
    }

    // refresh user assets
    queryClient.invalidateQueries([userAssetsGetPath]).then()
  }

  const removeAssets = (assetIds: number[]) => {
    const { query } = router

    assetIds.forEach((assetId: number) => {
      if (query.item === assetId.toString()) {
        delete query.item
        router.replace({ query }).then()
      }

      const userAssetQueryKey = assetQueryKey(assetId.toString())
      queryClient.removeQueries(userAssetQueryKey)
    })

    queryClient.invalidateQueries([userAssetsGetPath]).then()
  }

  const openAsset = async (assetId: number, openUrl?: string) => {
    if (openUrl) {
      showModal(MODAL_ID.unsupportedPackOpen, {
        onRequestOpenLegacy: () => {
          hideModal(MODAL_ID.unsupportedPackOpen)
          window.open(openUrl)
        }
      })
      return
    }

    let statusError = null

    try {
      await queryClient.fetchQuery(
        checkAssetStatusQueryKey(assetId.toString()),
        context => checkAssetStatus(assetId.toString(), context),
        { retry: false }
      )
    } catch (err) {
      statusError = err
    }

    if (isPendingSnapshotError(statusError)) {
      notifyPendingSnapshot()
      return
    }

    await router.push(`/inventory/${assetId}`)
  }

  return { removeAssets, refreshAssets, openAsset }
}
