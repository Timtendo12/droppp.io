import { useEffect } from 'react'
import { showModal } from '@/components/Modals/ModalV2'
import { useRouter } from 'next/router'
import { ApiErrorNotifierProps } from './..'

export function MinimumDepositNotifier({
  error,
  onNotified
}: ApiErrorNotifierProps) {
  const router = useRouter()

  const handleAddFunds = () => {
    onNotified()
    router.push('/wallet').then()
  }

  const handleViewFaq = () => {
    onNotified()
    router.push('/faq#marketplace').then()
  }

  useEffect(() => {
    if (error) {
      showModal('minimumDepositNotMet', {
        onAddFunds: handleAddFunds,
        onViewFAQ: handleViewFaq,
        onCancel: onNotified
      })
    }
  }, [error])

  return null
}
