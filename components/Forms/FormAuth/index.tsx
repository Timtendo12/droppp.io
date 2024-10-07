import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { UnmountClosed } from 'react-collapse'
import { useAuth } from '@/contexts/auth'
import { AUTH_TYPES, SIGNUP_TYPES } from '@/enum'
import { getParameterByName } from '@/util/queryHelpers'
import { Input, Separator, Toast } from '@/components'
import Button from '@/components/Button'
import Turnstile from '@/components/Turnstile'
import styles from './styles.module.scss'
import { useForm } from 'react-hook-form'
import { emailRegex } from '@/constants'
import Field from '@/components/Field'
import ErrorBox from '@/components/ErrorBox'
import { TurnstileInstance } from '@marsidev/react-turnstile'
import SocialLogins from './SocialLogins'
import { POSLinks } from './POSLinks'
import { useUserEmailCheckMutation } from '@/api/resources/user/email/check'
import { ApiError } from '@/api/core/errors'
import { useEmailVerifySendMutation } from '@/api/resources/user/email/verify/send'

const INPUTS = {
  email: 'email',
  password: 'password'
}

const INPUT_VALIDATORS = {
  required: {
    required: 'This field is required'
  },
  pattern: {
    pattern: {
      value: emailRegex,
      message: 'Invalid email address.'
    }
  },
  maxLength: {
    maxLength: {
      value: 1024,
      message: 'Password should be 8 to 1024 characters in length.'
    }
  },
  minLength: {
    minLength: {
      value: 8,
      message: 'Password should be 8 to 1024 characters in length.'
    }
  }
}

export default function FormAuth() {
  const [authType, setAuthType] = useState(null)
  const [captchaToken, setCaptchaToken] = useState(null)
  const [error, setError] = useState<ApiError>()
  const [claimWarn, setClaimWarn] = useState(false)
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false)
  const [instructionSentSuccess, setInstructionSentSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const refTurnstile = useRef<TurnstileInstance>()
  const {
    fetchUser,
    loginEmail,
    signup,
    loginApple,
    loginGoogle,
    setReturnUri,
    getReturnUri,
    setOauthData,
    getOauthData,
    removeOauthData
  } = useAuth()

  const { mutate: userEmailCheckMutation, isLoading } =
    useUserEmailCheckMutation({
      onSuccess: data => {
        const { registered } = data
        setAuthType(registered ? AUTH_TYPES.LOGIN : AUTH_TYPES.SIGNUP)
      },
      onError: (err: ApiError) => setError(err)
    })

  const { mutate: emailVerifySendMutation } = useEmailVerifySendMutation({
    onSuccess: () => router.push('/email-verification'),
    onError: (err: ApiError) => setError(err)
  })

  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitSuccessful }
  } = useForm({
    mode: 'onTouched'
  })

  const email = watch(INPUTS.email)

  const router = useRouter()
  const {
    return_uri,
    client_id,
    redirect_uri,
    scope,
    state,
    passwordReset,
    instructionSent
  } = router.query

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ keepValues: true })
    }
  }, [isSubmitSuccessful, reset])

  useEffect(() => {
    const handleRouterQuery = async () => {
      if (!router.isReady) return

      setPasswordResetSuccess(!!passwordReset)
      setInstructionSentSuccess(!!instructionSent)

      if (return_uri) {
        setReturnUri(return_uri)

        const claimCode = getParameterByName('claimCode', return_uri.toString())
        setClaimWarn(!!claimCode)
      }

      let requestData = {}

      if (redirect_uri) {
        requestData = {
          client_id,
          redirect_uri,
          scope,
          state
        }
        setOauthData(requestData)
      }

      handleAuthRequest(fetchUser, requestData, true)
    }
    handleRouterQuery()
  }, [router.query])

  const handleSocialLogin = (code, type) => {
    if (!code) return

    const request = type === SIGNUP_TYPES.APPLE ? loginApple : loginGoogle
    const { client_id, redirect_uri, scope, state } = getOauthData() || {}
    const requestData = { code, client_id, redirect_uri, scope, state }

    handleAuthRequest(request, requestData)
  }

  const handleSubmitAuth = async data => {
    setPasswordResetSuccess(false)
    setError(null)

    const { email, password } = data
    if (!authType) {
      if (!captchaToken) {
        Toast({
          type: 'warning',
          description: 'Captcha missing. Please refresh and try again.'
        })
        return
      }
      userEmailCheckMutation({
        email,
        captcha_token: captchaToken
      })
      return
    }

    const request = authType === AUTH_TYPES.LOGIN ? loginEmail : signup
    const requestData = {
      email,
      password,
      client_id,
      redirect_uri,
      scope,
      state,
      captcha_token: captchaToken
    }

    handleAuthRequest(request, requestData)
  }

  const handleAuthRequest = async (request, requestData, silently = false) => {
    setLoading(true)
    const { success, data } = await request(requestData)
    setLoading(false)

    if (success) {
      const { redirect_uri, user, mfa_required, email_code_required } = data
      const returnUri = getReturnUri()

      if (!user.email_verified) {
        emailVerifySendMutation()
        return
      }

      if (user.is_new_user) {
        return router.push('/newsletter-subscribe')
      }

      if (mfa_required || email_code_required) {
        Cookies.set('login-response', data)
        router.pathname = 'two-fa'
        router.query.type = user.mfa_type

        if (user.mfa_type == 'sms') {
          router.query.phoneLast4 = user.mfa_phone_last4
        }

        return router.push(router)
      }

      if (redirect_uri) {
        removeOauthData()
        window.location.href = redirect_uri
        return
      }

      if (returnUri) {
        return router.replace(returnUri)
      }

      router.push('/inventory')
    } else {
      if (instructionSentSuccess) {
        router.replace('/auth', undefined, { shallow: true })
      }
      !silently && setError(data)
      !authType && refTurnstile.current?.reset()
    }
  }

  const title =
    authType === AUTH_TYPES.LOGIN
      ? 'Sign In'
      : authType === AUTH_TYPES.SIGNUP
      ? 'Sign Up'
      : 'Sign In / Sign Up'

  return (
    <div className="w-full">
      {claimWarn && (
        <Toast type="information" inline>
          To claim your promotional NFT, please sign in or create a free Droppp
          account.
        </Toast>
      )}
      <div className="h4 mt-4">{title}</div>
      <ErrorBox className="mt-2" error={error} />
      {passwordResetSuccess && (
        <Toast type="success" inline className="mt-2">
          Your password has been reset. Please login below.
        </Toast>
      )}
      {instructionSentSuccess && (
        <Toast
          type="success"
          inline
          className="mt-2"
          title="Reset Instructions Sent"
        >
          If you don&apos;t receive the email shortly, please verify that you
          entered your email correctly, or check your spam/junk folder.
        </Toast>
      )}
      <form className="mt-3" onSubmit={handleSubmit(handleSubmitAuth)}>
        <Field
          errorClassName="text-white body-xs mt-[6px] ml-2"
          name={INPUTS.email}
          errors={errors}
        >
          <Input
            register={register(INPUTS.email, {
              ...INPUT_VALIDATORS['required'],
              ...INPUT_VALIDATORS['pattern']
            })}
            id={INPUTS.email}
            type="email"
            placeholder="Enter Email"
            hasError={errors[INPUTS.email]}
          />
        </Field>
        {!authType && (
          <Turnstile
            ref={refTurnstile}
            className="mt-3"
            theme="dark"
            onSuccess={token => setCaptchaToken(token)}
          />
        )}
        <UnmountClosed
          isOpened={authType}
          theme={{ collapse: styles.collapse }}
        >
          {authType && (
            <Field
              errorClassName="text-white body-xs mt-[6px] ml-2"
              name={INPUTS.password}
              errors={errors}
            >
              <Input
                className="mt-2"
                register={register(INPUTS.password, {
                  ...INPUT_VALIDATORS['required'],
                  ...INPUT_VALIDATORS['minLength'],
                  ...INPUT_VALIDATORS['maxLength']
                })}
                id={INPUTS.password}
                placeholder="Password"
                type="password"
                hasError={errors[INPUTS.password]}
              />
            </Field>
          )}
          {authType === AUTH_TYPES.SIGNUP && (
            <POSLinks authType={AUTH_TYPES.SIGNUP} />
          )}
        </UnmountClosed>
        <Button
          className="w-full mt-3"
          size="lg"
          type="submit"
          loading={loading || isLoading}
        >
          Continue
        </Button>
      </form>
      <div className="text-center mt-2">
        {authType === AUTH_TYPES.LOGIN ? (
          <Link
            className="body-sm underline"
            href={`/password/forgot?email=${encodeURIComponent(email)}`}
          >
            Forgot Password
          </Link>
        ) : authType === AUTH_TYPES.SIGNUP ? (
          <Button
            className="body-sm underline"
            theme="clean"
            onClick={() => setAuthType(null)}
          >
            Other Options
          </Button>
        ) : (
          <>
            <POSLinks />
            <Separator className="py-3" text="or" />
            <SocialLogins handleSocialLogin={handleSocialLogin} />
          </>
        )}
      </div>
    </div>
  )
}
