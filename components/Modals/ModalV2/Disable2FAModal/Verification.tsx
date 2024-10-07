import React, { useState } from 'react'
import { useAuth } from '@/contexts/auth'
import { Input2FACode, Button } from '@/components'
import ModalStateGraphic from '@/components/Modals/ModalV2/ModalStateGraphic'
import ErrorBox from '@/components/ErrorBox'
import { tryApiAction } from '@/api/core/compat'
import { setup2faVerifyCode } from '@/api/resources/user/2fa/verify'
import { removeTokenScope } from '@/util/cookieHelpers'
import { Error } from '@/api/resources/shared/error'

const Verification = ({ onContinue, ModalBody, ModalFooter }) => {
  const [code, setCode] = useState()
  const [error, setError] = useState<Error>(null)
  const [loading, setLoading] = useState(false)
  const [isValidCode, setIsValidCode] = useState(false)
  const { user } = useAuth()

  const handleChangeCode = (value, isValid) => {
    setCode(value)
    setIsValidCode(isValid)
    setError(null)
  }

  const handleComplete = async event => {
    event.preventDefault()

    setLoading(true)
    const { success, data } = await tryApiAction(() =>
      setup2faVerifyCode(code, 'disable')
    )
    setLoading(false)

    if (success) {
      removeTokenScope()
      onContinue()
    } else {
      setError(data)
    }
  }

  return (
    <form className="text-center" onSubmit={handleComplete}>
      <ModalBody>
        <ModalStateGraphic icon="lock" className="mx-auto" />
        <div className="h4 mt-3">2-Step Verification Required</div>
        <div className="mt-2 body text-gray-300">
          Please enter the 6-digit code{' '}
          {user.mfa_type === 'sms' ? (
            <>
              sent to the phone number ending in{' '}
              <b className="text-white">{user.mfa_phone_last4}</b>
            </>
          ) : (
            <>provided by your authenticator app</>
          )}{' '}
          or recovery phrase.
        </div>
        <Input2FACode onChange={handleChangeCode} />
        <ErrorBox className="mt-2" error={error} />
      </ModalBody>
      <ModalFooter>
        <Button
          className="w-full"
          disabled={!isValidCode}
          loading={loading}
          type="submit"
        >
          Continue
        </Button>
      </ModalFooter>
    </form>
  )
}

export default Verification
