import React from 'react'
import NiceModal from '@ebay/nice-modal-react'
import { MODAL_ID } from '@/constants/modalId'
import TimeoutCounter from '@/components/TimeoutCounter'
import ViewModal from '@/components/Modals/ModalV2/ViewModal'
import InventoryBuyItem from '@/components/ProductBuyItem'
import Loading from '@/components/Loading'
import ModalStateGraphic from '@/components/Modals/ModalV2/ModalStateGraphic'
import { useAuth } from '@/contexts/auth'
import { ReservedListing } from '@/api/resources/shared/listingReserve'
import { useReservation } from './useReservation'

export type ReservationTimeout = {
  label: string
  message: string
  onRenewalError: (err?: unknown) => void
}

export type PurchaseSuccess = {
  continueTo: string
  onContinue?: () => void
  onDone?: () => void
}

export interface ProductBuyModalProps {
  initialReservation: ReservedListing
  options?: {
    timeout?: ReservationTimeout
    success?: PurchaseSuccess
  }
}

export const ProductBuyModal = NiceModal.create(
  ({ initialReservation, options }: ProductBuyModalProps) => {
    const { timeout, success } = options ?? {}

    const { isUserLoading: isLoadingUser, walletBalance, fetchUser } = useAuth()

    const { isRenewing, isRenewError, didPurchase, reservation, actions } =
      useReservation({
        initialReservation,
        onRenewalError: timeout?.onRenewalError
      })

    const handleTimeout = () =>
      NiceModal.show(MODAL_ID.boolean, timeoutModal).then()

    const handleRetry = () => actions.renew()

    const handleSuccess = () => {
      actions.purchased()
      fetchUser().then()
      NiceModal.show(MODAL_ID.confirm, successModal).then()
    }

    const handleCancel = () => actions.cancel()

    const timeoutModal = {
      overlayClassName: 'z-confirm',
      onCancel: () => {
        NiceModal.hide(MODAL_ID.marketplace.productBuy).then()
        NiceModal.hide(MODAL_ID.boolean).then()
      },
      children: (
        <div className="text-center">
          <ModalStateGraphic
            icon="timer"
            className="mb-2 mx-auto"
            iconClassName="w-[44px] h-[44px]"
          />
          <h1 className="h3 mb-2">Reservation Expired</h1>
          <p className="body-sm text-gray-300">
            This reservation has expired and is now available for purchase by
            anyone on the marketplace. {timeout?.message}
          </p>
        </div>
      ),
      primaryButton: {
        label: timeout?.label,
        loading: isRenewing,
        onClick: handleRetry
      }
    }

    const successModal = {
      className: 'px-3 text-center',
      children: (
        <div className="flex flex-col gap-2">
          <ModalStateGraphic icon="tick" className="mx-auto" />
          <h3 className="h3">Success</h3>
          <p className="modal-copy">
            Your purchase was complete and the item has been transferred into
            your inventory.
          </p>
        </div>
      ),
      primaryButton: {
        label: 'Done',
        onClick: () => {
          NiceModal.hide(MODAL_ID.marketplace.productBuy).then()
          success?.onDone?.()
        }
      },
      secondaryButton: {
        label: success?.continueTo,
        theme: 'gray-transparent',
        onClick: () => {
          success?.onContinue?.()
          NiceModal.hide(MODAL_ID.marketplace.productBuy).then()
          NiceModal.hide(MODAL_ID.confirm).then()
        }
      }
    }

    const isLoading = isRenewing || isLoadingUser

    if (isRenewError) return null

    return (
      <ViewModal
        id={MODAL_ID.marketplace.productBuy}
        hasLogoMobile={false}
        headerChildren={
          !isLoading &&
          !didPurchase && (
            <TimeoutCounter
              className="w-full"
              timeout={reservation.listing.timeout}
              timeoutMax={reservation.listing.max_timeout}
              timeoutId={reservation.reservation_id}
              onComplete={handleTimeout}
            />
          )
        }
        cancelButtonConfig={{
          action: handleCancel
        }}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <InventoryBuyItem
            onSuccess={handleSuccess}
            reservation={reservation}
            walletBalance={walletBalance}
          />
        )}
      </ViewModal>
    )
  }
)
