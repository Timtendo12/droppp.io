import classnames from 'classnames'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, InputCustomAddress, Radio } from '..'

export default function WalletSelector() {
  const [customAddress, setCustomAddress] = useState(false)
  const [valid, setValid] = useState(false)
  const router = useRouter()

  const createWallet = event => {
    event.preventDefault()

    window.dataLayer.push({
      'addressType' : customAddress ? "custom" : "free"
    })

    if (customAddress) {
      const { customAddress } = event.target
      return router.push(`/purchase-wax?address=${customAddress.value}`)
    }

    router.push('/setup-2fa')
  }

  return (
    <form onSubmit={createWallet}>
      <div className="flex mt-3 border border-gray-700 rounded-3xl overflow-hidden">
        <WalletAddressOption
          isSelected={!customAddress}
          onChange={() => setCustomAddress(false)}
            
          label="Random Address"
          price="Free"
        />
        <WalletAddressOption
          isSelected={customAddress}
          onChange={() => setCustomAddress(true)}
          label="Custom Address"
          price="Only $4.99"
        />
      </div>
      <div
        className={classnames('flex flex-col', {
          'flex-col-reverse': !customAddress,
          'mt-2': customAddress
        })}
      >
        <InputCustomAddress
          onChange={undefined}
          className={customAddress ? 'visible' : 'invisible'}
          onChangeValidation={setValid}
        />
        <div
          className={classnames('body-sm text-gray-300 mt-1', {
            invisible: !customAddress
          })}
        >
          Max character limit is 9. Valid characters are a–z and 1–5.
        </div>
        <Button
          className="w-full mt-3"
          size="lg"
          disabled={customAddress && !valid}
          type="submit"
        >
          Continue{customAddress ? ' to Purchase' : ''}
        </Button>
      </div>
    </form>
  )
}

const WalletAddressOption = ({ isSelected, onChange, label, price }) => {
  return (
    <div
      className={classnames(
        'flex flex-col items-center w-full  border-gray-700 relative first:border-r',
        isSelected ? 'bg-gray-800 text-white' : 'bg-gray-850 text-gray-300'
      )}
    >
      <Radio
        onChange={onChange}
        selected={isSelected}
        className="flex flex-col p-2 mt-0"
      >
        <div className="h6">{label}</div>
        <div className="body mt-[4px] mb-1">{price}</div>
      </Radio>
    </div>
  )
}
