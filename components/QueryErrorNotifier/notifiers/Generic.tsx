import { useEffect } from 'react'
import Toast from '@/components/Toast'
import { ApiErrorNotifierProps } from '@/components/QueryErrorNotifier'
import { isApiError } from '@/api/core/errors'

type NotifyOptions = {
  error: unknown
  heading?: string
  fallback?: string
} & Partial<Pick<ApiErrorNotifierProps, 'onNotified'>>

export const notifyGenericError = ({
  error,
  heading,
  fallback = 'There was an unexpected error',
  onNotified
}: NotifyOptions) => {
  const title = heading || (isApiError(error) && error.errorMessage) || 'Error'
  const description = (isApiError(error) && error.details.generic) || fallback

  Toast({
    type: 'warning',
    title,
    description,
    onClose: onNotified
  })
}

export const GenericNotifier = ({
  error,
  onNotified
}: ApiErrorNotifierProps) => {
  useEffect(() => {
    if (error) notifyGenericError({ error, onNotified })
  }, [error])

  return null
}
