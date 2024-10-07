import { NetworkType } from '@/api/resources/shared/crypto'
import { ICONS_CRYPTO_NETWORKS } from '@/components/Icon'

export type NetworkDetail = {
  label: string
  id: NetworkType
  otherCurrencies: string
  icon: keyof typeof ICONS_CRYPTO_NETWORKS
}

export const CRYPTO_NETWORKS: Record<NetworkType, NetworkDetail> = {
  POLY: {
    id: 'POLY',
    label: 'Polygon',
    otherCurrencies: 'MATIC, "USDC.e" (Bridged USDC), etc.',
    icon: 'polygon'
  },
  ETH: {
    id: 'ETH',
    label: 'Ethereum',
    otherCurrencies: 'ETH,',
    icon: 'ethereum'
  }
}
