import { cssFormattedSpacing } from '@/util/tailwindHelpers'
import { USDCHeaderItem } from '@/features/wallet/core/components/USDCHeaderItem'
import { NetworkDetail } from '@/constants/cryptoNetworks'

type Props = { networkDetail: NetworkDetail }

export const NetworkConfirmation = ({ networkDetail }: Props) => {
  return (
    <div
      style={{
        '--containerXPadding': cssFormattedSpacing(3),
        '--containerYPadding': cssFormattedSpacing(2)
      }}
      className="border border-gray-700 rounded-2xl"
    >
      <div className="grid grid-cols-2 py-[var(--containerYPadding)] border-b border-inherit">
        <USDCHeaderItem category="Token" label="USDC" icon="usdc" />

        <USDCHeaderItem
          category="Network"
          label={networkDetail.label}
          icon={networkDetail.icon}
        />
      </div>

      <div className="py-[var(--containerYPadding)] px-[var(--containerXPadding)]">
        <p className="text-alert body-sm">
          By proceeding you acknowledge that the address above is capable of
          receiving USDC over the {networkDetail.label} network. Sending funds
          through any other network will result in a loss of funds and will not
          be recoverable by Droppp.
        </p>
      </div>
    </div>
  )
}
