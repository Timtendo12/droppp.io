import {
  SessionAction,
  UserPayload,
  SessionUser,
  WalletOption,
  SessionUserSource
} from './types'
import { buildWalletOptions, calculateCreditBalance } from './build'
import IdentityVerificationState from '@/types/identityVerificationState'
import { responseToIdentityVerificationState } from '@/api/resources/shared/transformers/identityVerificationState'
import { isTest } from '@/config'

export const defaultSessionUser = () => ({
  user: undefined,
  identityVerificationState: IdentityVerificationState.New,
  walletBalance: 0,
  creditBalance: 0,
  notifications: {},
  wallets: [],
  selectedWallet: null,
  userSource: 'none' as SessionUserSource
})

type Action =
  | { type: SessionAction.Signup; payload: UserPayload }
  | { type: SessionAction.Login; payload: UserPayload }
  | { type: SessionAction.FetchedUser; payload: UserPayload }
  | { type: SessionAction.SelectWallet; payload: { wallet: WalletOption } }
  | { type: SessionAction.Logout; payload: {} }

export function sessionReducer(
  state: SessionUser,
  action: Action
): SessionUser {
  switch (action.type) {
    case SessionAction.Signup:
      const { user } = action.payload
      return { ...state, user, userSource: 'signup' }
    case SessionAction.Login: {
      const { user } = action.payload
      return { ...state, user, userSource: 'login' }
    }
    case SessionAction.FetchedUser: {
      const { user, wallet_balance, notify } = action.payload
      const creditBalance = calculateCreditBalance(user)
      const wallets = buildWalletOptions(user)
      const selectedWallet = wallets.length > 0 ? wallets[0] : null

      if (!isTest) {
        window.dataLayer.push({
          userId: user.uid
        })
      }

      return {
        ...state,
        user,
        identityVerificationState: responseToIdentityVerificationState(
          action.payload
        ),
        userSource: 'fetchedUser',
        walletBalance: wallet_balance ?? 0,
        creditBalance,
        notifications: notify ?? {},
        wallets,
        selectedWallet
      }
    }
    case SessionAction.SelectWallet: {
      const { wallet } = action.payload
      return {
        ...state,
        selectedWallet: wallet
      }
    }
    case SessionAction.Logout: {
      if (!isTest) {
        window.dataLayer.push({
          userId: undefined
        })
      }
      return defaultSessionUser()
    }
    default: {
      throw new Error('Invalid action type')
    }
  }
}
