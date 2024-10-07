import NiceModal from '@ebay/nice-modal-react'
import { useState } from 'react'
import { MODAL_ID } from '@/constants/modalId'
import Button from '@/components/Button'
import { Form2FAMethods } from '@/components/Forms'
import { TwoFA } from '@/components/Forms/Form2FAOptions'
import {
  AuthenticatorSetup,
  TwoFaAuthenticator
} from '@/components/Forms/Form2FAAuthenticator'
import { Form2FAPhoneController } from '@/components/Forms/Form2FAPhone'
import Icon from '@/components/Icon'
import ModalSequence from '../ModalSequence'
import { DisplayRecoveryPhrase } from '@/components/Forms/Form2FARecoveryPhrase/DisplayRecoveryPhrase'
import { ConfirmRecoveryPhrase } from '@/components/Forms/Form2FARecoveryPhrase/ConfirmRecoveryPhrase'

interface Props {
  phraseUsed?: boolean
  onComplete: () => void
}

interface SequenceGoTo {
  (id: string | number): void
}

enum VerifyId {
  Methods = 'verification-methods',
  Authenticator = 'verify-authenticator',
  AuthenticatorSetup = 'setup-authenticator',
  Phone = 'setup-phone',
  Recovery = 'recovery-phrase',
  Confirm = 'confirm-recovery-phrase',
  Completed = 'completed'
}

enum VerifyTitle {
  Disabled = '2-Step Verification Has been Disabled',
  Choose = 'Choose Verification Method',
  AuthenticatorSetup = 'Setup Authenticator',
  Authenticator = 'Verify Authenticator',
  Phone = 'Set Up Your Phone',
  Secret = 'Secret Recovery Phrase',
  Confirm = 'Confirm Secret Recovery Phrase'
}

const Enable2FAModal = NiceModal.create<Props>(({ phraseUsed, onComplete }) => {
  // State ////////////////////////////////////////////////////////////////////
  const [recoveryPhrase, setRecoveryPhrase] = useState<string>()

  // Setup ////////////////////////////////////////////////////////////////////

  const recoveryTitle = true ? VerifyTitle.Confirm : VerifyTitle.Secret
  const recoveryId = VerifyId.Recovery + recoveryTitle
  // 🚨 👆 We change recoveryId based on recoveryConfirmed state so the viewId on
  // the modal view resets & content scrolls to top & resets sticky headers

  // Method Selection
  const handle2FAMethodContinue = (type: TwoFA, goTo: SequenceGoTo) => {
    goTo(type === TwoFA.SMS ? VerifyId.Phone : 'setup-authenticator')
  }

  // Recovery Phrase
  const handleRecoveryPhrase = (recoveryPhrase: string, goTo: SequenceGoTo) => {
    setRecoveryPhrase(recoveryPhrase)
    goTo(recoveryId)
  }

  const handleSmsRetreat = (goTo: SequenceGoTo) => {
    goTo(VerifyId.Methods)
  }
  // Complete

  const handleComplete = (close: () => void) => {
    onComplete?.()
    close()
  }

  // Render ///////////////////////////////////////////////////////////////////

  return (
    <ModalSequence
      id={MODAL_ID.enable2FA}
      modalId={MODAL_ID.enable2FA}
      init={({ goTo, close, next, previous }) => [
        {
          id: VerifyId.Methods,
          title: phraseUsed ? VerifyTitle.Disabled : VerifyTitle.Choose,
          view: ({ ModalBody, ModalFooter }) => (
            <Form2FAMethods
              phraseUsed={phraseUsed}
              onContinue={type => handle2FAMethodContinue(type, goTo)}
            >
              {({ FormBody, FormFooter }) => (
                <>
                  <ModalBody>
                    <FormBody />
                  </ModalBody>
                  <ModalFooter>
                    <FormFooter />
                  </ModalFooter>
                </>
              )}
            </Form2FAMethods>
          )
        },
        {
          id: VerifyId.AuthenticatorSetup,
          title: VerifyTitle.AuthenticatorSetup,
          onRetreat: previous,
          view: modalProps => (
            <AuthenticatorSetup onContinue={next} {...modalProps} />
          )
        },
        {
          id: VerifyId.Authenticator,
          title: VerifyTitle.Authenticator,
          view: modalProps => (
            <TwoFaAuthenticator
              {...modalProps}
              onContinue={phrase => handleRecoveryPhrase(phrase, goTo)}
            />
          ),
          onRetreat: previous
        },
        {
          id: VerifyId.Phone,
          title: VerifyTitle.Phone,
          view: modalProps => (
            <Form2FAPhoneController
              modalContentWrappers={modalProps}
              onContinue={phrase => {
                setRecoveryPhrase(phrase)
                next()
              }}
            />
          ),
          onRetreat: () => handleSmsRetreat(goTo)
        },
        {
          id: recoveryId,
          title: recoveryTitle,
          view: modalProps => (
            <DisplayRecoveryPhrase
              modalContentWrappers={modalProps}
              onContinue={next}
              recoveryPhrase={recoveryPhrase}
            />
          ),
          onRetreat: previous
        },
        {
          id: VerifyId.Confirm,
          title: VerifyTitle.Confirm,
          onRetreat: previous,
          view: modalProps => (
            <ConfirmRecoveryPhrase
              modalContentWrappers={modalProps}
              onRetreat={previous}
              onContinue={next}
            />
          )
        },
        {
          id: VerifyId.Completed,
          title: null,
          view: ({ ModalBody, ModalFooter }) => (
            <>
              <ModalBody>
                <div className="text-center">
                  <Icon className="m-auto" name="success" />
                  <div className="mt-2 h3">Success!</div>
                  <div className="mt-2 body text-gray-300">
                    2-Step Verification was set up successfully
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  {...buttonStyleProps}
                  onClick={() => handleComplete(close)}
                >
                  Done
                </Button>
              </ModalFooter>
            </>
          )
        }
      ]}
    />
  )
})

const buttonStyleProps = {
  className: 'w-full'
}

export default Enable2FAModal
