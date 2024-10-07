import { noop } from 'lodash'
import { useReserveLowestListingMutation } from '@/api/resources/user/listing/reserve/lowest'
import { ReservedListingResponse } from '@/api/resources/shared/listingReserve/response'
import { showModal } from '@/components/Modals/ModalV2'
import { MODAL_ID } from '@/constants/modalId'
import { ApiError } from '@/api/core/errors'
import { useReserveListingMutation } from '@/api/resources/user/listing/reserve'
import { useQueryCache } from './useQueryCache'
import {
  ProductBuyModalProps,
  PurchaseSuccess,
  ReservationTimeout
} from '@/components/Modals/marketplace/ProductBuyModal'
import { GoToType } from '@/hooks/useNavigation'

type ReserveCompleteCallback = () => void
type UnhandledErrorCallback = (err?: unknown) => void

type UseReserveListingInput = {
  chainTemplateId: number
  goTo: GoToType
  timeout: Omit<ReservationTimeout, 'onRenewalError'>
  success: PurchaseSuccess
}

type ReserveListingInput = {
  listingId: number
  assetId: number
  onUnhandledError: UnhandledErrorCallback
  onReserveComplete: ReserveCompleteCallback
}

type ReserveLowestListingInput = {
  dataId: number
  onUnhandledError: UnhandledErrorCallback
}

type UseReserveListingResult = {
  isReserving: boolean
  reserveListing: (input: ReserveListingInput) => void
}

type UseReserveLowestListingResult = {
  isReservingLowest: boolean
  reserveLowestListing: (input: ReserveLowestListingInput) => void
}

const useReserveListingCore = ({
  chainTemplateId,
  timeout,
  success,
  goTo
}: UseReserveListingInput) => {
  const { cache } = useQueryCache()

  const handleError = (err: unknown): boolean => {
    const {
      details: { generic },
      countryRestriction,
      isMinimumNotMetError
    } = (err as ApiError) || {}

    if (countryRestriction) {
      showModal(MODAL_ID.unsupportedRegion, {
        message: generic
      })
      return true
    }

    if (isMinimumNotMetError) {
      showModal(MODAL_ID.minimumDepositNotMet, {
        onViewFAQ: goTo.marketplaceFAQ,
        onAddFunds: goTo.addFunds
      })
      return true
    }

    return false
  }

  const buildOptions = (
    assetId: number,
    onUnhandledError: UnhandledErrorCallback,
    onReserveComplete?: ReserveCompleteCallback
  ) => ({
    onSuccess: (response: ReservedListingResponse) => {
      showModal<ProductBuyModalProps>(MODAL_ID.marketplace.productBuy, {
        initialReservation: response,
        options: {
          success,
          timeout: { ...timeout, ...{ onRenewalError: onUnhandledError } }
        }
      })
      onReserveComplete?.()
    },
    onError: (err: unknown) => {
      if (!handleError(err)) {
        cache.invalidate.catalogItemDetailQuery(chainTemplateId).then()
        cache.invalidate.collectionAssetQuery(assetId).then()
        onUnhandledError(err)
      }
      onReserveComplete?.()
    }
  })

  return { buildOptions }
}

export const useReserveListing = (
  input: UseReserveListingInput
): UseReserveListingResult => {
  const core = useReserveListingCore(input)
  const mutation = useReserveListingMutation({ onError: noop })
  const { mutate: reserve, isLoading: isReserving } = mutation

  const reserveListing = ({
    listingId,
    assetId,
    onUnhandledError,
    onReserveComplete
  }: ReserveListingInput) =>
    reserve(
      { listing_id: listingId },
      core.buildOptions(assetId, onUnhandledError, onReserveComplete)
    )

  return {
    isReserving,
    reserveListing
  }
}

export const useReserveLowestListing = (
  input: UseReserveListingInput
): UseReserveLowestListingResult => {
  const core = useReserveListingCore(input)
  const mutation = useReserveLowestListingMutation({ onError: noop })
  const { mutate: reserveLowest, isLoading: isReservingLowest } = mutation

  const reserveLowestListing = ({
    dataId,
    onUnhandledError
  }: ReserveLowestListingInput) =>
    reserveLowest(
      { data_id: dataId },
      core.buildOptions(dataId, onUnhandledError)
    )

  return {
    isReservingLowest,
    reserveLowestListing
  }
}
