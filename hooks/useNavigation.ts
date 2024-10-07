import { useRouter } from 'next/router'
import * as paths from '../routing/paths'
import { useAccount } from './useAccount'
import { VerifyType } from '@/components/Modals/ModalV2/content/verifyIdentity'
import { showModal } from '@/components/Modals/ModalV2'
import { MODAL_ID } from '@/constants/modalId'

export type GoToType = {
  signIn: () => void
  addFunds: () => void
  verifyIdentity: (introType: VerifyType) => void
  marketplaceFAQ: () => void
  inventory: () => void
}

export type UseNavigationResult = {
  goTo: GoToType
}

export const useNavigation = (): UseNavigationResult => {
  const router = useRouter()
  const { verifyIdPrompted } = useAccount()

  const signIn = () => router.push(paths.login(router.asPath)).then()
  const addFunds = () => router.push(`/wallet`).then()
  const marketplaceFAQ = () => router.push('/faq#marketplace')
  const inventory = () => router.push(paths.inventory)

  const verifyIdentity = (introType: VerifyType) => {
    if (verifyIdPrompted) {
      showModal(MODAL_ID.identityVerificationGate, {
        introType
      })
    } else {
      addFunds().then()
    }
  }

  return {
    goTo: {
      signIn,
      addFunds,
      verifyIdentity,
      marketplaceFAQ,
      inventory
    }
  }
}
