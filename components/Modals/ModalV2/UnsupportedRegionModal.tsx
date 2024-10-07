import NiceModal from '@ebay/nice-modal-react'
import { MODAL_ID } from '@/constants/modalId'
import { hideModal } from '.'
import InfoModal from './InfoModal'
import { useRouter } from 'next/router'
import FAQ_QUESTIONS from '@/constants/questions'

interface IUnsupportedRegionModalProps {
  message: string
}

const UnsupportedRegionModal = NiceModal.create(
  ({ message }: IUnsupportedRegionModalProps) => {
    const router = useRouter()
    const handleClick = () => {
      hideModal(MODAL_ID.unsupportedRegion)
      router.push(
        `/faq?question=${FAQ_QUESTIONS.marketplace.items.regionRestrictions.id}`
      )
    }

    return (
      <InfoModal
        title="You are in an unsupported region"
        id={MODAL_ID.unsupportedRegion}
        primaryButton={{
          onClick: handleClick,
          label: 'View Faq',
          theme: 'blue'
        }}
        header={{
          className: 'aspect-[24/15]',
          image: {
            path: 'global/modals/',
            id: 'unsupported-region',
            alt: 'header image',
            width: 480,
            height: 300
          }
        }}
      >
        {message && <p>{message}</p>}
      </InfoModal>
    )
  }
)

export default UnsupportedRegionModal
