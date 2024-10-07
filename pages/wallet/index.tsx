import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'
// Constants & Utils
import IdentityVerificationState from '@/types/identityVerificationState'
import withAuth from '@/hoc/withAuth'
import { MODAL_ID } from '@/constants/modalId'
import { showModal } from '@/components/Modals/ModalV2'
import { CARD_TYPES } from '@/enum'
import { VerifyType } from '@/components/Modals/ModalV2/content/verifyIdentity'
// Components & Helpers
import RoundedBox from '@/components/RoundedBox'
import WalletCard, { WalletCardType } from '@/components/WalletCard'
import ColumnCustomAddressUpsell from '@/components/PageSpecificComponents/wallet/ColumnCustomAddressUpsell'
import { Toast } from '@/components'
import VerifyIdentityCta from '@/components/PageSpecificComponents/wallet/VerifyIdentityCta'
import { WalletAddress } from '@/components/PageSpecificComponents/wallet/WalletAddress'
import { WalletColumnHeader } from '@/components/PageSpecificComponents/wallet/WalletColumnHeader'
import Spinner from '@/components/Spinner'
import DropppCredits from '@/components/DropppCredits'
// API
import { useWalletQuery } from '@/api/resources/user/wallet/get'
import { useAuth } from '@/contexts/auth'
import CircleFooter from '@/components/CircleFooter'
import { DefaultLayout } from '@/layouts'
import { useCryptoNetworks } from '@/hooks/useCryptoNetworks'
import {
  getMinWithdrawalLimit,
  WithdrawalLimit
} from '@/features/wallet/core/limits'

////////////////////////////////////////////////////////////////////////////////
// Constants

export const CLOUDINARY_WALLET_PATH = 'pages/wallet/'

////////////////////////////////////////////////////////////////////////////////
// Page / Content

enum Title {
  Address = 'Address',
  Balance = 'Balance'
}

const BalanceContent = {
  [IdentityVerificationState.Completed]:
    'Add USDC to your Droppp Balance to make purchases on the Marketplace.',
  [IdentityVerificationState.Pending]:
    'After verification is approved, you can fund your Wallet to purchase items on the Droppp Marketplace, list items for sale, and withdraw accrued funds.',
  [IdentityVerificationState.Failed]:
    'Successful identity verification is required to fund your wallet, purchase & list items for sale on the Droppp Marketplace, and withdraw funds.',
  [IdentityVerificationState.New]:
    'Verify your identity to add USDC to your Droppp Balance to make purchases on the Marketplace.'
}

const Content = {
  HowToGetUSDC: 'How to get USDC',
  AddressDescription:
    'Your Droppp address is a WAX blockchain-based address that serves as your profile name and is used to hold and transfer digital collectibles.'
}

const AUTO_CLOSE_MS = 5000

export const notifyBalanceTooLow = (minLimit: WithdrawalLimit) => {
  Toast({
    type: 'attention',
    autoClose: AUTO_CLOSE_MS,
    description: `You must have a minimum balance of ${minLimit.formatted} to make a withdrawal.`
  })
}

const WalletPageContent = () => {
  // Hooks ////////////////////////////////////////////////////////////////////////

  const router = useRouter()
  const { user = {}, wallets } = useAuth()
  const { isLoading: areCryptoNetworksLoading, lowestFeeNetwork } =
    useCryptoNetworks()
  const { data: walletData } = useWalletQuery({
    refetchOnWindowFocus: true
  })

  // Lifecycle ///////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!user) return
    const { addressPurchased } = router.query
    const { account_wax_free, account_wax } = user
    const alreadyPurchased = account_wax !== account_wax_free
    if (addressPurchased && alreadyPurchased) {
      showModal(MODAL_ID.wallet.waxPurchaseSuccess, {
        onComplete: () => {
          delete router.query.addressPurchased
          router.push(router).then()
        }
      })
    }
  }, [router.query, user])

  useEffect(() => {
    if (walletData && !walletData.verify_id_prompted)
      showModal(MODAL_ID.wallet.newWalletAlert)
  }, [walletData])

  const minWithdrawalLimit = useMemo(
    () => lowestFeeNetwork && getMinWithdrawalLimit(lowestFeeNetwork.fee),
    [lowestFeeNetwork]
  )

  // Handlers ////////////////////////////////////////////////////////////////////

  const handleAddFunds = () => {
    if (isCompleted) return showModal(MODAL_ID.wallet.addFunds)
    showModal(MODAL_ID.identityVerificationGate, {
      introType: VerifyType.AddFunds
    })
  }

  const handleWithdrawFunds = () => {
    if (minWithdrawalLimit && balance < minWithdrawalLimit.value) {
      notifyBalanceTooLow(minWithdrawalLimit)
      return
    }
    showModal(MODAL_ID.wallet.withdrawFunds)
  }

  // Early Return ////////////////////////////////////////////////////////////////

  if (!walletData || !user || areCryptoNetworksLoading) return <Spinner />

  // Setup ///////////////////////////////////////////////////////////////////////

  const { account_wax, account_wax_free, credit = 0 } = user
  const {
    identityVerificationState: verifyState = IdentityVerificationState.New,
    balance
  } = walletData || {}

  const isPending = verifyState === IdentityVerificationState.Pending
  const isCompleted = verifyState === IdentityVerificationState.Completed
  const hasCustomWaxAddressUpsell =
    !account_wax || account_wax === account_wax_free
  const showDropppCredit = credit > 0

  // get wallet, favoring custom
  const sortedWallets = wallets.sort(a =>
    a.type === CARD_TYPES.CUSTOM ? -1 : 1
  )

  // Render //////////////////////////////////////////////////////////////////////

  const meta = {
    title: 'Wallet'
  }

  return (
    <DefaultLayout seo={meta}>
      <div
        className={classNames('container max-md:max-w-[424px] max-w-[1072px]')}
      >
        <h1 className={classNames('h2 mb-4')}>Wallet</h1>
        {(!isCompleted || isPending) && (
          <VerifyIdentityCta identityVerificationState={verifyState} />
        )}
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="flex-[2] flex flex-col gap-3">
            {showDropppCredit && <DropppCredits credit={credit} />}
            <RoundedBox className="flex flex-col gap-3">
              <WalletColumnHeader
                title={Title.Balance}
                description={
                  BalanceContent[verifyState] ||
                  BalanceContent[IdentityVerificationState.New]
                }
              />

              <WalletCard
                balance={balance}
                type={verificationStateToCardType(verifyState)}
                onAddFunds={handleAddFunds}
                onWithdrawFunds={handleWithdrawFunds}
              />
              <div className="h-[1px] bg-black -mx-4" />
              <CircleFooter className="lg:-mb-2 -mt-1 -mb-1" />
            </RoundedBox>
          </div>
          <RoundedBox className="flex-[3] flex flex-col gap-3">
            <WalletColumnHeader
              title={Title.Address}
              description={Content.AddressDescription}
            />
            {hasCustomWaxAddressUpsell && <ColumnCustomAddressUpsell />}
            {!!sortedWallets.length &&
              sortedWallets.map((wallet, index) => (
                <WalletAddress
                  key={wallet.address}
                  wallet={wallet}
                  avatar={!index ? user.avatar_media : null}
                />
              ))}
          </RoundedBox>
        </div>
      </div>
    </DefaultLayout>
  )
}

////////////////////////////////////////////////////////////////////////////////
// Helpers

const verificationStateToCardType = (
  state: IdentityVerificationState
): WalletCardType =>
  state === IdentityVerificationState.Completed
    ? WalletCardType.Premium
    : state === IdentityVerificationState.Failed
    ? WalletCardType.Failed
    : WalletCardType.Default

////////////////////////////////////////////////////////////////////////////////
// Layout & Export

const WalletPage = withAuth(WalletPageContent)

export default WalletPage
