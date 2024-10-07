import React, { useState, useEffect } from 'react'
import AppleLogin from 'react-apple-login'
import GoogleLogin from '@leecheuk/react-google-login'
import {
  appleClientId,
  appleRedirectUrl,
  googleClientId
} from '@/config'
import { SIGNUP_TYPES } from '@/enum'
import { Icon } from '@/components'
import Button from '@/components/Button'
import { useRouter } from 'next/router'

export default function SocialLogins({ handleSocialLogin }) {
  const [envState, setEnvState] = useState('')

  const { query, isReady } = useRouter()

  useEffect(() => {
    const state = window.location.hostname.replace(/.droppp.io/g, '')
    setEnvState(state)
  }, [])

  useEffect(() => {
    if (!isReady) return

    if (query.code) {
      handleSocialLogin(query.code, SIGNUP_TYPES.APPLE)
    }
  }, [query])

  const responseGoogle = data => {
    handleSocialLogin(data.code, SIGNUP_TYPES.GOOGLE)
  }

  return (
    <>
      <AppleLogin
        clientId={appleClientId}
        redirectURI={appleRedirectUrl}
        scope="email"
        responseMode="form_post"
        responseType="code"
        state={envState}
        render={renderProps => (
          <Button
            className="w-full mt-2"
            theme="gray"
            onClick={renderProps.onClick}
          >
            <div className="flex">
              <Icon className="mr-1" name="apple" />
              Continue with Apple
            </div>
          </Button>
        )}
      />
      <GoogleLogin
        clientId={googleClientId}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
        responseType="code"
        render={renderProps => (
          <Button
            className="w-full mt-2"
            theme="gray"
            disabled={renderProps.disabled}
            onClick={renderProps.onClick}
          >
            <div className="flex">
              <Icon className="mr-1" name="google" />
              Continue with Google
            </div>
          </Button>
        )}
      />
    </>
  )
}
