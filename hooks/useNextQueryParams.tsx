import { useRouter } from 'next/router'
import { useMemo } from 'react'

export type NextQueryParams = { [key: string]: string }

function useNextQueryParams<T>() {
  const router = useRouter()
  const value = useMemo(() => {
    const queryParamsStr = router.asPath.split('?').slice(1).join('')
    const urlSearchParams = new URLSearchParams(queryParamsStr)
    const params = Object.fromEntries(urlSearchParams.entries())
    return params as T
  }, [router.asPath])

  return value
}

export default useNextQueryParams
