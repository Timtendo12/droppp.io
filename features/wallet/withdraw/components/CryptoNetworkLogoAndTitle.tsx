import { Icon } from '@/components'
import { NetworkType } from '@/api/resources/shared/crypto'
import { CRYPTO_NETWORKS } from '@/constants/cryptoNetworks'

interface CryptoNetworkLogoAndTitleProps {
  network: NetworkType
}
export const CryptoNetworkLogoAndTitle = ({
  network
}: CryptoNetworkLogoAndTitleProps) => {
  return (
    <div className="flex gap-1 items-center">
      <Icon name={CRYPTO_NETWORKS[network].icon} className="w-[20px]" />
      <p>{CRYPTO_NETWORKS[network].label}</p>
    </div>
  )
}
