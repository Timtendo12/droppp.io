import NiceModal from '@ebay/nice-modal-react'
import { useRouter } from 'next/router'
import { MODAL_ID } from '@/constants/modalId'
import InfoModal from './InfoModal'
import { isMpEnabled } from '@/util'
import { ModalButtonProps } from './BaseModal'
import { ReactNode } from 'react'

interface Props {
  id:
    | 'time-out'
    | 'sold-out'
    | 'unsupported-region'
    | 'moving-around'
    | 'take-a-breather'
    | 'payment-cool-off'
  content?: string
}

interface ModalProps {
  [key: string]: {
    title: string
    description: string | ReactNode
    action?: ModalButtonProps
    secondaryAction?: ModalButtonProps
  }
}

const QueueItModal = NiceModal.create(
  ({ id = 'moving-around', content }: Props) => {
    const router = useRouter()
    const { drop_id } = router.query

    const MODAL_MAP: ModalProps = {
      'time-out': {
        title: "Time's Up",
        description:
          'Unfortunately, you have run out of time. Re-enter the queue to try again.',
        action: {
          onClick: () => {
            NiceModal.hide(MODAL_ID.queueItModal)
            router.pathname === '/reserve-drop'
              ? router.reload()
              : router.replace(`reserve-drop?drop_id=${drop_id}`)
          },
          label: 'Rejoin Queue'
        },
        secondaryAction: {
          theme: 'gray',
          onClick: () => {
            NiceModal.hide(MODAL_ID.queueItModal)
            router.push('/')
          },
          label: 'Return Home'
        }
      },
      'sold-out': {
        title: 'Sold Out',
        description:
          'Unfortunately, one or more of the items you were trying to purchase has been bought by someone ahead of you in the queue.'
      },
      // From server
      'unsupported-region': {
        title: 'Unsupported Region',
        description: content
      },
      'moving-around': {
        title: 'You Moved Around Too Much',
        description:
          'In order to give everyone an opportunity to buy packs, we require that the IP address you have when joining the queue remain the same as the IP address you have when you are allowed to purchase. Unfortunately, your IP address changed and you must rejoin the queue to try again.',
        action: {
          onClick: () => {
            NiceModal.hide(MODAL_ID.queueItModal)
            router.reload()
            // window.location = queueRedirect
          },
          label: 'Rejoin Queue'
        }
      },
      'take-a-breather': {
        title: 'Take a breather',
        description: (
          <>
            Relax, champ. We know you're an all-star, but you've been through
            the queue too many times. Did you miss out on getting a pack?{' '}
            {isMpEnabled() ? (
              <>
                Buy packs on our{' '}
                <a
                  className="underline"
                  target="_blank"
                  href="/marketplace"
                  rel="noreferrer"
                >
                  Marketplace
                </a>
              </>
            ) : (
              'You may be able to find them on other secondary marketplaces'
            )}{' '}
            or trade with our community on{' '}
            <a
              className="underline"
              target="_blank"
              href="https://droppp.io/discord"
              rel="noreferrer"
            >
              Discord
            </a>
            .
          </>
        ),
        action: {
          onClick: () => router.push('/inventory'),
          label: 'Back to Inventory'
        }
      },
      'payment-cool-off': {
        title: 'Payment Cool-Off',
        description:
          'In order to give everyone an opportunity to buy packs, this card is temporarily paused from purchasing. You may return to payment and try again.',
        action: {
          onClick: () => router.back(),
          label: 'Return to Payment'
        }
      }
    }
    const { title, description, action, secondaryAction } = MODAL_MAP[id]

    return (
      <InfoModal
        title={title}
        isCancelDisabled
        primaryButton={action}
        secondaryButton={secondaryAction}
        header={{
          image: {
            path: 'global/modals/',
            id,
            alt: 'header image',
            width: 480,
            height: 300
            // className: 'aspect-[24/15]'
          }
        }}
        id={MODAL_ID.queueItModal}
      >
        <p className="text-gray-300 -mt-1 body">{description}</p>
      </InfoModal>
    )
  }
)

export default QueueItModal
