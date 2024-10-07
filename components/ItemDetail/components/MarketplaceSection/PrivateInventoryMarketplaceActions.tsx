import { ReactNode } from 'react'
import { UserAsset } from '@/api/resources/user/asset/get/schema'
import Button, { ButtonTheme } from '@/components/Button'
import { useAccount } from '@/hooks/useAccount'
import { useAssetListing } from '@/hooks/useAssetListing'
import { useNavigation } from '@/hooks/useNavigation'
import { DropConfig } from '@/config/drops/schema'

const BUTTON_CLASSES = 'w-full'

type EditListingButtonProps = {
  className?: string
  disabled?: boolean
  loading?: boolean
  theme: ButtonTheme
  onClick: () => void
  children: ReactNode
}

export interface Props {
  asset: UserAsset
  drop: DropConfig
  className?: string
}

export const PrivateInventoryMarketplaceActions = ({
  asset,
  className
}: Props) => {
  const { isAccountLoading, isVerified } = useAccount()
  const { goTo } = useNavigation()

  const {
    marketplace: { status }
  } = asset

  const isProductActive = status === 'active'
  const isProductReserved = status === 'pending'

  const { openListing } = useAssetListing({
    assetId: asset.id,
    isVerified,
    goTo
  })

  const handleListItemModal = async () => openListing()

  let buttonProps: EditListingButtonProps = {
    className: BUTTON_CLASSES,
    loading: isAccountLoading,
    theme: 'green',
    onClick: handleListItemModal,
    children: 'List On Market'
  }

  if (isProductActive) {
    buttonProps = {
      ...buttonProps,
      theme: 'white',
      children: 'Edit Listing'
    }
  } else if (isProductReserved) {
    buttonProps = {
      ...buttonProps,
      theme: 'white',
      children: 'Sale Pending',
      disabled: true
    }
  }

  return (
    <div className={className}>
      <Button {...buttonProps} />
    </div>
  )
}

export default PrivateInventoryMarketplaceActions
