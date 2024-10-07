import { MINIMUM_WITHDRAWAL_AMOUNT } from '@/features/wallet/core/constants'
import { roundToTwoDecimals } from '@/util/numberHelpers'
import { formatCurrency } from '@/util/currencyHelpers'

export type WithdrawalLimit = {
  value: number
  formatted: string
}

export const calcMinWithdrawalLimit = (fee: number): number =>
  Math.max(
    MINIMUM_WITHDRAWAL_AMOUNT,
    roundToTwoDecimals(fee + MINIMUM_WITHDRAWAL_AMOUNT)
  )

export const getMinWithdrawalLimit = (fee: number): WithdrawalLimit => {
  const value = calcMinWithdrawalLimit(fee)
  return {
    value,
    formatted: formatCurrency(value, false)
  }
}
