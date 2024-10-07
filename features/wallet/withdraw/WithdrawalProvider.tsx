import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer
} from 'react'
import {
  WithdrawalContextType,
  WithdrawalTransition
} from '@/features/wallet/withdraw/types'
import {
  defaultWithdrawal,
  resolveAction,
  withdrawalReducer
} from '@/features/wallet/withdraw/reducer'
import { useCryptoFeesQuery } from '@/api/resources/crypto/withdraw/fees'
import { useAuth } from '@/contexts/auth'
import { CRYPTO_NETWORKS } from '@/constants/cryptoNetworks'

export const WithdrawalContext = createContext<
  WithdrawalContextType | undefined
>(undefined)

export const useWithdrawalContext = () => {
  const context = useContext(WithdrawalContext)

  if (context === undefined)
    throw new Error(
      'useWithdrawalContext must be used within a WithdrawalProvider'
    )

  return context
}

type WithdrawalProviderProps = {
  children: ReactNode
}

export const WithdrawalProvider = ({ children }: WithdrawalProviderProps) => {
  const { walletBalance: balance } = useAuth()
  const { data: networkFees } = useCryptoFeesQuery()

  const [withdrawal, dispatch] = useReducer(
    withdrawalReducer,
    defaultWithdrawal()
  )

  const transitionTo = <T extends WithdrawalTransition>(transition: T) => {
    const { sequence } = transition
    const action = resolveAction(transition)
    if (action) dispatch(action)
    sequence.goTo(transition.step)
  }

  const selectedNetwork = useMemo(() => {
    const networkDetail = CRYPTO_NETWORKS[withdrawal.network]
    if (networkDetail) {
      const fee = networkFees[withdrawal.network] ?? 0
      return { ...networkDetail, fee }
    }
  }, [withdrawal.network, networkFees])

  const value = {
    withdrawal,
    balance,
    transitionTo,
    networkFees,
    selectedNetwork
  }

  return (
    <WithdrawalContext.Provider value={value}>
      {children}
    </WithdrawalContext.Provider>
  )
}
