import { WalletOption } from './types'
import { CARD_TYPES } from '@/enum'
import { User } from '@/api/resources/shared/user'

export function buildWalletOptions(user?: User): Array<WalletOption> {
  const walletOptions: Array<WalletOption> = []

  if (user?.account_wax && user?.account_wax !== user?.account_wax_free) {
    walletOptions.push({
      type: CARD_TYPES.CUSTOM,
      address: user.account_wax,
      chain_url: user.account_wax_chain_url,
      date: user.account_wax_created
    })
  }

  if (user?.account_wax_free) {
    walletOptions.push({
      type: CARD_TYPES.FREE,
      address: user.account_wax_free,
      chain_url: user.account_wax_free_chain_url,
      date: user.account_wax_free_created || user.account_wax_created
    })
  }

  return walletOptions
}

export function calculateCreditBalance(user?: User): number {
  const credit = user?.credit ?? 0

  if (credit > 0) {
    return credit / 100
  } else {
    return 0
  }
}
