import { validateCryptoAddress } from '@/api/resources/crypto/address/validate'
import { isTest } from '@/config'
import { debouncePromise } from '@/util/functionHelpers'
import React, { useCallback, useRef, useState } from 'react'
import { Control, useController } from 'react-hook-form'
import * as Sentry from '@sentry/nextjs'
import { Input } from '@/components/Inputs'
import { NetworkType } from '@/api/resources/shared/crypto'
import { Icon, Loading } from '@/components'
import { requiredField } from '@/util/forms/inputValidators'

const VALIDATE_ADDRESS_DEBOUNCE_MS = isTest ? 0 : 500
const MAX_ADDRESS_LENGTH = 100

interface Props {
  name: string
  network?: NetworkType
  control?: Control
}

export default function ControlledWalletAddressInput({
  control,
  name,
  network = 'ETH'
}: Props) {
  const [isValidating, setIsValidating] = useState(false)
  const isValidAddress = useRef(false)

  const validateDestinationAddress = useCallback(
    debouncePromise(async (address: string) => {
      let errorMessage: string

      try {
        const { valid, error } = await validateCryptoAddress({
          address,
          chain: network
        })
        errorMessage = error
        isValidAddress.current = valid
      } catch (error) {
        Sentry.captureException(error)
      } finally {
        setIsValidating(false)
        return isValidAddress.current || errorMessage
      }
    }, VALIDATE_ADDRESS_DEBOUNCE_MS),
    []
  )

  const {
    field: { onChange, value },
    fieldState: { error, invalid, isDirty }
  } = useController({
    name,
    control,
    rules: {
      ...requiredField(),
      validate: val => {
        // This will handle additional validation checks without having to do an additional request - Josh Dobson - 2/6/24
        if (val === value) {
          return isValidAddress.current
        }
        if (val !== value) {
          setIsValidating(true)
          return validateDestinationAddress(val)
        }
      }
    }
  })
  const showValidIcon = !invalid && isDirty

  const addressStateComponent = isValidating ? (
    <div className="relative w-[20px] h-[20px]">
      <Loading size="small" />
    </div>
  ) : showValidIcon ? (
    <Icon name="confirmed" />
  ) : null

  return (
    <Input
      hasError={!!error && !isValidating}
      placeholder={`USDC Address`}
      autoComplete="off"
      maxLength={MAX_ADDRESS_LENGTH}
      spellCheck={false}
      value={value}
      onChange={onChange}
      info={addressStateComponent}
    />
  )
}
