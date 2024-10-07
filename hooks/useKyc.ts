import { useEffect } from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { useKycQuery } from '@/api/resources/user/kyc'
import { KycResponse } from '@/api/resources/user/kyc/schema'
import { ApiError } from '@/api/core/errors'
import { isTest } from '@/config'

export type UseKycResult = { kycVerifyUrl: string | undefined } & Pick<
  UseQueryResult<KycResponse, ApiError>,
  'isLoading' | 'error'
>

const useKyc = (enabled: boolean): UseKycResult => {
  if (enabled && !isTest)
    // eslint-disable-next-line no-console
    console.warn('REQUESTS LIMITED!', 'useKyc() enabled:', enabled)

  const { data, isLoading, error, remove } = useKycQuery({
    enabled,
    retry: false
  })
  const kycVerifyUrl = data?.kyc_verification_url
  useEffect(() => {
    return () => remove() // Remove data from cache when component unmounts
  }, [])
  if (kycVerifyUrl && enabled)
    // eslint-disable-next-line no-console
    console.warn('🚨 useKyc() -> kycVerifyUrl:', kycVerifyUrl)
  return { kycVerifyUrl, isLoading: enabled && isLoading, error }
}

export default useKyc
