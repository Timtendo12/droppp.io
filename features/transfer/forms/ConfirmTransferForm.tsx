import React, { useCallback } from 'react'
import Field from '@/components/Field'

import { ControlledInputAddress } from '../components/ControlledInputAddress'
import Turnstile from '@/components/Turnstile'
import { TurnstileInstance } from '@marsidev/react-turnstile'
import { useFormContext } from 'react-hook-form'
import { getOwnerAddress } from '@/util/assetHelpers'
import { useTransferContext, useTransferDispatch } from '../TransferProvider'
import pDebounce from 'p-debounce'
import { TRANSFER_FORM_INPUTS } from '../constants'

export default function ConfirmTransferForm({
  refTurnstile
}: {
  refTurnstile: React.RefObject<TurnstileInstance>
}) {
  const dispatch = useTransferDispatch()

  const {
    formState: { errors }
  } = useFormContext()

  const {
    isCaptchaEnabled,
    preview: { transferable_assets },
    transfer: { to }
  } = useTransferContext()

  const fromAddress = getOwnerAddress(transferable_assets.items)?.join(' and ')

  const addressMatchValidator = useCallback(
    pDebounce(
      (value: string) => value === to || `Address does not match "${to}".`,
      500
    ),
    []
  )

  return (
    <div>
      <p className="body text-gray-300 mb-3">
        This action is irreversible and cannot be undone. Please confirm this
        transfer by re-entering the destination address.
        <br />
        <br /> By confirming, you acknowledge that your items will be
        immediately transferred from{' '}
        <span className="text-white">{fromAddress}</span> to{' '}
        <span className="text-white">{to}</span> on the blockchain.
      </p>
      <Field
        name={TRANSFER_FORM_INPUTS.confirmTo}
        label={'Confirm Address'}
        errors={errors}
      >
        <ControlledInputAddress
          withFavorites={false}
          checkIfAddressExists={false}
          validator={{
            addressMatch: addressMatchValidator
          }}
          name={TRANSFER_FORM_INPUTS.confirmTo}
          placeholder="Wax Destination Address"
        />
      </Field>
      {isCaptchaEnabled && (
        <Turnstile
          ref={refTurnstile}
          // min-height class reduces jank when turnstile is loading
          className="mt-2 min-h-[61px]"
          theme="dark"
          onSuccess={captcha_token =>
            dispatch({ type: 'SET_CAPTCHA_TOKEN', payload: { captcha_token } })
          }
        />
      )}
    </div>
  )
}
