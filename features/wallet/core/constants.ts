import { NetworkType } from '@/api/resources/shared/crypto'
import { CryptoNetworkSelectorOption } from '@/features/wallet/deposit/components/CryptoNetworkSelector'
import { CRYPTO_NETWORKS } from '@/constants/cryptoNetworks'

export const DEPOSIT_CLOUDINARY_PATH = 'global/modals/deposit/'
export const MINIMUM_WITHDRAWAL_AMOUNT = 0.01

export const CRYPTO_NETWORK_SELECTOR_OPTIONS: Record<
  NetworkType,
  CryptoNetworkSelectorOption
> = {
  POLY: {
    value: CRYPTO_NETWORKS.POLY.id,
    title: CRYPTO_NETWORKS.POLY.label,
    icon: CRYPTO_NETWORKS.POLY.icon,
    badge: { label: 'Low Fees', theme: 'success' },
    description:
      'Polygon is a widely-used blockchain known for lower fees and faster transactions. May not be supported on all exchanges.'
  },
  ETH: {
    value: CRYPTO_NETWORKS.ETH.id,
    title: CRYPTO_NETWORKS.ETH.label,
    icon: CRYPTO_NETWORKS.ETH.icon,
    badge: { label: 'High Fees', theme: 'alert' },
    description:
      'Ethereum is a popular blockchain but typically has higher fees due to increased network activity.'
  }
}
