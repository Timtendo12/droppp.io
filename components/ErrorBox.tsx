import React from 'react'
import Toast from './Toast'
import { Error } from '@/api/resources/shared/error'
import { ApiError } from '@/api/core/errors'

interface Props {
  className?: string
  error?: Error | ApiError
  shouldShowTitle?: boolean
}

const ErrorBox = ({ className, error, shouldShowTitle = true }: Props) => {
  if (!error) {
    return null
  }
  const { errorMessage } = error
  const { errors } = error as Error
  const { details } = error as ApiError
  const description = Object.entries(errors || details)[0][1]

  return (
    <Toast
      className={className}
      title={shouldShowTitle && errorMessage}
      type="warning"
      inline
    >
      {description}
    </Toast>
  )
}

export default ErrorBox
