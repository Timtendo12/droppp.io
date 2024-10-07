import React, { useState } from 'react'
import { useAuth } from '@/contexts/auth'
import { numberWithCommas } from '@/util/numberHelpers'
import { Input2FACode, Toast, Icon, ModalMobile, Button } from '@/components'
import styles from './styles.module.scss'
import { tryApiAction } from '@/api/core/compat'
import { getWaxBalance } from '@/api/resources/user/wax/balance'
import { transferWax } from '@/api/resources/user/wax/transfer/add'
import ErrorBox from '@/components/ErrorBox'

const TwoFaModal = ({ visible, waxBalance, details, onTransfer, onClose }) => {
  const { user, selectedWallet } = useAuth()
  const [code, setCode] = useState()
  const [codeSent, setCodeSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isValidCode, setIsValidCode] = useState(false)
  const [sendingNewCode, setSendingNewCode] = useState(false)
  const [error, setError] = useState()

  const handleChangeCode = (value, isValid) => {
    setCode(value)
    setIsValidCode(isValid)
    setError()
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

  const handleComplete = async event => {
    event.preventDefault()

    setLoading(true)
    const { targetAddress, transferAmount, memo } = details
    const { success, data } = await tryApiAction(() =>
      transferWax({
        account: selectedWallet.address,
        to: targetAddress,
        qty: transferAmount,
        memo,
        code
      })
    )

    if (success) {
      let retry = 0
      let completed = false
      const timer = setInterval(async () => {
        retry += 1
        const { data } = await tryApiAction(() =>
          getWaxBalance(selectedWallet.address)
        )
        const balance = Number(data?.available || 0)
        if (balance < Number(waxBalance) || retry > 10) {
          if (!completed) {
            completed = true
            onTransfer(balance)
            setLoading(false)
            Toast({
              type: 'success',
              title: 'WAX Transfer Successful',
              description: `${numberWithCommas(
                details.transferAmount
              )} WAX sent to ${details.targetAddress}`
            })
            clearInterval(timer)
          }
        }
      }, 2000)
    } else {
      setLoading(false)
      setError(data)
    }
  }

  const ModalContent = () => {
    return (
      <form className={styles.verify2FA} onSubmit={handleComplete}>
        <Button theme="clean" onClick={onClose}>
          <Icon name="close" size={24} />
        </Button>
        <div className={styles.iconInfo}>
          <Icon name="2fa" />
        </div>
        <div className={styles.title}>2-Step Verification Required</div>
        <div className={styles.description}>
          Please enter the 6-digit code{' '}
          {user.mfa_type === 'sms' ? (
            <>
              {' '}
              sent to the phone number ending in <b>{user.mfa_phone_last4}</b>
            </>
          ) : (
            'provided via your authenticator app'
          )}
          .
        </div>
        <Input2FACode secondaryLinkStyle="none" onChange={handleChangeCode} />
        <ErrorBox error={error} />
        <div className={styles.footer}>
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
            className="w-full"
            size="lg"
            type="submit"
            disabled={!isValidCode}
            loading={loading}
          >
            Continue
          </Button>
        </div>
      </form>
    )
  }

  return (
    <ModalMobile
      visible={visible}
      onClose={onClose}
      renderContent={ModalContent}
    />
  )
}

export default TwoFaModal
