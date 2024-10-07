import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { useState } from 'react'
import { useAuth } from '@/contexts/auth'
import { getParameterByName } from '@/util/queryHelpers'
import { Button, Input } from '@/components'
import { useSubscribeNewsletter } from '@/hooks/useSubscribeNewsletter'
import ErrorBox from '@/components/ErrorBox'
import { ApiError } from '@/api/core/errors'
import { sendGTMEvent } from '@next/third-parties/google'

export default function FormNewsletterSubscribe() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<ApiError>(null)
  const router = useRouter()
  const { user, getReturnUri } = useAuth()

  const { isRelayedEmail, isSubscriptionUpdating, updateSubscription } =
    useSubscribeNewsletter({
      onUpdateSuccess: () => {
        sendGTMEvent({
          event : 'newsletter_signup',
          source : 'onboarding'
        })

        router.push(nextRoute)
      },
      onUpdateFailure: (err: ApiError) => setError(err)
    })

  const returnUri = getReturnUri()
  let nextRoute = '/wallet-address'
  if (returnUri) {
    const claimType = getParameterByName('claimType', returnUri)
    if (claimType === 'walmart') {
      nextRoute = '/setup-2fa'
    }
  }

  const handleChangeEmail = value => {
    setEmail(value)
    setError(null)
  }

  const requestSubscribe = async event => {
    event.preventDefault()
    const subscribeEmail = isRelayedEmail
      ? event.target.email.value
      : user.email
    updateSubscription(true, subscribeEmail)
  }

  return (
    <form onSubmit={requestSubscribe}>
      <ErrorBox className="mt-2" error={error} />
      {isRelayedEmail && (
        <Input
          className="mt-3"
          name="email"
          placeholder="Enter Email"
          value={email}
          onChange={handleChangeEmail}
        />
      )}
      <Button
        className="w-full mt-3"
        size="lg"
        loading={isSubscriptionUpdating}
        disabled={isRelayedEmail && !email}
        type="submit"
      >
        Join Mailing List
      </Button>
      <div className="body-sm text-center mt-3">
        <Link className="underline" href={nextRoute}>
          Skip for now
        </Link>
      </div>
    </form>
  )
}
