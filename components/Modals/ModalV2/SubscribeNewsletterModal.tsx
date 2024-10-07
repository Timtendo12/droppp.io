import NiceModal, { useModal } from '@ebay/nice-modal-react'
import React, { useState } from 'react'
import { MODAL_ID } from '@/constants/modalId'
import Button from '@/components/Button'
import { Input } from '@/components/Inputs'
import Toast from '@/components/Toast'
import BooleanModal from './BooleanModal'
import { useSubscribeNewsletter } from '@/hooks/useSubscribeNewsletter'
import ErrorBox from '@/components/ErrorBox'

const notifySubscribed = () => {
  Toast({
    type: 'success',
    description: `Subscribed to Marketing & Promotions`
  })
}

const notifyUnsubscribed = () => {
  Toast({
    type: 'success',
    description: `Unsubscribed from Marketing & Promotions`
  })
}

const SubscribeNewsletterModal = NiceModal.create(() => {
  const { hide } = useModal()
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)

  const { isSubscribed, updateSubscriptionAsync } = useSubscribeNewsletter()

  const handleChangeEmail = (value: any) => {
    setEmail(value)
    setError(null)
  }

  const handleError = (error: unknown) => {
    setError(error)
    return Promise.reject()
  }

  const handleSubscribeClick = async () => {
    try {
      await updateSubscriptionAsync(true, email)
      notifySubscribed()
    } catch (error: unknown) {
      return handleError(error)
    }
  }

  const handleUnsubscribeClick = async () => {
    try {
      await updateSubscriptionAsync(false)
      notifyUnsubscribed()
      await hide()
    } catch (error: unknown) {
      return handleError(error)
    }
  }

  const heading = isSubscribed
    ? 'Change Email For Marketing & Promotions'
    : 'Subscribe to Marketing & Promotions'

  const callToAction = !isSubscribed ? (
    <div className="body text-gray-300 mt-2">
      Be notified about new features (many are coming soon), upcoming drops,
      promotions, and more!
    </div>
  ) : null

  const emailLabel = isSubscribed ? 'New Email' : 'Email'

  const primaryButton = {
    label: 'Apply',
    disabled: !email,
    onClick: handleSubscribeClick
  }

  const subFooter = isSubscribed ? (
    <Button
      className="block !mx-auto !mt-3 utility-alt text-error max-md:underline"
      theme="clean"
      onClick={handleUnsubscribeClick}
    >
      Unsubscribe From All Marketing Communications
    </Button>
  ) : null

  return (
    <BooleanModal
      id={MODAL_ID.subscribeNewsletter}
      primaryButton={primaryButton}
      subFooter={subFooter}
      notifyOnPromiseRejection={false}
    >
      <div className="h4">{heading}</div>
      {callToAction}
      <div className="h7 mt-3">{emailLabel}</div>
      <Input
        className="mt-1"
        name="email"
        placeholder="Type Email Address"
        value={email}
        onChange={handleChangeEmail}
      />
      <ErrorBox className="mt-2" error={error} />
    </BooleanModal>
  )
})

export default SubscribeNewsletterModal
