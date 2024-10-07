import React from 'react'
import { cssFormattedSpacing } from '@/util/tailwindHelpers'
import classNames from 'classnames'
import MultiToggle from '@/components/MultiToggle'
import { NetworkType } from '@/api/resources/shared/crypto'
import { CRYPTO_NETWORKS } from '@/constants/cryptoNetworks'
import { WalletAddressGetResponse } from '@/api/resources/user/wallet/address/get/schema'
import CopyButton from '@/components/Button/CopyButton'
import { DepositViewType } from '@/features/wallet/deposit/types'
import { USDCHeaderItem } from '@/features/wallet/core/components/USDCHeaderItem'

type DepositState = 'token' | 'deposit'
interface Props {
  className?: string
  address?: WalletAddressGetResponse
  state: DepositState
  network?: NetworkType
  onChange?: (type: DepositViewType) => void
  viewState?: DepositViewType
}

export default function USDCDepositSelector({
  className,
  address,
  onChange,
  state = 'token',
  network = 'POLY',
  viewState = 'copy'
}: Props) {
  const shouldShowNetwork = state !== 'token'
  const shouldShowDepositSelector = shouldShowNetwork
  const { label, icon } = CRYPTO_NETWORKS[network]

  return (
    <div className={classNames(className)}>
      {shouldShowDepositSelector && (
        <MultiToggle
          className="mb-3 bg-gray-800"
          items={[
            { label: 'Copy Address', value: 'copy' },
            { label: 'Scan QR Code', value: 'scan' }
          ]}
          value={viewState}
          onToggle={val => {
            onChange?.(val as DepositViewType)
          }}
        />
      )}

      <div
        style={{
          '--containerXPadding': cssFormattedSpacing(3),
          '--containerYPadding': cssFormattedSpacing(2)
        }}
        className={'border border-gray-700 rounded-2xl'}
      >
        <div className="grid grid-cols-2 py-[var(--containerYPadding)] border-b border-inherit">
          <USDCHeaderItem category="Token" label="USDC" icon="usdc" />

          {shouldShowNetwork && (
            <USDCHeaderItem category="Network" label={label} icon={icon} />
          )}
        </div>

        {shouldShowDepositSelector && !!address && (
          <div className="py-[var(--containerYPadding)] px-[var(--containerXPadding)] flex gap-3 border-b border-inherit">
            {viewState === 'scan' ? (
              <>
                <div className="h-16 w-16 flex-shrink-0 bg-gray-100">
                  <QRCode htmlString={address.image} />
                </div>
                <p className="text-gray-300 body-xs">
                  To easily paste your USDC deposit address, scan this QR code
                  from inside your crypto exchange’s app or external USDC
                  wallet.
                </p>
              </>
            ) : (
              <>
                <h4 className="h7 mb-1 text-gray-300">{label} Address</h4>
                <div className="flex gap-3 items-center justify-between">
                  <p className="break-all">{address.details.address}</p>
                  <CopyButton
                    className="flex-shrink-0"
                    valueToCopy={address.details.address}
                    successMessage="Address Copied."
                  />
                </div>
              </>
            )}
          </div>
        )}

        <div className="py-[var(--containerYPadding)] px-[var(--containerXPadding)]">
          <p className="text-alert body-sm">
            {getDepositInformationalText(state, network)}
          </p>
        </div>
      </div>
    </div>
  )
}

const getDepositInformationalText = (
  state: DepositState,
  network: NetworkType
): string => {
  switch (state) {
    case 'token':
      return 'Droppp only supports sending USDC at this time. Sending any other cryptocurrency will result in a loss of funds and will not be recoverable by Droppp.'
    case 'deposit':
      return `Sending USDC to the address above through any network other than ${CRYPTO_NETWORKS[network].label} will result in a loss of funds and will not be recoverable by Droppp. Sending any other cryptocurrency, including ${CRYPTO_NETWORKS[network].otherCurrencies} will also result in a loss of funds and will not be recoverable by Droppp.`
  }
}

const QRCode = ({ htmlString }) => (
  <div dangerouslySetInnerHTML={{ __html: htmlString }} />
)
