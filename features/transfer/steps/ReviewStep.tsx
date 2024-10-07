import React from 'react'
import {
  ConfirmTransition,
  ReviewPayload,
  TransferSequence,
  TransferStepConfiguration,
  TransferStepProps,
  TransferSteps
} from '../types'
import { Button } from '@/components'
import { useTransferContext } from '../TransferProvider'
import { ModalCloseButton } from '@/components/Modals/ModalV2/ModalCloseButton'
import { TransferForm } from '../forms/ReviewTransferForm'

import * as modalProps from '@/components/Modals/ModalV2/shared/props'
import { FormProvider, useForm } from 'react-hook-form'
import MobileListModalTrigger from '../components/MobileListModalTrigger'
import ReviewListColumn from '../components/ReviewListColumn/ReviewListColumn'
import useBreakpoints from '@/hooks/useBreakpoints'

export default function ReviewStep({
  sequence,
  ModalBody,
  ModalFooter
}: TransferStepProps) {
  const { isMedium } = useBreakpoints(['md'])
  const context = useTransferContext()
  const {
    transitionTo,
    transfer,
    transfer: { assets }
  } = context

  const methods = useForm<ReviewPayload>({
    defaultValues: {
      to: transfer.to,
      memo: transfer.memo
    },
    mode: 'onChange'
  })
  const {
    formState: { isValid, isSubmitting, isValidating },
    handleSubmit
  } = methods

  const submitForm = (data: ReviewPayload) => {
    const { memo } = data
    transitionTo<ConfirmTransition>({
      step: 'confirm',
      sequence,
      payload: { memo }
    })
  }

  const shouldDisableSubmit =
    !isValid || isSubmitting || isValidating || !assets?.length

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submitForm)}>
        <ModalBody className="w-full">
          <div className="grid md:grid-cols-2 -mx-3 -mb-3 max-md:!min-h-[50vh] min-h-0 flex-1 border-gray-900">
            <div className="border-r-1 border-[inherit] flex-1 flex-col flex md:pt-3 min-h-0">
              <div className="px-3 flex-col flex gap-2">
                <ModalCloseButton
                  className="max-md:hidden flex-shrink-0 !ml-0"
                  onClick={sequence.close}
                />
                <h1 className="h4 max-md:hidden">Item Transfer</h1>
              </div>

              <TransferForm shouldDisableSubmit={shouldDisableSubmit} />

              <MobileListModalTrigger
                className="md:hidden px-3"
                onClick={() => sequence.goTo(TransferSteps.transferableAssets)}
              />
            </div>

            <ReviewListColumn className="max-md:hidden" />
          </div>
        </ModalBody>
        <ModalFooter className="md:hidden">
          <Button
            role={isMedium ? 'button' : 'none'}
            disabled={shouldDisableSubmit}
            {...modalProps.submit}
          >
            Continue
          </Button>
        </ModalFooter>
      </form>
    </FormProvider>
  )
}

ReviewStep.configure = (
  sequence: TransferSequence,
  isMobile: boolean
): TransferStepConfiguration => {
  return {
    id: TransferSteps.review,
    title: isMobile ? 'Item Transfer' : null,
    className: 'md:w-[980px] md:max-w-full !pb-0',
    shouldHideHeader: !isMobile,
    view: props => <ReviewStep {...props} sequence={sequence} />
  }
}
