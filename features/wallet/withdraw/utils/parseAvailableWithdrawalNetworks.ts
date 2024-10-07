import { CryptoFees } from '@/api/resources/crypto/withdraw/fees/schema'
import { CRYPTO_NETWORK_SELECTOR_OPTIONS } from '../../core/constants'

export const parseAvailableWithdrawalNetworks = (
  networkFees: CryptoFees,
  balance: number
) => {
  const options = Object.values(CRYPTO_NETWORK_SELECTOR_OPTIONS)
  const filteredOptions = options
    .filter(option => networkFees[option.value] !== undefined)
    .map(option => {
      const fee = networkFees[option.value]
      const disabled = fee >= balance
      if (!disabled) return option
      return {
        ...option,
        disabled,
        info: `At least ${fee + 0.01} USDC is required to use this network.`
      }
    })
  return filteredOptions
}
