import React, { useCallback } from 'react'
import {
  FieldValues,
  Validate,
  useController,
  useFormContext
} from 'react-hook-form'
import { tryApiAction } from '@/api/core/compat'
import { TransferCheckResponse } from '@/api/resources/user/assets/transfer/check/schema'
import { checkTransfer } from '@/api/resources/user/assets/transfer/check'
import { InputAddress } from '@/components/Inputs'
import pDebounce from 'p-debounce'

interface Props {
  name: string
  validator?:
    | Validate<any, FieldValues>
    | Record<string, Validate<any, FieldValues>>
  checkIfAddressExists?: boolean
  onValidAddress?: ({
    value,
    captcha_enabled
  }: {
    value: string
    captcha_enabled: boolean
  }) => void
  onInvalidAddress?: ({
    value,
    error
  }: {
    value: string
    error: string
  }) => void
  placeholder: string
  withFavorites?: boolean
}

export const ControlledInputAddress = React.memo(
  ({
    name,
    validator,
    checkIfAddressExists = true,
    onValidAddress,
    onInvalidAddress,
    placeholder,
    withFavorites
  }: Props) => {
    const prevValue = React.useRef<string | null>(null)

    const validateAddress = async (value: string): Promise<true | string> => {
      // suppress duplicate requests when the value hasn't changed
      if (value === prevValue.current || !fieldState.isDirty) return
      prevValue.current = value

      const { data } = await tryApiAction<TransferCheckResponse>(() =>
        checkTransfer(value)
      )
      if (data.status === 'ok') {
        onValidAddress?.({
          captcha_enabled: data.captcha_enabled,
          value
        })
        return true
      } else {
        onInvalidAddress?.({
          error: data.errors?.to || data.errors?.generic || data.errorMessage,
          value
        })
        return data.errors?.to || data.errors?.generic || data.errorMessage
      }
    }

    const debouncedAddressValidation = useCallback(
      pDebounce(validateAddress, 1000),
      []
    )

    const validate = {
      ...validator
    }
    if (checkIfAddressExists) {
      validate['validAddress'] = debouncedAddressValidation
    }

    const { formState, control } = useFormContext()
    const {
      field: { value, onChange },
      fieldState
    } = useController({
      name,
      control,
      rules: {
        required: true,
        validate
      }
    })

    return (
      <InputAddress
        withFavorites={withFavorites}
        value={value}
        placeholder={placeholder}
        valid={!fieldState.invalid}
        onChange={val => {
          onChange(val)
        }}
        loading={formState.isValidating}
      />
    )
  }
)
