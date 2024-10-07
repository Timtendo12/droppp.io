import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'
import {
  ApiError,
  isApiError,
  isPendingSnapshotError,
  isServerApiError
} from '@/api/core/errors'
import { InsufficientFundsNotifier } from './notifiers/InsufficientFunds'
import { GenericNotifier } from './notifiers/Generic'
import { MinimumDepositNotifier } from './notifiers/MinimumDeposit'
import { PendingSnapshotNotifier } from './notifiers/PendingSnapshot'
import { useQueryErrorRecovery } from './recovery'

export type QueryErrorNotifierProps = { error: unknown; onNotified: () => void }
export type ApiErrorNotifierProps = { error: ApiError; onNotified: () => void }

const SentryNotifier = ({ error, onNotified }: QueryErrorNotifierProps) => {
  useEffect(() => {
    if (error) {
      Sentry.captureException(error)
      onNotified()
    }
  }, [error])
  return null
}

export default function QueryErrorNotifier(
  notifierProps: QueryErrorNotifierProps
) {
  const { error } = notifierProps

  useQueryErrorRecovery(error)

  if (!error) return null

  if (!isApiError(error)) return <SentryNotifier {...notifierProps} />
  if (isServerApiError(error)) return <SentryNotifier {...notifierProps} />

  const apiErrorProps = notifierProps as ApiErrorNotifierProps

  if (error.isMinimumNotMetError)
    return <MinimumDepositNotifier {...apiErrorProps} />

  if (error.isPaymentError)
    return <InsufficientFundsNotifier {...apiErrorProps} />

  if (isPendingSnapshotError(error))
    return <PendingSnapshotNotifier {...apiErrorProps} />

  return <GenericNotifier {...apiErrorProps} />
}
