import React, { useState } from 'react'
import { useAuth } from '@/contexts/auth'
import { Icon, Toast, Button } from '@/components'
import ErrorBox from '@/components/ErrorBox'
import { setup2faSMSSend } from '@/api/resources/user/2fa/sms/send'
import { tryApiAction } from '@/api/core/compat'

const ConfirmDisable = ({ onConfirm, ModalBody, ModalFooter }) => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  const handleOff = async () => {
    if (user.mfa_type === 'sms') {
      setLoading(true)
      const { success, data } = await tryApiAction(() =>
        setup2faSMSSend('disable')
      )
      setLoading(false)
      if (success) {
        onConfirm()
        Toast({
          type: 'success',
          title: 'Success',
          description: 'A code was sent via SMS to your phone.'
        })
      } else {
        setError(data)
      }
    } else {
      onConfirm()
    }
  }

  return (
    <>
      <ModalBody>
        <div className="text-center">
          <div className="flex items-center justify-center w-9 h-9 rounded-full border-[4px] border-error m-auto">
            <Icon name="exclamation" />
          </div>
          <div className="h4 mt-3">Turn Off 2-Step Verification?</div>
          <div className="mt-2 body text-gray-300">
            Turning off 2-Step Verification will remove the extra security on
            your account, and you’ll only use your password to sign in. Are you
            sure?
          </div>
          <ErrorBox className="mt-2" error={error} />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          className="w-full"
          theme="destructive"
          loading={loading}
          onClick={handleOff}
        >
          Turn Off
        </Button>
      </ModalFooter>
    </>
  )
}

export default ConfirmDisable
