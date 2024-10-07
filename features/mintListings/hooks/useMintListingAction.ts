import { useState } from 'react'
import * as Sentry from '@sentry/nextjs'
import { ButtonTheme } from '@/components/Button'
import { MintListingItem } from '@/api/resources/catalog/item/listings/get/types'
import { useAssetListing } from '@/hooks/useAssetListing'
import { VerifyType } from '@/components/Modals/ModalV2/content/verifyIdentity'
import { useReserveListing } from '@/hooks/useReserveListing'
import Toast, { ToastCallbackAction } from '@/components/Toast'
import { numberWithCommas } from '@/util/numberHelpers'
import { useMintListingsContext } from '../MintListingsProvider'
import { debounce } from '@/util/functionHelpers'
import { isTest } from '@/config'
import { isApiError, isPendingSnapshotError } from '@/api/core/errors'
import { hideModal } from '@/components/Modals/ModalV2'
import { MODAL_ID } from '@/constants/modalId'
import { getListing } from '@/api/resources/user/listing/get'
import { notifyPendingSnapshot } from '@/components/QueryErrorNotifier/notifiers/PendingSnapshot'

type MintListingAction = {
  theme?: ButtonTheme
  disabled?: boolean
  label?: string
  loading?: boolean
  perform?: () => void | Promise<void | unknown>
}

type UseMintListingActionInput = {
  listing: MintListingItem
}

type UseMintListingActionResult = {
  listingAction: MintListingAction
}

const LISTING_STATUS_PURCHASED = 3

const RESERVE_ERROR_HELP_TEXT =
  'Press the refresh button to get the most up-to-date listings.'

const RESERVE_ERROR_UNEXPECTED = 'There was an unexpected error.'
const RESERVE_ERROR_PURCHASED = 'This listing has been purchased.'
const RESERVE_ERROR_ALREADY_RESERVED =
  'This listing is reserved by another user.'

const ACTION_STARTED_DEBOUNCE_MS = isTest ? 0 : 750

const notify = ({
  title,
  message,
  action
}: {
  title?: string
  message: string
  action?: ToastCallbackAction
}) => {
  Toast({
    type: 'attention',
    title: title,
    description: message,
    autoClose: 5000,
    action
  })
}

const notifySignIn = (callback: () => void) =>
  notify({
    title: 'Not Signed in',
    message: 'You must be signed in to purchase.',
    action: {
      label: 'SIGN IN TO BUY',
      callback
    }
  })

const notifyAddFunds = (callback: () => void) =>
  notify({
    title: 'Not Enough Funds',
    message:
      'There is not enough USDC in your Droppp Balance to purchase this item.',
    action: {
      label: 'ADD FUNDS',
      callback
    }
  })

const notifyReserveError = (mintNum: number, message: string) => {
  notify({
    title: `Mint #${numberWithCommas(mintNum)} is Unavailable`,
    message: `${message} ${RESERVE_ERROR_HELP_TEXT}`
  })
}

export const useMintListingAction = ({
  listing
}: UseMintListingActionInput): UseMintListingActionResult => {
  const { listing_id, is_mine, mint_num, listing_price, asset_id } = listing
  const [isSold, setIsSold] = useState(false)

  const {
    goTo,
    account,
    product,
    isActionStarting,
    actions: { setIsActionStarting }
  } = useMintListingsContext()

  const { isAccountLoading, notEnoughFunds, isVerified, isNotSignedIn } =
    account

  const { isReserving, reserveListing } = useReserveListing({
    chainTemplateId: product?.chain_template_id,
    goTo,
    timeout: {
      message: `Press ‘Buy Listing’, to reserve mint #${numberWithCommas(
        mint_num
      )}, if available.`,
      label: 'Buy Listing'
    },
    success: {
      continueTo: 'Buy More',
      onDone: () => hideModal(MODAL_ID.marketplace.mintListings)
    }
  })

  const { openListing } = useAssetListing({
    assetId: asset_id,
    isVerified,
    goTo
  })

  const startAction = () => setIsActionStarting(true)

  // Despite a few attempts, including adding a callback  to `showModal` (now removed), I couldn't find
  // a consistent way to determine when the modal was actually blocking user activity. As a workaround,
  // `actionStarted` adds an arbitrary delay before enabling the action buttons on the listing items.
  // We should come up with a more robust solution - Eric Wed Nov 16 2023
  const actionStarted = debounce(
    () => setIsActionStarting(false),
    ACTION_STARTED_DEBOUNCE_MS
  )

  const handleReserveError = (err?: unknown) => {
    const processReserveError = async (reserveError?: unknown) => {
      let message = RESERVE_ERROR_UNEXPECTED
      if (isPendingSnapshotError(reserveError)){
        notifyPendingSnapshot()
        return
      }
      else if (isApiError(reserveError)) {
        try {
          // short term work-around until "error flags" land in the API, Eric Wed Nov 22 2023
          const { listings } = await getListing(listing_id)
          const currentListing = listings.find(item => item.id === listing_id)

          if (currentListing) {
            if (currentListing.status === LISTING_STATUS_PURCHASED) {
              setIsSold(true)
              message = RESERVE_ERROR_PURCHASED
            } else if (currentListing.timeout > 0) {
              message = RESERVE_ERROR_ALREADY_RESERVED
            }
          }
        } catch (err: any) {
          Sentry.captureException(err)
        }
      }

      notifyReserveError(mint_num, message)
    }

    processReserveError(err).then()
  }

  const buildMintListingAction = (): MintListingAction => {
    const defaultAction = {
      theme: 'blue' as ButtonTheme,
      disabled: isActionStarting,
      label: 'Buy',
      perform: () => {
        startAction()
        reserveListing({
          listingId: listing_id,
          assetId: asset_id,
          onUnhandledError: handleReserveError,
          onReserveComplete: () => actionStarted()
        })
      }
    }

    if (isAccountLoading || isReserving) return { loading: true }

    if (isNotSignedIn)
      return {
        ...defaultAction,
        theme: 'blocked',
        perform: () => notifySignIn(goTo.signIn)
      }

    if (is_mine)
      return {
        ...defaultAction,
        theme: 'secondary',
        label: 'Edit',
        perform: () => {
          startAction()
          openListing().then(() => actionStarted())
        }
      }

    if (!isVerified)
      return {
        ...defaultAction,
        perform: () => goTo.verifyIdentity(VerifyType.Purchase)
      }

    if (notEnoughFunds(listing_price))
      return {
        ...defaultAction,
        theme: 'blocked',
        perform: () => notifyAddFunds(goTo.addFunds)
      }

    if (isSold)
      return {
        label: 'Sold',
        disabled: true
      }

    return defaultAction
  }

  return {
    listingAction: buildMintListingAction()
  }
}
