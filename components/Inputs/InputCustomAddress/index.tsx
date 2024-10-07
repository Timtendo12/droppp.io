import classnames from 'classnames'
import { debounce } from 'lodash'
import React, { useRef, useState, useCallback } from 'react'
import { addressRegex } from '@/constants'
import { Icon, InputAutoSize } from '@/components'
import { tryApiAction } from '@/api/core/compat'
import { checkWaxAddress } from '@/api/resources/user/account/wax/check'
import { CheckWaxAddressResponse } from '@/api/resources/user/account/wax/check/schema'

interface Props {
  className?: string
  onChange: (address: string) => void
  onChangeValidation?: (isValid: boolean) => void
}

const InputCustomAddress = ({
  className = '',
  onChange,
  onChangeValidation
}: Props) => {
  const [address, setAddress] = useState('')
  const [valid, setValid] = useState(true)
  const [supported, setSupported] = useState(true)
  const [updating, setUpdating] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const validationLabel = !valid
    ? 'invalid'
    : !supported
    ? 'unavailable'
    : 'available'

  const handleChange = ({ target }) => {
    const address = target.value.toLowerCase()

    if (address.length > 9) {
      return
    }

    setAddress(address)
    onChange && onChange(address)
    setUpdating(true)
    onChangeValidation(false)
    handleAddressChange(address)
  }

  const handleAddressChange = useCallback(
    debounce(async address => {
      //Client side validation
      const isValid = !address || addressRegex.test(address)
      setValid(isValid)

      if (isValid) {
        //Server side validation
        const {
          data: { status }
        } = await tryApiAction<CheckWaxAddressResponse>(() =>
          checkWaxAddress(`${address}.dp`)
        )
        setSupported(status === 'ok')
        onChangeValidation(status === 'ok')
      } else {
        onChangeValidation(isValid)
      }
      setUpdating(false)
    }, 1000),
    []
  )

  return (
    <div
      className={classnames(
        className,
        'relative px-2 py-[12px] bg-gray-800 border border-gray-700 rounded-2xl'
      )}
      onClick={() => inputRef.current.focus()}
    >
      <InputAutoSize
        name="customAddress"
        inputRef={ref => (inputRef.current = ref)}
        className="w-full cursor-text after:content-['.dp'] body"
        value={address}
        placeholder="droppp"
        onChange={handleChange}
      />
      <div
        className={classnames(
          'absolute top-1/2 right-2 -translate-y-1/2 flex items-center body-sm capitalize text-success',
          {
            '!text-error': !valid || !supported
          }
        )}
      >
        {!address || (!!address && updating) ? (
          <div className="text-gray-300">{address.length}/9</div>
        ) : (
          <>
            {validationLabel}
            {!updating && (
              <Icon className="transform-gpu ml-1" name={validationLabel} />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default InputCustomAddress
