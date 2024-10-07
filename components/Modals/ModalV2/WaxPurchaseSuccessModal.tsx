import NiceModal from '@ebay/nice-modal-react'
import { MODAL_ID } from '@/constants/modalId'
import InfoModal from './InfoModal'

interface Props {
  onComplete: () => void
}

const WaxPurchaseSuccessModal = NiceModal.create<Props>(({ onComplete }) => {
  return (
    <InfoModal
      title="Welcome to Droppp!"
      primaryButton={{
        onClick: onComplete,
        label: 'Done'
      }}
      header={{
        className: 'aspect-[24/15]',
        image: {
          path: 'global/modals/',
          id: 'wallet-mon_1',
          alt: 'header image',
          width: 480,
          height: 300
        }
      }}
      id={MODAL_ID.wallet.waxPurchaseSuccess}
    >
      <div className="mt-2 body text-gray-300">
        Be sure to check out the marketplace to buy and list your items. Also be
        sure to visit your Wallet, where you can now add funds.
      </div>
    </InfoModal>
  )
})

export default WaxPurchaseSuccessModal
