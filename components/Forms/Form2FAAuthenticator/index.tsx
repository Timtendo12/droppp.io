import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import useBreakpoints from '@/hooks/useBreakpoints'
import { InputVerification, Toast } from '@/components'
import Button from '@/components/Button'
import RoundedBox from '@/components/RoundedBox'
import { Error } from '@/api/resources/shared/error'
import ErrorBox from '@/components/ErrorBox'
import { tryApiAction } from '@/api/core/compat'
import { user2FAConfig } from '@/api/resources/user/2fa/config'
import { setup2faVerifyCode } from '@/api/resources/user/2fa/verify'
import { removeTokenScope } from '@/util/cookieHelpers'
import CopyButton from '@/components/Button/CopyButton'
import { Controller, useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

export const Form2FAAuthenticatorButtonLabel = 'Continue'

const Form2FAAuthenticator = ({
  onContinue,
  withModal = false,
  onCodeSent,
  codeSent,
  onCodeChange = null,
  onError = null,
  getCode = false,
  sendCode = false
}) => {
  const [token, setToken] = useState<string>()
  const [qrImg, setQRImg] = useState<string>()
  const [code, setCode] = useState('')
  const [error, setError] = useState<Error>(null)
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const { isMobile } = useBreakpoints()

  // Lifecycle //////////////////////////////////////////////////////////////

  useEffect(() => {
    const initTwoFa = async () => {
      setLoading(true)
      const { success, data } = await tryApiAction(() => user2FAConfig())
      if (success) {
        setToken(data.token)
        setQRImg(data.image)
      } else {
        setError(data)
      }
      setLoading(false)
    }
    initTwoFa()
  }, [])

  useEffect(() => {
    if (getCode) handleGetCode()
  }, [getCode])

  useEffect(() => {
    if (sendCode) handleContinue()
  }, [sendCode])

  useEffect(() => {
    const isDisabled = code?.length !== 6
    setDisabled(isDisabled)
    setError(null)
    onCodeChange && onCodeChange(isDisabled)
  }, [code])

  // Handlers ///////////////////////////////////////////////////////////////

  const handleError = (error: Error) => {
    setError(error)
    onError?.()
  }

  const handleGetCode = () => onCodeSent?.(true)

  const handleContinue = async () => {
    const { success, data } = await tryApiAction(() =>
      setup2faVerifyCode(code, 'enable')
    )
    success && removeTokenScope()
    return success ? onContinue(data.recovery_phrase) : handleError(data)
  }

  // Render /////////////////////////////////////////////////////////////////

  if (codeSent) {
    return (
      <div className="mt-2">
        <div className="body text-gray-300">
          Enter the code from your authentication app to make sure everything is
          working correctly.
        </div>
        <div className="h7 mt-3">6-Digit Code</div>
        <InputVerification className="mt-2" onChange={setCode} />
        <ErrorBox className="mt-2" error={error} />
        {!withModal && (
          <Button
            className="w-full mt-3"
            size="lg"
            loading={loading}
            disabled={disabled}
            onClick={handleContinue}
          >
            Continue
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="mt-2">
      <div className="body text-gray-300">
        Open your authentication app and{' '}
        {isMobile ? 'add the code below.' : 'scan this QR code.'}
      </div>
      {!isMobile && (
        <div
          className="w-[156px] mt-3 mx-auto"
          dangerouslySetInnerHTML={{ __html: qrImg }}
        />
      )}
      <RoundedBox
        className={classNames('!px-3 !py-2 mt-3', {
          '!bg-gray-800': withModal
        })}
      >
        <div className="body text-gray-500">
          {isMobile
            ? 'Copy the code below:'
            : 'Or enter the following code manually:'}
        </div>
        <div className="flex items-center justify-between gap-1 mt-half utility">
          {token}
          <CopyButton
            valueToCopy={token}
            size="sm"
            className="relative before:absolute before:-inset-2"
          />
        </div>
      </RoundedBox>
      <div className="body text-gray-500 mt-3">
        Once registered you’ll start seeing 6-digit verification codes in the
        app.
      </div>
      {!withModal && (
        <Button
          className="w-full mt-3"
          size="lg"
          loading={loading}
          onClick={handleGetCode}
        >
          {Form2FAAuthenticatorButtonLabel}
        </Button>
      )}
    </div>
  )
}

export default Form2FAAuthenticator

export const AuthenticatorSetup = ({
  ModalBody,
  ModalFooter,
  onContinue,
  isChildOfModal = true
}) => {
  const { isMobile } = useBreakpoints()

  const [token, setToken] = useState('')
  const [qrImg, setQRImg] = useState('')

  useEffect(() => {
    const initTwoFa = async () => {
      const { success, data } = await tryApiAction(() => user2FAConfig())
      if (success) {
        setToken(data.token)
        setQRImg(data.image)
      }
    }
    initTwoFa()
  }, [])

  return (
    <>
      <ModalBody>
        <div className="mt-2">
          <div className="body text-gray-300">
            Open your authentication app and{' '}
            {isMobile ? 'add the code below.' : 'scan this QR code.'}
          </div>
          {!isMobile && (
            <div
              className="w-[156px] h-[156px] mt-3 mx-auto"
              dangerouslySetInnerHTML={{ __html: qrImg }}
            />
          )}
          <RoundedBox
            className={classNames('!px-3 !py-2 mt-3', {
              '!bg-gray-800': isChildOfModal
            })}
          >
            <div className="body text-gray-500">
              {isMobile
                ? 'Copy the code below:'
                : 'Or enter the following code manually:'}
            </div>
            <div className="flex items-center justify-between gap-1 mt-half utility">
              {token}
              <CopyButton
                valueToCopy={token}
                size="sm"
                className="relative before:absolute before:-inset-2"
              />
            </div>
          </RoundedBox>
          <div className="body text-gray-500 mt-3">
            Once registered you’ll start seeing 6-digit verification codes in
            the app.
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button className="w-full" onClick={onContinue}>
          Continue
        </Button>
      </ModalFooter>
    </>
  )
}

export const TwoFaAuthenticator = ({ ModalBody, ModalFooter, onContinue }) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, isValid, errors }
  } = useForm()

  const onSubmit = async formData => {
    const { success, data } = await tryApiAction(() =>
      setup2faVerifyCode(formData.code, 'enable')
    )
    if (data.status === 'ok') {
      success && removeTokenScope()
      onContinue?.(data.recovery_phrase)
    } else {
      setError('code', { message: data.errorMessage })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalBody>
        <div className="space-y-3">
          <div className="body text-gray-300">
            Enter the code from your authentication app to make sure everything
            is working correctly.
          </div>
          <div className="h7">6-Digit Code</div>
          <Controller
            name="code"
            control={control}
            rules={{
              required: 'Code is required',
              minLength: { value: 6, message: 'Code must be 6 digits' }
            }}
            render={({ field }) => (
              <InputVerification className="mt-2" onChange={field.onChange} />
            )}
          />
          <ErrorMessage
            errors={errors}
            name="code"
            render={({ message }) => (
              <Toast className="mt" type="warning" inline>
                {message}
              </Toast>
            )}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          loading={isSubmitting}
          disabled={!isValid}
          type="submit"
          className="w-full"
        >
          {Form2FAAuthenticatorButtonLabel}
        </Button>
      </ModalFooter>
    </form>
  )
}
