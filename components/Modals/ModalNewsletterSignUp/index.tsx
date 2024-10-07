import React, { useState } from 'react'
import { useAuth } from '@/contexts/auth'
import { Input, Icon, Button } from '@/components'
import Modal from '@/components/Modals/Modal'
import styles from './styles.module.scss'
import { useSubscribeNewsletter } from '@/hooks/useSubscribeNewsletter'
import ErrorBox from '@/components/ErrorBox'
import { ApiError } from '@/api/core/errors'
import { setUserPreferences } from '@/api/resources/user/preferences/set'
import { tryApiAction } from '@/api/core/compat'
import { UserPreferencesSetResponse } from '@/api/resources/user/preferences/set/schema'
import { sendGTMEvent } from '@next/third-parties/google'

const ModalNewsletterSignUp = ({ open, onClose }) => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<ApiError>(null)
  const { user, notifications } = useAuth()

  const { isRelayedEmail, isSubscriptionUpdating, updateSubscription } =
    useSubscribeNewsletter({
      onUpdateSuccess: () => {
        handleClose()
        sendGTMEvent({
          event : 'newsletter_signup',
          source : 'modal'
        })
      },
      onUpdateFailure: (error: ApiError) => setError(error)
    })

  const handleClose = async () => {
    if (notifications.prompt_subscribe) {
      await tryApiAction<UserPreferencesSetResponse>(() =>
        setUserPreferences({ subscribe_prompted: true })
      )
    }
    onClose()
  }

  const handleChangeEmail = value => {
    setEmail(value)
    setError(null)
  }

  const requestSubscribe = async e => {
    e.preventDefault()
    const subscribeEmail = isRelayedEmail ? email : user?.email
    updateSubscription(true, subscribeEmail)
  }

  const renderContent = () => {
    return (
      <div className={styles.container}>
        <div className={styles.hero}>
          <Icon className={styles.logo} name="logo-newsletter" />
        </div>
        <div className={styles.content}>
          <ErrorBox className="mb-2" error={error} />
          <div className={styles.title}>Catch Every Drop</div>
          <div className={styles.description}>
            Sign up to receive announcements, news, and alerts on upcoming drops
            and redemptions.
          </div>
          <form onSubmit={requestSubscribe}>
            {isRelayedEmail && (
              <Input
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleChangeEmail}
              />
            )}
            <Button
              className="w-full mt-2"
              size="lg"
              disabled={isRelayedEmail && !email}
              loading={isSubscriptionUpdating}
              type="submit"
            >
              Join Mailing List
            </Button>
          </form>
          <Button
            className="block text-gray-500 underline mx-auto mt-1"
            theme="clean"
            onClick={handleClose}
          >
            No, Thanks
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Modal
      className={styles.modalContainer}
      open={open}
      renderContent={renderContent}
      onClose={handleClose}
    />
  )
}

export default ModalNewsletterSignUp
