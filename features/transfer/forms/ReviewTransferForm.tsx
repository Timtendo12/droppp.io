import React from 'react'
import Button from '@/components/Button'
import Field from '@/components/Field'
import { Input } from '@/components/Inputs'
import { ControlledInputAddress } from '../components/ControlledInputAddress'
import { useFormContext } from 'react-hook-form'
import { useTransferDispatch } from '../TransferProvider'
import { TRANSFER_FORM_INPUTS } from '../constants'
import useBreakpoints from '@/hooks/useBreakpoints'

export const TransferForm = ({
  shouldDisableSubmit
}: {
  shouldDisableSubmit: boolean
}) => {
  const { isMedium } = useBreakpoints(['md'])
  const {
    register,
    formState: { isSubmitting }
  } = useFormContext()

  const dispatch = useTransferDispatch()

  return (
    <div className="flex flex-col">
      <div className="px-3 md:my-3 flex flex-col gap-3">
        <Field name={TRANSFER_FORM_INPUTS.to} label={'Destination Address'}>
          <ControlledInputAddress
            onValidAddress={({ value, captcha_enabled }) => {
              dispatch({
                type: 'SET_TO_ADDRESS',
                payload: { to: value, captcha_enabled }
              })
            }}
            name={TRANSFER_FORM_INPUTS.to}
            placeholder="Wax Destination Address"
          />
        </Field>

        <Field name={TRANSFER_FORM_INPUTS.memo} label={'Memo'} optional>
          <Input
            className="!h-13"
            name={TRANSFER_FORM_INPUTS.memo}
            register={register(TRANSFER_FORM_INPUTS.memo)}
            format="textarea"
            placeholder="Memo"
          />
        </Field>
      </div>

      <div className="p-3 border-t border-[var(--borderColor)] max-md:hidden">
        <Button
          type="submit"
          className="w-full"
          role={!isMedium ? 'button' : 'none'}
          disabled={shouldDisableSubmit}
          loading={isSubmitting}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
