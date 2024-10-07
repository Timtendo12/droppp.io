import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { useState, useEffect, ReactNode } from 'react'
import { useAuth } from '@/contexts/auth'
import { Input2FACode, Toast, Loading } from '@/components'
import Button from '@/components/Button'
import ModalStateGraphic, {
  ModalStateGraphicTheme
} from '@/components/Modals/ModalV2/ModalStateGraphic'
import RoundedBox from '@/components/RoundedBox'
import ErrorBox from '@/components/ErrorBox'
import { useUserSupportAuthMutation } from '@/api/resources/user/support/auth'
import { ApiError } from '@/api/core/errors'
import { setup2faSMSSend } from '@/api/resources/user/2fa/sms/send'
import { tryApiAction } from '@/api/core/compat'
import { Error } from '@/api/resources/shared/error'

type Detail = {
  title: string
  description: ReactNode
  icon: string
  theme?: ModalStateGraphicTheme
}

export default function FormSupportAuth() {
  const [mfaRequired, setMfaRequired] = useState(false)
  const [code, setCode] = useState()
  const [codeSent, setCodeSent] = useState(false)
  const [sendingNewCode, setSendingNewCode] = useState(false)
  const [isValidCode, setIsValidCode] = useState(false)
  const [error, setError] = useState<Error>(null)

  const { user } = useAuth()
  const router = useRouter()
  const { token } = router.query

  const { mutate: supportAuthRequest, isLoading } = useUserSupportAuthMutation(
    token?.toString(),
    {
      onSuccess: () => {
        setMfaRequired(false)
        setError(null)
      },
      onError: (err: ApiError) => {
        !code && setMfaRequired(err.originalResponse.mfa_required)

        if (err.originalResponse.mfa_required) {
          Toast({
            type: 'success',
            title: 'Success',
            description: 'A code was sent via SMS to your phone.'
          })
        } else {
          setError(err)
        }
      }
    }
  )

  useEffect(() => {
    !!token && supportAuthRequest({})
  }, [token])

  if (!token || (!code && isLoading)) {
    return <Loading />
  }

  const handleComplete = async event => {
    event.preventDefault()
    supportAuthRequest({ code })
  }

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

  const detail: Detail = {
    title: 'Your Account Has Been Verified!',
    description:
      'Thank you for authenticating your account. You may close this tab and continue your conversation with support.',
    icon: 'tick',
    theme: 'default'
  }

  if (error) {
    detail.title = 'Verification Unsuccessful'
    detail.description = error.errors?.generic
    detail.icon = 'exclamation'
    detail.theme = 'error'
  }

  if (mfaRequired) {
    detail.title = '2-Step Verification Required'
    detail.description = (
      <>
        Please enter the 6-digit code{' '}
        {user.mfa_type === 'sms' ? (
          <>
            sent to the phone number ending in <b>{user.mfa_phone_last4}</b>
          </>
        ) : (
          'provided via your authenticator app'
        )}
        .
      </>
    )
    detail.icon = 'lock'
    detail.theme = 'default'
  }

  return (
    <div className="flex items-center m-auto min-h-[calc(var(--height)-175px)] max-w-full md:max-w-[475px] max-md:px-3">
      <RoundedBox className="text-center">
        <ModalStateGraphic
          icon={detail.icon}
          className="mx-auto"
          theme={detail.theme as ModalStateGraphicTheme}
        />
        <div className="h4 mt-3">{detail.title}</div>
        <div className="mt-2 body text-gray-300">{detail.description}</div>
        {mfaRequired && (
          <form className="w-full" onSubmit={handleComplete}>
            <Input2FACode
              secondaryLinkStyle="none"
              onChange={handleChangeCode}
            />
            <ErrorBox className="mt-2" error={error} />
            <div className="flex mt-2">
              {user.mfa_type === 'sms' && (
                <Button
                  className="w-full"
                  size="lg"
                  theme="gray"
                  loading={sendingNewCode}
                  onClick={handleSendCode}
                >
                  {codeSent ? 'Send New Code' : 'Send Code'}
                </Button>
              )}
              <Button
                className={classNames('w-full', {
                  'ml-2': user.mfa_type === 'sms'
                })}
                size="lg"
                disabled={!isValidCode}
                loading={isLoading}
                type="submit"
              >
                Confirm
              </Button>
            </div>
          </form>
        )}
      </RoundedBox>
    </div>
  )
}
