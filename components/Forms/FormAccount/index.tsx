import NiceModal from '@ebay/nice-modal-react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAuth } from '@/contexts/auth'
import { MODAL_ID } from '@/constants/modalId'
import { Button, Toast, Separator } from '@/components'
import RoundedBox from '@/components/RoundedBox'
import InformationBox from '@/components/InformationBox'
import { Communications } from './Communications'

export default function FormAccount() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const { confirmEmail, phraseUsed } = router.query
    confirmEmail &&
      Toast({
        type: 'success',
        title: 'Verified!',
        description: 'Your email address has been verified',
        onClose: () => {
          delete router.query.confirmEmail
          router.push(router)
        }
      })

    phraseUsed &&
      !user.mfa_type &&
      NiceModal.show(MODAL_ID.enable2FA, {
        phraseUsed,
        onCancel: () => {
          delete router.query.phraseUsed
          router.push(router)
        },
        onComplete: async () => {
          delete router.query.phraseUsed
          await router.push(router)
          router.reload()
        }
      })
  }, [router.query])

  if (!user) return null

  return (
    <div className="md:max-w-[600px] py-0 px-2 md:m-auto">
      <RoundedBox>
        <div className="h4">Account</div>
        <div className="h7 mt-3">Email Address</div>
        <div className="flex justify-between items-center mt-1 gap-2 body text-gray-400">
          <div>
            Your email address is{' '}
            <span className="text-white">{user.email}</span>
          </div>
          {!user.oauth_provider && (
            <Button
              theme="clean-blue"
              onClick={() => NiceModal.show(MODAL_ID.changeEmail)}
            >
              Change
            </Button>
          )}
        </div>
        {user.oauth_provider ? (
          <InformationBox
            className="mt-2"
            icon={user.oauth_provider}
            title={
              user.oauth_provider === 'apple' ? ' Apple ID' : ' Google Account'
            }
          >
            Your Droppp account was created using
            {user.oauth_provider === 'apple'
              ? ' Sign in with Apple. '
              : ' Continue with Google. '}
            To change your email/password, you will need to update your
            {user.oauth_provider === 'apple'
              ? ' Apple ID on icloud.com.'
              : ' Google Account on google.com.'}
          </InformationBox>
        ) : (
          <>
            <Separator className="my-3" />
            <div className="h7">Password</div>
            <div className="flex justify-between items-center mt-1 gap-2 body text-gray-400">
              Update your password.
              <Button
                theme="clean-blue"
                onClick={() => NiceModal.show(MODAL_ID.changePassword)}
              >
                Change
              </Button>
            </div>
          </>
        )}
        <Separator className="my-3" />
        <div className="h7">2-Step Verification</div>
        {!user.mfa_type ? (
          <div className="flex justify-between items-center mt-1 gap-2 body text-gray-400">
            Add an extra layer of security when signing in.
            <Button
              className="whitespace-nowrap"
              theme="clean-blue"
              onClick={() =>
                NiceModal.show(MODAL_ID.enable2FA, {
                  onComplete: () => router.reload()
                })
              }
            >
              Set Up
            </Button>
          </div>
        ) : (
          <div className="flex justify-between items-center mt-1 body text-gray-400">
            2-Step Verification is enabled.
            <Button
              theme="clean-blue"
              onClick={() => NiceModal.show(MODAL_ID.disable2FA)}
            >
              Disable
            </Button>
          </div>
        )}
      </RoundedBox>
      <RoundedBox className="mt-3">
        <Communications />
      </RoundedBox>
    </div>
  )
}
