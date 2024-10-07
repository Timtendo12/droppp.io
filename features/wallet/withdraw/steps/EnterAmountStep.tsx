import React, { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  FinalizeTransition,
  WithdrawalSequence,
  WithdrawalStepConfiguration,
  WithdrawalStepProps,
  WithdrawalSteps
} from '@/features/wallet/withdraw/types'
import Button from '@/components/Button'
import * as modalProps from '@/components/Modals/ModalV2/shared/props'
import { useWithdrawalContext } from '@/features/wallet/withdraw/WithdrawalProvider'
import Field from '@/components/Field'
import { Input } from '@/components'
import { ControlledConfirmation } from '@/components/AcknowledgeBox/Confirmation'
import { useWithdrawalLimits } from '@/features/wallet/withdraw/hooks/useWithdrawalLimits'
import { AvailableBalance } from '@/features/wallet/withdraw/components/AvailableBalance'
import { NetworkConfirmation } from '@/features/wallet/withdraw/components/NetworkConfirmation'
import { WithdrawalLimit } from '@/features/wallet/core/limits'

const defineForm = (minimum: WithdrawalLimit, maximum: WithdrawalLimit) =>
  z.object({
    amount: z.coerce
      .number()
      .min(minimum.value, {
        message: `You must withdraw a minimum of ${minimum.formatted}`
      })
      .max(maximum.value, {
        message: 'You cannot exceed your available balance'
      }),
    confirmed: z.literal(true)
  })

const EnterAmountStep = ({
  sequence,
  ModalBody,
  ModalFooter
}: WithdrawalStepProps) => {
  const context = useWithdrawalContext()
  const { balance, transitionTo, withdrawal, selectedNetwork } = context

  const { minimum, maximum } = useWithdrawalLimits({ balance, selectedNetwork })
  const form = useMemo(() => defineForm(minimum, maximum), [maximum, minimum])

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    watch,
    setValue
  } = useForm<z.infer<typeof form>>({
    defaultValues: {
      amount: withdrawal.amount ?? ('' as any)
    },
    resolver: zodResolver(form),
    mode: 'onChange'
  })

  const submitForm = handleSubmit(formData => {
    const { amount } = formData
    transitionTo<FinalizeTransition>({
      step: 'finalizeStep',
      sequence,
      payload: { amount }
    })
  })

  const amount = watch('amount')
  const autoMaxEnabled = amount != balance

  const handleAutoMaxClick = () =>
    setValue('amount', balance, { shouldValidate: true })

  return (
    <form onSubmit={submitForm}>
      <ModalBody>
        <div className="flex flex-col gap-3">
          <p className="text-gray-300">
            Send your Droppp Balance to an external crypto address.
          </p>
          <AvailableBalance balance={balance} amount={amount} />
          <Field name="amount" errors={errors}>
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <Input
                  hasError={!!errors?.amount}
                  format="currency"
                  currency="usdc"
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder="0.00"
                  info={
                    <Button
                      disabled={!autoMaxEnabled}
                      theme={autoMaxEnabled ? 'blue' : 'gray-transparent'}
                      size="xs"
                      onClick={handleAutoMaxClick}
                    >
                      Max
                    </Button>
                  }
                  {...field}
                />
              )}
            />
          </Field>
          <NetworkConfirmation networkDetail={selectedNetwork} />
          <ControlledConfirmation
            className="bg-gray-800"
            name="confirmed"
            control={control}
            required
          >
            Yes, I’ve confirmed that the address is capable of receiving USDC
            over the {selectedNetwork.label} network.
          </ControlledConfirmation>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button disabled={!isValid} {...modalProps.submit}>
          PREVIEW
        </Button>
      </ModalFooter>
    </form>
  )
}

EnterAmountStep.configure = (
  sequence: WithdrawalSequence
): WithdrawalStepConfiguration => {
  return {
    id: WithdrawalSteps.enterAmount,
    title: 'Enter Amount to Withdraw',
    onRetreat: () => sequence.goTo(WithdrawalSteps.chooseNetwork),
    view: props => (
      <EnterAmountStep sequence={sequence} {...props}></EnterAmountStep>
    )
  }
}

export { EnterAmountStep }
