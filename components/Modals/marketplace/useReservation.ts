import { useState } from 'react'
import { noop } from 'lodash'
import { ReservedListing } from '@/api/resources/shared/listingReserve'
import { useCancelReservationMutation } from '@/api/resources/user/listing/reserve/cancel'
import { useInventory } from '@/hooks/useInventory'
import { useMarketplace } from '@/hooks/useMarketplace'
import { useReserveListingMutation } from '@/api/resources/user/listing/reserve'

export const useReservation = ({
  initialReservation,
  onRenewalError
}: {
  initialReservation: ReservedListing
  onRenewalError?: (err?: unknown) => void
}) => {
  const {
    listing_id,
    listing: { asset }
  } = initialReservation

  const [didPurchase, setDidPurchase] = useState(false)

  const { refreshAssets } = useInventory()
  const { refreshCatalogItemListings, refreshCatalogItemDetail } =
    useMarketplace()

  const {
    isLoading: isRenewing,
    isError: isRenewError,
    mutate: renew,
    data: renewedReservation
  } = useReserveListingMutation({ onError: onRenewalError })

  const reservation = renewedReservation || initialReservation

  const { mutate: cancel } = useCancelReservationMutation(
    reservation.reservation_id,
    {
      onError: noop,
      onSettled: () => refreshCatalogItemDetail(asset.template_id)
    }
  )

  const purchased = () => {
    setDidPurchase(true)
    refreshAssets()
    refreshCatalogItemListings(asset.template_id).then()
  }

  return {
    isRenewing,
    isRenewError,
    didPurchase,
    reservation,
    actions: {
      renew: () => renew({ listing_id }),
      cancel,
      purchased
    }
  }
}
