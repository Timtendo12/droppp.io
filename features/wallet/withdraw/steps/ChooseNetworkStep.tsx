import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import {
  EnterAmountTransition,
  WithdrawalSequence,
  WithdrawalStepConfiguration,
  WithdrawalStepProps,
  WithdrawalSteps,
  AddressPayload
} from '@/features/wallet/withdraw/types'
import Button from '@/components/Button'
import * as modalProps from '@/components/Modals/ModalV2/shared/props'
import { useWithdrawalContext } from '@/features/wallet/withdraw/WithdrawalProvider'
import Field from '@/components/Field'
import ControlledWalletAddressInput from '../components/ControlledWalletAddressInput'
import { ControlledCryptoNetworkSelector } from '../../deposit/components/CryptoNetworkSelector'
import { parseAvailableWithdrawalNetworks } from '../utils/parseAvailableWithdrawalNetworks'

const INPUTS: Record<keyof AddressPayload, string> = {
  address: 'address',
  network: 'network'
}

const ChooseNetworkStep = ({
  sequence,
  ModalBody,
  ModalFooter
}: WithdrawalStepProps) => {
  const {
    transitionTo,
    networkFees,
    balance,
    withdrawal: { address, network }
  } = useWithdrawalContext()

  const {
    handleSubmit,
    formState: { isValid, errors },
    control
  } = useForm<AddressPayload>({
    defaultValues: {
      address: address || '',
      network
    },
    mode: 'onChange'
  })

  const withdrawalNetworkOptions = useMemo(
    () => parseAvailableWithdrawalNetworks(networkFees, balance),
    [balance]
  )

  const submitForm = (data: AddressPayload) => {
    const { address, network } = data
    transitionTo<EnterAmountTransition>({
      step: 'enterAmountStep',
      sequence,
      payload: {
        network,
        address
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <ModalBody>
        <div className="flex flex-col gap-3">
          <p className="text-gray-300">
            Send your Droppp Balance to an external crypto address.
          </p>
          <Field
            name={INPUTS.address}
            errors={errors}
            label={`USDC Wallet Address`}
          >
            <ControlledWalletAddressInput
              name={INPUTS.address}
              control={control as any}
            />
          </Field>
          <Field
            name={INPUTS.network}
            errors={errors}
            label={`Choose a network`}
          >
            <p className="text-gray-300 mb-2 body-sm">
              Select a network for transferring funds from Droppp to an external
              wallet or exchange.
            </p>
            <ControlledCryptoNetworkSelector
              className="px-2 border border-defaultBorder rounded-2xl"
              name={INPUTS.network}
              control={control}
              required
              options={withdrawalNetworkOptions}
            />
          </Field>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button disabled={!isValid} {...modalProps.submit}>
          Next
        </Button>
      </ModalFooter>
    </form>
  )
}

ChooseNetworkStep.configure = (
  sequence: WithdrawalSequence
): WithdrawalStepConfiguration => {
  return {
    id: WithdrawalSteps.chooseNetwork,
    title: 'Enter withdrawal address & Choose network',
    view: props => (
      <ChooseNetworkStep sequence={sequence} {...props}></ChooseNetworkStep>
    )
  }
}

export { ChooseNetworkStep }
