import React, { useState } from 'react'
import Modal, { ModalButtonProps } from './BaseModal'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useAuth } from '@/contexts/auth'
import { Input2FACode, Toast } from '@/components'
import ModalStateGraphic from './ModalStateGraphic'
import { ModalFooterButtons } from './ModalFooterButtons'
import ErrorBox from '@/components/ErrorBox'
import { setup2faSMSSend } from '@/api/resources/user/2fa/sms/send'
import { tryApiAction } from '@/api/core/compat'
import { Error } from '@/api/resources/shared/error'

const PRIMARY_BUTTON_INIT: ModalButtonProps = {
  theme: 'blue',
  onClick: () => alert('not set'),
  label: 'Confirm',
  disabled: false
}

interface Props {
  onAuthorized?: (code: string) => Promise<any>
}

const TwoFAModal = NiceModal.create<Props>(({ onAuthorized }) => {
  const [shouldBlockActions, setShouldBlockActions] = useState(false)
  const { hide, visible, remove } = useModal()

  const onSuccess = () => {
    hide()
    setShouldBlockActions(false)
  }

  return (
    <Modal
      onRetreat={hide}
      shouldBlockActions={shouldBlockActions}
      isOpen={visible}
      hide={hide}
      onAfterClose={remove}
    >
      {modalProps => (
        <TwoFAForm
          {...modalProps}
          onAuthorized={onAuthorized}
          onSuccess={onSuccess}
          onSubmission={() => setShouldBlockActions(true)}
          onError={() => setShouldBlockActions(false)}
        />
      )}
    </Modal>
  )
})

export default TwoFAModal

const TwoFAForm = ({
  ModalBody,
  ModalFooter,
  onAuthorized,
  onSuccess,
  onSubmission,
  onError
}) => {
  const { user } = useAuth()
  const [code, setCode] = useState()
  const [codeSent, setCodeSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isValidCode, setIsValidCode] = useState(false)
  const [sendingNewCode, setSendingNewCode] = useState(false)
  const [error, setError] = useState<Error>(null)

  const handleChangeCode = (value, isValid) => {
    setCode(value)
    setIsValidCode(isValid)
    setError(null)
  }

  const handleSendCode = async () => {
    setSendingNewCode(true)
    const { success, data } = await tryApiAction(() =>
      setup2faSMSSend('transfer')
    )
    setSendingNewCode(false)

    if (success) {
      setCodeSent(true)
      Toast({
        type: 'success',
        title: 'Success',
        description: 'A code was sent via SMS to your phone.'
      })
    } else {
      setError(data)
    }
  }

  const handleComplete = () => {
    return new Promise(async (resolve, reject) => {
      setLoading(true)
      onSubmission()

      try {
        const result = await onAuthorized?.(code)

        // check for an optional error result
        if (result?.success === false) {
          setError(result.error)
          reject()
        }
        // without errors, go ahead and finalize
        else {
          resolve(result)
          onSuccess()
        }
      } catch (ex) {
        setError(ex)
        onError()
        reject()
      } finally {
        setLoading(false)
      }
    })
  }

  return (
    <form className="mx-[var(--modalPadding)]">
      <ModalBody className="text-center">
        <ModalStateGraphic icon="lock" className="mx-auto" />
        <div className="h4 mt-3">2-Step Verification Required</div>
        <div className="body mt-1 text-gray-300">
          Please enter the 6-digit code{' '}
          {user.mfa_type === 'sms' ? (
            <>
              sent to the phone number ending in <b>{user.mfa_phone_last4}</b>
            </>
          ) : (
            'provided via your authenticator app'
          )}
          .
        </div>
        <Input2FACode secondaryLinkStyle="none" onChange={handleChangeCode} />
        <ErrorBox className="mt-2" error={error} />
      </ModalBody>
      <ModalFooter>
        <ModalFooterButtons
          primaryButton={{
            disabled: !isValidCode,
            loading: loading,
            onClick: handleComplete
          }}
          primaryButtonInit={PRIMARY_BUTTON_INIT}
          isPrimaryButtonLoading={loading}
          setIsPrimaryButtonLoading={setLoading}
          secondaryButton={
            user.mfa_type === 'sms'
              ? {
                  label: codeSent ? 'Send New Code' : 'Send Code',
                  theme: 'gray',
                  loading: sendingNewCode,
                  onClick: handleSendCode
                }
              : null
          }
        />
      </ModalFooter>
    </form>
  )
}
