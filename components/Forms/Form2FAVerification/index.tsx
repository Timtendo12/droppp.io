import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import { Input2FACode, Toast, Button } from '@/components'
import { setup2faSMSSend } from '@/api/resources/user/2fa/sms/send'
import { tryApiAction } from '@/api/core/compat'
import { removeTokenScope } from '@/util/cookieHelpers'
import { setup2faVerifyCode } from '@/api/resources/user/2fa/verify'
import { getReturnUri, removeReturnUri } from '@/contexts/auth/cookies'
import { Controller, useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

interface Props {
  showsRecoveryPhraseOption: boolean
}

export default function Form2FAVerification({
  showsRecoveryPhraseOption = true
}: Props) {
  const hasUsedPhraseRef = useRef(false)

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting, isValid, errors }
  } = useForm()

  const router = useRouter()
  const { type } = router.query

  const handleSendCode = async () => {
    const { data } = await tryApiAction(() => setup2faSMSSend('login'))
    if (data.status === 'ok') {
      Toast({
        type: 'success',
        title: 'Success',
        description: 'A code was sent via SMS to your phone.'
      })
    } else {
      setError('code', { message: data.errorMessage })
    }
  }

  const handleConfirmCode = async formData => {
    const { data } = await tryApiAction(() =>
      setup2faVerifyCode(formData.code, 'login')
    )

    if (data.status === 'ok') {
      removeTokenScope()
      const { redirect_uri, user } = JSON.parse(Cookies.get('login-response'))
      const returnUri = getReturnUri()

      if (redirect_uri) {
        window.location.href = redirect_uri
        return
      }

      if (!user.email_verified) {
        return router.push('/email-verification')
      }

      if (hasUsedPhraseRef.current) {
        return router.push('/account/?phraseUsed=true')
      }

      if (returnUri) {
        removeReturnUri()
        return router.replace(returnUri)
      }

      router.push('/inventory')
    } else {
      setError('code', { message: data.errorMessage })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleConfirmCode)} className="space-y-3">
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <Input2FACode
              secondaryLinkStyle={
                showsRecoveryPhraseOption ? 'phrase' : 'contactSupport'
              }
              onChange={(code, isValid, isPhrase) => {
                hasUsedPhraseRef.current = isPhrase
                field.onChange(code)
              }}
            />
          )}
        />

        <ErrorMessage
          errors={errors}
          name="code"
          render={({ message }) => (
            <Toast type="warning" inline>
              {message}
            </Toast>
          )}
        />

        <div className="flex gap-2">
          {type === 'sms' && (
            <Button
              className="w-full"
              size="lg"
              theme="gray"
              onClick={handleSendCode}
            >
              Send Code
            </Button>
          )}
          <Button
            className={'w-full'}
            size="lg"
            disabled={!isValid}
            loading={isSubmitting}
            type="submit"
          >
            Confirm
          </Button>
        </div>
        <div className="text-center">
          <Link className="body-sm underline" href="/auth">
            Other Options
          </Link>
        </div>
      </form>
    </>
  )
}
