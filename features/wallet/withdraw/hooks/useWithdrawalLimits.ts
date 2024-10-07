import { useMemo } from 'react'
import { formatCurrency } from '@/util/currencyHelpers'
import { SelectedNetwork } from '@/features/wallet/withdraw/types'
import { getMinWithdrawalLimit } from '@/features/wallet/core/limits'

export const useWithdrawalLimits = ({
  balance,
  selectedNetwork
}: {
  balance: number
  selectedNetwork: SelectedNetwork
}) => {
  const minimum = useMemo(
    () => getMinWithdrawalLimit(selectedNetwork.fee),
    [selectedNetwork]
  )

  const maximum = useMemo(
    () => ({
      value: balance,
      formatted: formatCurrency(balance, false)
    }),
    [balance]
  )

  return { minimum, maximum }
}
