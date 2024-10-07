import { useAuth } from '@/contexts/auth'
import { useWalletQuery } from '@/api/resources/user/wallet/get'
import { useHasMounted } from './useHasMounted'
import IdentityVerificationState from '../types/identityVerificationState'

export type UseAccountResult = {
  isAccountLoading: boolean
  isNotSignedIn: boolean
  isVerified: boolean
  isUnverified: boolean
  verifyIdPrompted: boolean
  notEnoughFunds: (price: number) => boolean
}

export const useAccount = (): UseAccountResult => {
  const hasMounted = useHasMounted()

  const { user, isUserLoading, isAuthenticated, walletBalance } = useAuth()
  const isInitialUserLoading = isAuthenticated && isUserLoading && !user

  const isWalletQueryEnabled = isAuthenticated && user?.email_verified
  const { isInitialLoading: isInitialWalletLoading, data: walletQueryData } =
    useWalletQuery({
      enabled: isWalletQueryEnabled
    })

  const isAccountLoading =
    !hasMounted || isInitialUserLoading || isInitialWalletLoading

  const identityVerification =
    walletQueryData?.identityVerificationState ?? IdentityVerificationState.New

  const isVerified =
    identityVerification === IdentityVerificationState.Completed

  return {
    isAccountLoading,
    isNotSignedIn: !isAuthenticated,
    isVerified,
    isUnverified: !isVerified,
    verifyIdPrompted: !!walletQueryData?.verify_id_prompted,
    notEnoughFunds: (price: number) => price > walletBalance
  }
}
