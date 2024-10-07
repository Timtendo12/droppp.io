import QueryErrorNotifier from '@/components/QueryErrorNotifier'
import { ReactNode, useState } from 'react'
import { QueryClient } from '@tanstack/query-core'
import { Hydrate, QueryClientProvider } from '@tanstack/react-query'
import { shouldRetryQuery } from '@/api/core/query/options'

export type QueryErrorHandler = (error: unknown) => void
export type QueryClientInitializer = (onError: QueryErrorHandler) => QueryClient

const initializeQueryClient = (onError: QueryErrorHandler): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        onError,
        retry: shouldRetryQuery,
        refetchOnWindowFocus: false
      },
      mutations: {
        onError
      }
    }
  })
}

export function QueryProvider({
  children,
  reactQueryData,
  queryClientInitializer = initializeQueryClient
}: {
  children: ReactNode
  queryClientInitializer?: QueryClientInitializer
  reactQueryData?: unknown
}) {
  // IMPORTANT ensures that data is not shared between different users and requests,
  // while still only creating the QueryClient once per component lifecycle.
  // https://tanstack.com/query/v4/docs/react/guides/ssr#using-hydration
  const [queryError, setQueryError] = useState<unknown>(null)
  const [queryClient] = useState(() => queryClientInitializer(setQueryError))

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={reactQueryData}>
        <QueryErrorNotifier
          error={queryError}
          onNotified={() => setQueryError(null)}
        />
        {children}
      </Hydrate>
    </QueryClientProvider>
  )
}
