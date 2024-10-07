import { useRouter } from 'next/router'
import React, { FC, useContext, useEffect } from 'react'
import NiceModal, { ModalDef, NiceModalHocProps } from '@ebay/nice-modal-react'
import { MODAL_ID } from '@/constants/modalId'
import { ProductBuyModal } from './marketplace/ProductBuyModal'
// import AccountLockedModal from './ModalV2/AccountLockedModal' // Currently unused
import BooleanModal from './ModalV2/BooleanModal'
import ConfirmModal from './ModalV2/ConfirmModal'
import ChangeEmailModal from './ModalV2/ChangeEmailModal'
import ChangePasswordModal from './ModalV2/ChangePasswordModal'
import SubscribeNewsletterModal from './ModalV2/SubscribeNewsletterModal'
import NewWalletModal from './ModalV2/NewWalletModal'
import ListItemModal from './ModalV2/ProductListModal'
import MintListingsModal from '@/features/mintListings/MintListingsModal'
import WaxPurchaseSuccessModal from './ModalV2/WaxPurchaseSuccessModal'
import EditShippingModal from './ModalV2/EditShippingModal'
import AddressWarningModal from './ModalV2/AddressWarningModal'
import AddressSuggestionModal from './ModalV2/AddressSuggestionModal'
import IdentityVerificationGateModal from './ModalV2/IdentityVerification'
import Enable2FAModal from './ModalV2/Enable2FAModal'
import Disable2FAModal from './ModalV2/Disable2FAModal'
import ChallengeModal from './ModalV2/ChallengeModal'
import DepositSequence from '@/features/wallet/deposit'
import QueueItModal from './ModalV2/QueueItModal'
import InventoryPreviewModal from './ModalV2/InventoryPreviewModal'
import TwoFAModal from './ModalV2/TwoFAModal'
import { Success } from './ModalV2/Success'

// Examples
import ModalSequenceExample from '@/components/Examples/ModalSequence'
import CustomWaxAddressModal from './ModalV2/CustomWaxAddressModal'
import UnsupportedRegionModal from './ModalV2/UnsupportedRegionModal'
import MinimumDepositNotMetModal from './ModalV2/MinimumDepositNotMetModal'
import OpeningSoonModal from './ModalV2/OpeningSoonModal'
import OtherMarketplaceOptionsModal from './ModalV2/OtherMarketplaceOptionsModal'
import HowMonsterPromoWorksModal from './ModalV2/HowMonsterPromoWorksModal'
import ClaimSuccessModal from './ModalV2/ClaimSuccessModal'
import UnsupportedPackOpenModal from './ModalV2/UnsupportedPackOpenModal'
import ConsumerRightsRequestModal from './ModalV2/ConsumerRightsRequestModal'
import HowItWorksModal from './ModalV2/HowItWorksModal'
import SortOptions from './ModalV2/SortOptions'
import { WithdrawalModal } from '@/features/wallet/withdraw/WithdrawalModal'
import TransferModal from '@/features/transfer/TransferAssetSequence'
import NonTransferableAssetsModal from '@/features/transfer/modals/NonTransferableAssetsModal'
import RedemptionTokens from '@/features/redemption/checkout/components/RedemptionTokensModal'
import SalesHistoryModal from '@/features/salesHistory/SalesHistoryModal'
import NotifyMeModal from '@/features/notifyMe/NotifyMeModal'
import InfoModalById from '../Examples/InfoModalById'
import { DropSettings } from './ModalV2/DropSettings'

// @ts-expect-error: Should have a collection of Modal Props eventually
type ModalDefinition = [string, FC<Props & NiceModalHocProps>]

export default function ModalProvider() {
  const router = useRouter()
  const modalContexts = useContext(NiceModal.NiceModalContext)

  const handleRouteChangeComplete = () => {
    // Close all modals opened by routing changes
    Object.entries(modalContexts).forEach(([key, value]) => {
      // Don't remove modals that should persist on route change
      if (value.args?.shouldPersistOnRouteChange) return
      NiceModal.remove(key)
    })
  }

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChangeComplete)
    return () =>
      router.events.off('routeChangeStart', handleRouteChangeComplete)
  }, [modalContexts])

  const modals = React.useMemo(() => {
    const modalDefs: ModalDefinition[] = [
      // 🚩 Each registered modal should be added below

      [MODAL_ID.wallet.addFunds, DepositSequence],
      [MODAL_ID.addressWarning, AddressWarningModal],
      [MODAL_ID.addressSuggestion, AddressSuggestionModal],
      [MODAL_ID.boolean, BooleanModal],
      [MODAL_ID.challenge, ChallengeModal],
      [MODAL_ID.changeEmail, ChangeEmailModal],
      [MODAL_ID.changePassword, ChangePasswordModal],
      [MODAL_ID.confirm, ConfirmModal],
      [MODAL_ID.success, Success],
      [MODAL_ID.editShipping, EditShippingModal],
      [MODAL_ID.identityVerificationGate, IdentityVerificationGateModal],
      [MODAL_ID.minimumDepositNotMet, MinimumDepositNotMetModal],
      [MODAL_ID.openingSoon, OpeningSoonModal],
      [MODAL_ID.queueItModal, QueueItModal],
      [MODAL_ID.subscribeNewsletter, SubscribeNewsletterModal],

      // TRANSFER MODALS
      [MODAL_ID.transfer.review, TransferModal],
      [MODAL_ID.transfer.nonTransferableAssets, NonTransferableAssetsModal],

      // REDEMPTION MODALS
      [MODAL_ID.redemption.redemptionTokens, RedemptionTokens],

      [MODAL_ID.unsupportedRegion, UnsupportedRegionModal],
      [MODAL_ID.howMonsterPromoWorks, HowMonsterPromoWorksModal],

      [MODAL_ID.wallet.customWaxAddress, CustomWaxAddressModal],
      [MODAL_ID.wallet.newWalletAlert, NewWalletModal],
      [MODAL_ID.wallet.waxPurchaseSuccess, WaxPurchaseSuccessModal],
      [MODAL_ID.wallet.withdrawFunds, WithdrawalModal],

      [MODAL_ID.marketplace.listItem, ListItemModal],
      [MODAL_ID.marketplace.mintListings, MintListingsModal],
      [MODAL_ID.marketplace.salesHistory, SalesHistoryModal],
      [MODAL_ID.marketplace.productBuy, ProductBuyModal],
      [MODAL_ID.otherMarketplaceOptions, OtherMarketplaceOptionsModal],

      [MODAL_ID.disable2FA, Disable2FAModal],
      [MODAL_ID.enable2FA, Enable2FAModal],
      [MODAL_ID.twoFA, TwoFAModal],
      [MODAL_ID.inventoryPreview, InventoryPreviewModal],
      [MODAL_ID.claimSuccess, ClaimSuccessModal],
      [MODAL_ID.unsupportedPackOpen, UnsupportedPackOpenModal],
      [MODAL_ID.consumerRightsRequest, ConsumerRightsRequestModal],
      [MODAL_ID.howItWorks, HowItWorksModal],

      [MODAL_ID.sortOptions, SortOptions],
      [MODAL_ID.notifyMe, NotifyMeModal],

      // Dev Only
      [MODAL_ID.devOnly.dropSettings, DropSettings],

      // Custom Examples
      ['modalSequenceExample', ModalSequenceExample],
      ['infoModalByIdExample', InfoModalById]

      // Disabled
      // [MODAL_ID.accountLocked, AccountLockedModal]
    ]
    return modalDefs.map(m => (
      <ModalDef key={m[0]} id={m[0]} component={m[1]} />
    ))
  }, [])

  return <>{modals}</>
}
