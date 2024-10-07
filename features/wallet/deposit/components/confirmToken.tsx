import React from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { ControlledConfirmation } from '@/components/AcknowledgeBox/Confirmation'
import CoinbaseOverlayDisclaimer from '@/features/wallet/deposit/components/CoinbaseOverlayDisclaimer'
import USDCDepositSelector from '@/features/wallet/deposit/components/USDCDepositSelector'
import { submit } from '@/components/Modals/ModalV2/shared/props'
import Button from '@/components/Button'
import SubFooter from '@/features/wallet/deposit/components/SubFooter'
import {
  useDepositContext,
  useDepositDispatch
} from '@/features/wallet/deposit/components/DepositContext'
import {
  ContentType,
  DepositViewBodyProps
} from '@/features/wallet/deposit/types'
import { DEPOSIT_CLOUDINARY_PATH } from '../../core/constants'

const ConfirmTokenBody = ({
  next,
  ModalBody,
  ModalFooter
}: DepositViewBodyProps) => {
  const { confirm } = useDepositContext()
  const dispatch = useDepositDispatch()

  // @TODO - fix any, control wasn't playing well with default values. Josh Dobson - 1/17/24
  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm<any>({ defaultValues: { confirm } })

  const onSubmit = (e: FieldValues) => {
    dispatch({ type: 'confirm', payload: e.confirm })
    next()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalBody>
        <div className="flex flex-col gap-3">
          <p className="text-gray-300">
            To start, please confirm that the token you are sending from your
            external exchange (or wallet) matches the token below.
          </p>
          <USDCDepositSelector state={'token'} />
          <ControlledConfirmation
            className="bg-gray-800"
            name="confirm"
            control={control}
            required
          >
            Yes, I’ve confirmed that the token I am sending is USDC.
          </ControlledConfirmation>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button disabled={!isValid} {...submit} type="submit">
          Next
        </Button>
        <SubFooter />
      </ModalFooter>
    </form>
  )
}

export const Content: ContentType = {
  title: `Confirm Token`,
  header: {
    className: 'bg-gradient-to-b from-gray-850/0 to-black aspect-[9/5]',
    overlayComponent: <CoinbaseOverlayDisclaimer />,
    video: {
      path: DEPOSIT_CLOUDINARY_PATH,
      id: 'tutorial-usdc'
    }
  },
  view: props => <ConfirmTokenBody {...props} />
}
