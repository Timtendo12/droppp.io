import { CryptoFees } from '@/api/resources/crypto/withdraw/fees/schema'
import { useCryptoFeesQuery } from '@/api/resources/crypto/withdraw/fees'
import { useMemo } from 'react'

export type CryptoNetwork = {
  type: keyof CryptoFees
  fee: number
}

type UseCryptoNetworksResult = {
  isLoading: boolean
  lowestFeeNetwork?: CryptoNetwork
}

export const useCryptoNetworks = (): UseCryptoNetworksResult => {
  const { isLoading, data } = useCryptoFeesQuery()

  const lowestFeeNetwork = useMemo(() => {
    const networks = data
      ? Object.keys(data).map(
          key =>
            ({
              type: key,
              fee: data[key]
            } as CryptoNetwork)
        )
      : []

    if (networks.length > 0) {
      const sortedNetworks = networks.sort((a, b) => a.fee - b.fee)
      return sortedNetworks[0]
    }
  }, [data])

  return {
    isLoading,
    lowestFeeNetwork
  }
}
