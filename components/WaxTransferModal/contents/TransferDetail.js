import { debounce } from 'lodash'
import React, { useState, useCallback, useEffect } from 'react'
import NumberFormat from 'react-number-format'
import { numberWithCommas } from '@/util/numberHelpers'
import { useAuth } from '@/contexts/auth'
import { Input, InputAddress } from '@/components'
import Button from '@/components/Button'
import styles from './styles.module.scss'
import { tryApiAction } from '@/api/core/compat'
import { checkTransfer } from '@/api/resources/user/assets/transfer/check'

const TransferDetail = ({ details, waxBalance, onConfirm }) => {
  const [address, setAddress] = useState(details.targetAddress)
  const [memo, setMemo] = useState(details.memo)
  const [amount, setAmount] = useState(details.transferAmount)
  const [validAddress, setValidAddress] = useState(false)
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const { account_wax } = user || {}

  useEffect(() => {
    if (!!address) {
      addressValidation(address)
    }
  }, [address])

  const handleChangeMemo = value => {
    setMemo(value)
  }

  const handleChangeAmount = value => {
    if (!!value && !value.match(/^[0-9]*\.?[0-9]*$/)) {
      return
    }
    setAmount(value)
  }

  const addressValidation = address => {
    setLoading(true)
    handleAddressChange(address)
  }

  const handleAddressChange = useCallback(
    debounce(async address => {
      const { status } = await tryApiAction(() => checkTransfer(address))
      setValidAddress(status === 'ok')
      setLoading(false)
    }, 1000),
    []
  )

  const handleContinue = () => {
    onConfirm({ targetAddress: address, memo, transferAmount: amount })
  }

  const canTransfer =
    address &&
    validAddress &&
    address !== account_wax &&
    !!Number(amount) &&
    !loading

  return (
    <>
      <div className={styles.transferDetail}>
        <div className={styles.title}>Transfer WAXP</div>
        <div className={styles.description}>
          Send WAXP to any digital wallet on the WAXP blockchain by entering in
          the address below.
        </div>
        <InputAddress
          withFavorites
          value={address}
          valid={validAddress}
          loading={loading}
          placeholder="Enter WAX Account"
          onChange={setAddress}
        />
        <Input
          className="mt-2"
          format="textarea"
          value={memo}
          placeholder="Memo (Optional)"
          onChange={handleChangeMemo}
        />
        <div className={styles.amountContainer}>
          <div className={styles.balanceContainer}>
            <div>
              <div className={styles.label}>Available Balance</div>
              <div className={styles.value}>
                {numberWithCommas(waxBalance.toFixed(8))}
              </div>
            </div>
            <div>
              <div className={styles.label}>Remaining Balance</div>
              <div className={styles.value}>
                {numberWithCommas((waxBalance - (amount || 0)).toFixed(8))}
              </div>
            </div>
          </div>
          <div className={styles.amountInputLabel}>WAXP Amount</div>
          <div className={styles.amountInputContainer}>
            <NumberFormat
              thousandSeparator
              value={amount}
              onValueChange={values => handleChangeAmount(values.value)}
            />
            <button
              disabled={waxBalance - (amount || 0) === 0}
              onClick={() => setAmount(waxBalance.toFixed(8))}
            >
              Max
            </button>
          </div>
        </div>
        <Button
          className="w-full mt-2"
          size="lg"
          disabled={!canTransfer}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </>
  )
}

export default TransferDetail
