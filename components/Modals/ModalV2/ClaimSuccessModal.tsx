import NiceModal from '@ebay/nice-modal-react'
import { MODAL_ID } from '@/constants/modalId'
import InfoModal from './InfoModal'

const CLAIM_MAP = {
  'fan-rewards': {
    heroImg: {
      path: 'global/claim/',
      id: 'fan-rewards-claim',
      alt: 'header image',
      width: 480,
      height: 300,
      className: 'aspect-[24/15]'
    },
    title: 'Congrats on Your Digital Pop!™ Pack',
    description:
      'Your Fan Rewards Digital Pop!™ has been deposited into your inventory.'
  }
}

interface Props {
  type: string
  onComplete: () => void
}

const ClaimSuccessModal = NiceModal.create<Props>(({ type, onComplete }) => {
  const { heroImg, title, description } = CLAIM_MAP[type]
  return (
    <InfoModal
      title={title}
      primaryButton={{
        theme: 'rainbow',
        onClick: onComplete,
        label: 'View Inventory'
      }}
      header={{ image: heroImg }}
      id={MODAL_ID.claimSuccess}
      isCancelDisabled
    >
      <div className="body text-gray-300">{description}</div>
    </InfoModal>
  )
})

export default ClaimSuccessModal
