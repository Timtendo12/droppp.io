import { Rarity } from '@/api/resources/shared/rarity'
import { isOneOfOne } from '@/util/assetHelpers'
import Button, { ButtonSize } from '@/components/Button'
import { useAccount } from '@/hooks/useAccount'
import { VerifyType } from '@/components/Modals/ModalV2/content/verifyIdentity'
import { useNavigation } from '@/hooks/useNavigation'
import { useReserveLowestListing } from '@/hooks/useReserveListing'
import { isPendingSnapshotError } from '@/api/core/errors'
import { notifyPendingSnapshot } from '@/components/QueryErrorNotifier/notifiers/PendingSnapshot'
import { notifyGenericError } from '@/components/QueryErrorNotifier/notifiers/Generic'

export const PRICE_DISCLAIMER =
  'The price shown above may change when a listing is reserved on the next step.'

const BUTTON_LABELS = {
  buy: 'Buy Listing',
  buyLowest: 'Buy Lowest Listing',
  addFunds: 'Add Funds To Purchase',
  signIn: 'Sign In To Buy'
}

const buyLabel = (rarity: Rarity) =>
  isOneOfOne(rarity) ? BUTTON_LABELS.buy : BUTTON_LABELS.buyLowest

const notifyReserveLowestError = (err: unknown) => {
  if (isPendingSnapshotError(err)) {
    notifyPendingSnapshot()
    return
  }

  notifyGenericError({
    heading: 'Unable to Reserve Listing',
    error: err,
    fallback: 'There was an unexpected error with this request'
  })
}

// BuyAction component ///////////////////////////////////////////////////////////////////////////////
export interface BuyActionProps {
  data_id: number
  rarity: Rarity | null
  listing_price: number | null
  listings_available: number
  chain_template_id?: number
  is_mine?: boolean
  size?: ButtonSize
  className?: string
}

const BuyAction = ({
  data_id,
  chain_template_id,
  rarity,
  listings_available,
  listing_price,
  is_mine = false,
  className = '',
  size = 'md'
}: BuyActionProps) => {
  // Hooks ///////////////////////////////////////////////////////////////////////////////
  const { goTo } = useNavigation()
  const { isAccountLoading, isNotSignedIn, isUnverified, notEnoughFunds } =
    useAccount()

  const { isReservingLowest, reserveLowestListing } = useReserveLowestListing({
    chainTemplateId: chain_template_id,
    goTo,
    timeout: {
      message:
        'Press ‘Buy Lowest Listing’, to reserve a new listing, if available.',
      label: 'Buy Lowest Listing'
    },
    success: {
      continueTo: 'View Inventory',
      onContinue: goTo.inventory
    }
  })

  // Setup ///////////////////////////////////////////////////////////////////////////////
  const isNotListed = !(listings_available > 0)

  const handleError = (err: unknown) => {
    notifyReserveLowestError(err)
  }

  // Props  ///////////////////////////////////////////////////////////////////////////////
  const buildBuyAction = () => {
    if (isAccountLoading || isReservingLowest) return { loading: true }

    if (isNotListed) return { disabled: true }

    if (isNotSignedIn)
      return { label: BUTTON_LABELS.signIn, onClick: goTo.signIn }

    if (is_mine) return { disabled: true }

    if (isUnverified)
      return { onClick: () => goTo.verifyIdentity(VerifyType.Purchase) }

    if (notEnoughFunds(listing_price))
      return { label: BUTTON_LABELS.addFunds, onClick: goTo.addFunds }

    return {
      onClick: () =>
        reserveLowestListing({ dataId: data_id, onUnhandledError: handleError })
    }
  }

  const buyAction = buildBuyAction()

  const buttonProps = {
    loading: undefined,
    disabled: undefined,
    onClick: undefined,
    className,
    size,
    label: buyLabel(rarity),
    ...buyAction
  }

  // Rendering  ///////////////////////////////////////////////////////////////////////////////
  const { label, ...rest } = buttonProps
  return <Button {...rest}>{label}</Button>
}

export default BuyAction
