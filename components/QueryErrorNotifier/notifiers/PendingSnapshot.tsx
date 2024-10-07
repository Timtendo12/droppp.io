import { useEffect } from 'react'
import Toast from '@/components/Toast'
import { ApiErrorNotifierProps } from './..'

const AutoCloseMs = 10000

const Message =
  "This action is currently frozen during this drop's redemption snapshot underway. After the snapshot is complete you may attempt this action again. Thank you for your patience."

export const notifyPendingSnapshot = ({
  onNotified
}: Partial<ApiErrorNotifierProps> = {}) => {
  Toast({
    type: 'information',
    title: 'Redemption Snapshot is Underway',
    autoClose: AutoCloseMs,
    description: Message,
    onClose: onNotified
  })
}

export const PendingSnapshotNotifier = ({
  error,
  onNotified
}: ApiErrorNotifierProps) => {
  useEffect(() => {
    if (error) notifyPendingSnapshot({ onNotified })
  }, [error])

  return null
}
