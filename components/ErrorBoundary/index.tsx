import React from 'react'
import { useRouter } from 'next/router'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import * as Sentry from '@sentry/nextjs'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import Outage from '@/components/Outage'

export default function ErrorBoundary({
  children
}: {
  children: React.ReactNode
}) {
  const { reset: resetReactQuery } = useQueryErrorResetBoundary()
  const router = useRouter()

  return (
    <ReactErrorBoundary
      onReset={() => resetReactQuery()}
      resetKeys={[router.asPath]}
      onError={error => Sentry.captureException(error)}
      fallbackRender={() => <Outage />}
    >
      {children}
    </ReactErrorBoundary>
  )
}
