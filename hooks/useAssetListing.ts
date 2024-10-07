import { useGetUserAsset } from '@/api/resources/user/asset/get'
import { Toast } from '../components'
import { showModal } from '@/components/Modals/ModalV2'
import { MODAL_ID } from '@/constants/modalId'
import { VerifyType } from '@/components/Modals/ModalV2/content/verifyIdentity'
import { notifyPendingSnapshot } from '@/components/QueryErrorNotifier/notifiers/PendingSnapshot'
import { GoToType } from '@/hooks/useNavigation'

type UseAssetListingInput = {
  assetId: number
  isVerified: boolean
  goTo: GoToType
}

type UserAssetListingResult = {
  openListing: () => Promise<void>
}

const notifySalePending = () => {
  Toast({
    type: 'warning',
    title: 'This Sale is Currently Pending',
    description: 'Another user may be about to buy this listing.'
  })
}

export const useAssetListing = ({
  assetId,
  goTo,
  isVerified
}: UseAssetListingInput): UserAssetListingResult => {
  // This seems hacky, considered using fetchQuery from within `openListing`
  // but was worried it might circumvent our catch-all error handling.
  // We need some better patterns for the imperative cases, although they
  // are relatively infrequent. - Eric, Fri Nov 10 2023
  const { refetch } = useGetUserAsset(assetId.toString(), { enabled: false })

  const openListing = async () => {
    // check if the item is still pending before moving forward - Josh Dobson - 5/2/23
    // what should we do if the item is sold?
    const {
      data: { asset }
    } = await refetch()

    if (asset.drop_marketplace_disabled_snapshot) {
      notifyPendingSnapshot()
      return
    }

    if (asset.marketplace.status === 'pending') {
      notifySalePending()
      return
    }

    if (isVerified) {
      showModal(MODAL_ID.marketplace.listItem, { asset })
    } else {
      goTo.verifyIdentity(VerifyType.List)
    }
  }

  return { openListing }
}
