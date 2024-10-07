import { useEffect, useState } from 'react'
import NiceModal from '@ebay/nice-modal-react'
import classNames from 'classnames'

import { MODAL_ID } from '@/constants/modalId'
import IdentityVerificationState from '@/types/identityVerificationState'

import { useWalletQuery } from '@/api/resources/user/wallet/get'
import { textAlignmentClass } from '@/util/tailwindHelpers'
import { TextAlignment } from '@/types/tailwind'
import { VerifyType, VerifyTitle, VerifyBody } from '../content/verifyIdentity'
import { button, paragraphClasses, footer } from '../shared/props'

// Components + Helpers
import ModalSequence, { IModalSequenceViewProps } from '../ModalSequence'
import Button from '@/components/Button'
import ModalStateGraphic from '../ModalStateGraphic'

import { setUserPreferences } from '@/api/resources/user/preferences/set'

import LocationStep from './LocationStep'
import { hideModal } from '..'
import { isTest } from '@/config'

////////////////////////////////////////////////////////////////////////////////
// Enums & Interfaces

interface Props {
  introType?: VerifyType | null
  redirectUri?: string
}

interface IntroFooterProps {
  onContinue?: () => void
}

////////////////////////////////////////////////////////////////////////////////
// Component

const IdentityVerificationGateModal = NiceModal.create<Props>(
  ({ introType, redirectUri = '/wallet/' }) => {
    // Hooks & State //////////////////////////////////////////////////////////////
    const [viewIntro, setViewIntro] = useState(!!introType)

    const {
      data: { verify_id_prompted, identityVerificationState: verifyState } = {}
    } = useWalletQuery()

    // Lifecycle ///////////////////////////////////////////////////////////////////

    useEffect(() => {
      if (!verify_id_prompted)
        setUserPreferences({ verify_id_prompted: true }).then()
    }, [verify_id_prompted])

    // Handler: Local Storage ////////////////////////////////////////////////////////

    const handleContinue = () => setViewIntro(false)
    const handleHideModal = () => hideModal(MODAL_ID.identityVerificationGate)

    // Setup /////////////////////////////////////////////////////////////////////////

    const hasStarted = verifyState === IdentityVerificationState.Started
    const isPending = verifyState === IdentityVerificationState.Pending

    // Form
    const titleForm = `Before we ${!hasStarted ? 'get started' : 'resume'}...`
    const textPendingAlignment: TextAlignment = 'center'

    // Sequenced Views
    const modalSequenceViews: IModalSequenceViewProps[] = []
    if (isPending) {
      modalSequenceViews.push({
        id: 'pending',
        title: null,
        view: ({ ModalBody, ModalFooter }) => (
          <>
            <ModalBody>
              <div
                className={classNames(
                  textAlignmentClass(textPendingAlignment),
                  '-mt-1'
                )}
              >
                <ModalStateGraphic
                  icon="timer"
                  iconClassName="w-5 h-5 -mt-half"
                  className="mb-2 mx-auto"
                />
                <h1 className="h3 mb-2">Sit Tight</h1>
                <p className={paragraphClasses}>
                  Before you can purchase this item we need to finish verifying
                  your identity. If you are approved you will receive an email
                  indicating that you may interact with the Droppp marketplace.
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button {...button} theme="blue" onClick={handleHideModal}>
                Okay
              </Button>
            </ModalFooter>
          </>
        )
      })
    }
    if (viewIntro) {
      modalSequenceViews.push({
        id: 'intro',
        title: VerifyTitle[introType],
        overlayHeaderOpaqueOnScroll: true,
        header: {
          image: {
            path: 'global/modals/',
            id: 'kyc',
            alt: 'Verify Identity',
            width: 480,
            height: 300,
            className: 'aspect-[24/15]'
          }
        },
        view: ({ ModalBody, ModalFooter }) => (
          <>
            <ModalBody>
              <IntroContent />
            </ModalBody>
            <ModalFooter>
              <IntroFooter onContinue={handleContinue} />
            </ModalFooter>
          </>
        )
      })
    }
    modalSequenceViews.push({
      id: 'form',
      title: titleForm,
      view: ({ ModalBody, ModalFooter }) => (
        <LocationStep redirectUri={redirectUri}>
          {({ Body, Footer }) => {
            if (isTest) {
              return (
                <>
                  {Body}
                  {Footer}
                </>
              )
            } else {
              return (
                <>
                  <ModalBody>{Body}</ModalBody>
                  <ModalFooter>{Footer}</ModalFooter>
                </>
              )
            }
          }}
        </LocationStep>
      )
    })

    // Render //////////////////////////////////////////////////////////////////////

    return (
      <ModalSequence
        // overlayClassName="z-viewModal"
        modalId={MODAL_ID.identityVerificationGate}
        id={MODAL_ID.identityVerificationGate}
        init={() => modalSequenceViews}
      />
    )
  }
)

////////////////////////////////////////////////////////////////////////////////
// HELPER COMPONENTS

const IntroFooter = ({ onContinue = null }: IntroFooterProps) => {
  const handleContinue = () => {
    if (onContinue) return onContinue()
  }
  return (
    <div {...footer}>
      <Button {...button} theme="rainbow" onClick={handleContinue}>
        Verify Identity
      </Button>
    </div>
  )
}

const IntroContent = () => {
  return <p className={classNames(paragraphClasses, '-mt-1')}>{VerifyBody}</p>
}

export default IdentityVerificationGateModal
