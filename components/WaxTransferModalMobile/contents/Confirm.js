import classnames from 'classnames'
import React, { useState } from 'react'
import { useAuth } from '@/contexts/auth'
import { numberWithCommas } from '@/util/numberHelpers'
import { InputAddress, Toast } from '@/components'
import Button from '@/components/Button'
import TwoFaModal from './TwoFaModal'
import styles from './styles.module.scss'
import Icon from '@/components/Icon'
import { tryApiAction } from '@/api/core/compat'
import { getWaxBalance } from '@/api/resources/user/wax/balance'
import { transferWax } from '@/api/resources/user/wax/transfer/add'
import ErrorBox from '@/components/ErrorBox'

const Confirm = ({ details, onTransfer, close, waxBalance }) => {
  const { user, selectedWallet } = useAuth()
  const [loading, setLoading] = useState(false)
  const [twoFaRequired, setTwoFaRequired] = useState(false)
  const [confirmAddress, setConfirmAddress] = useState('')
  const [error, setError] = useState()

  const handleTransfer = async () => {
    setLoading(true)
    const { targetAddress, transferAmount, memo } = details
    const { success, data } = await tryApiAction(() =>
      transferWax({
        account: selectedWallet.address,
        to: targetAddress,
        qty: transferAmount,
        memo
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
      const { mfa_required } = data
      if (mfa_required) {
        if (user.mfa_type === 'sms') {
          Toast({
            type: 'success',
            title: 'Success',
            description: 'A code was sent via SMS to your device.'
          })
        }
        setTwoFaRequired(true)
      } else {
        setError(data)
      }
    }
  }

  return (
    <>
      <div className={styles.header}>
        <Button theme="clean" onClick={close}>
          <Icon name="close" size={24} />
        </Button>
      </div>
      <div className={classnames(styles.transferDetail, styles.confirmDetail)}>
        <div className={styles.title}>Confirm Transfer</div>
        <ErrorBox error={error} />
        <div className={styles.confirmNote}>
          Confirm this transfer by re-entering the destination address. By
          confirming, you acknowledge that{' '}
          <b>{numberWithCommas(details?.transferAmount)} WAXP</b> will be
          immediately transferred from <b>{selectedWallet?.address}</b> to{' '}
          <b>{details.targetAddress}</b> on the blockchain. This action is
          irreversible. Transferring to the wrong address cannot be undone.
        </div>
        <div className={styles.confirmInfoContainer}>
          <div className={styles.balanceContainer}>
            <div>
              <div className={styles.label}>WAXP Amount:</div>
              <div className={styles.value}>
                {numberWithCommas(Number(details?.transferAmount).toFixed(8))}
              </div>
            </div>
            <div>
              <div className={styles.label}>Recipient Address:</div>
              <div className={styles.value}>{details?.targetAddress}</div>
            </div>
          </div>
          <InputAddress
            value={confirmAddress}
            valid={details.targetAddress === confirmAddress}
            placeholder="Enter WAX Account"
            onChange={setConfirmAddress}
          />
        </div>
        <div className={styles.footer}>
          <Button
            className="w-full mt-2"
            size="lg"
            theme="rainbow"
            loading={loading}
            disabled={details.targetAddress !== confirmAddress}
            onClick={handleTransfer}
          >
            Transfer
          </Button>
        </div>
      </div>
      <TwoFaModal
        visible={twoFaRequired}
        waxBalance={waxBalance}
        details={details}
        onTransfer={onTransfer}
        onClose={() => setTwoFaRequired(false)}
      />
    </>
  )
}

export default Confirm
