import NiceModal from '@ebay/nice-modal-react'
import Button from '@/components/Button'
import { MODAL_ID } from '@/constants/modalId'
import Toggle from '@/components/Toggle'
import Toast from '@/components/Toast'
import { useSubscribeNewsletter } from '@/hooks/useSubscribeNewsletter'
import { sendGTMEvent } from '@next/third-parties/google'

const notifySubscribed = () => {
  Toast({
    type: 'information',
    title: 'Subscribed',
    description: `You have been subscribed to our marketing and promotions newsletter.`
  })

  sendGTMEvent({
    event : 'newsletter_signup',
    source : 'account'
  })
}

const notifyUnsubscribed = () => {
  Toast({
    type: 'information',
    title: 'Unsubscribed',
    description: `You have been unsubscribed from our marketing and promotions newsletter.`
  })
}

export const Communications = () => {
  const subscribeNewsletter = useSubscribeNewsletter({
    onUpdateSuccess: (subscribed: boolean) =>
      subscribed ? notifySubscribed() : notifyUnsubscribed()
  })

  const {
    isSubscriptionLoading,
    isSubscribed,
    isAppleRelayedEmail,
    emailAddress,
    updateSubscription
  } = subscribeNewsletter

  const handleToggleChange = (event: any) => {
    event.preventDefault()
    updateSubscription(!isSubscribed, emailAddress)
  }

  const handleChangeSubscriptionClick = () =>
    NiceModal.show(MODAL_ID.subscribeNewsletter).then()

  const message =
    isAppleRelayedEmail && !!emailAddress
      ? `All features, upcoming drops, promotions, etc will be sent to: ${emailAddress}`
      : 'Be notified about new features (many are coming soon), upcoming drops, promotions, and more!'

  const subscribeButton = isAppleRelayedEmail ? (
    <Button theme="clean-blue" onClick={handleChangeSubscriptionClick}>
      {emailAddress ? 'Change' : 'Subscribe'}
    </Button>
  ) : (
    <Toggle checked={isSubscribed} onChange={handleToggleChange} />
  )

  const content = !isSubscriptionLoading ? (
    <div className="flex justify-between items-center mt-1 body text-gray-400 gap-2">
      <div>{message}</div>
      {subscribeButton}
    </div>
  ) : null

  return (
    <>
      <div className="h5">Communications</div>
      <div className="h7 mt-3">Marketing & Promotions</div>
      {content}
    </>
  )
}
