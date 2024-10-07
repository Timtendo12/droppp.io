import React, { useRef } from 'react'
import {
  TransferSequence,
  TransferStepConfiguration,
  TransferStepProps,
  TransferSteps
} from '../types'
import { Button, Toast } from '@/components'
import * as modalProps from '@/components/Modals/ModalV2/shared/props'
import { useTransferContext, useTransferDispatch } from '../TransferProvider'
import { addTransfer } from '@/api/resources/user/assets/transfer/add'
import { tryApiAction } from '@/api/core/compat'
import { TransferAddResponse } from '@/api/resources/user/assets/transfer/add/schema'
import { addFavoriteAddress } from '@/util/persistDataHelpers'
import { useInventory } from '@/hooks/useInventory'
import { useLayoutData } from '@/contexts/layout'
import { hideModal, showModal } from '@/components/Modals/ModalV2'
import { MODAL_ID } from '@/constants/modalId'
import { useAuth } from '@/contexts/auth'
import { useRouter } from 'next/router'
import ConfirmTransferForm from '../forms/ConfirmTransferForm'
import { FormProvider, useForm } from 'react-hook-form'
import { TurnstileInstance } from '@marsidev/react-turnstile'
import { Success } from '../modals/Success'
import { TRANSFER_FORM_INPUTS } from '../constants'
import { useQueryClient } from '@tanstack/react-query'
import { path } from '@/api/resources/user/assets/transfer/preview'

export default function ConfirmStep({
  sequence,
  ModalBody,
  ModalFooter
}: TransferStepProps) {
  const refTurnstile = useRef<TurnstileInstance>(null)
  const router = useRouter()
  const { user } = useAuth()
  const { updateSelectedAssets } = useLayoutData()
  const { isCaptchaEnabled, transfer, transitionTo } = useTransferContext()
  const { removeAssets } = useInventory()
  const dispatch = useTransferDispatch()
  const queryClient = useQueryClient()

  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      [TRANSFER_FORM_INPUTS.confirmTo]: ''
    }
  })
  const {
    handleSubmit,
    formState: { isValid, isSubmitting }
  } = methods

  const { to, assets } = transfer

  const onSuccess = id => {
    showModal(MODAL_ID.success, Success({ to, id, router }))
    addFavoriteAddress(to)

    // invalidate cache
    removeAssets(assets)

    // reset selected assets on inventory view
    updateSelectedAssets([])

    setTimeout(() => hideModal(MODAL_ID.transfer.review), 250)
  }

  const submitForm = async () => {
    const { success, data: responseData } =
      await tryApiAction<TransferAddResponse>(() => addTransfer(transfer))

    if (success === true) {
      onSuccess(responseData.action.id)
    } else {
      const { mfa_required } = responseData
      if (mfa_required) {
        if (user.mfa_type === 'sms') {
          Toast({
            type: 'success',
            title: 'Success',
            description: 'A code was sent via SMS to your device.'
          })
        }
        showModal(MODAL_ID.twoFA, {
          onAuthorized: async (code: string) => {
            const { success, data } = await tryApiAction<TransferAddResponse>(
              () =>
                addTransfer({
                  ...transfer,
                  code
                })
            )
            if (success) {
              onSuccess(data.action.id)
            } else {
              return { success: false, error: data }
            }
          }
        })
      } else {
        if (isCaptchaEnabled) {
          // reset captcha
          dispatch({
            type: 'SET_CAPTCHA_TOKEN',
            payload: { captcha_token: '' }
          })
          refTurnstile?.current?.reset()
        }
        // throw up generic toast
        Toast({
          type: 'warning',
          description: Object.entries(responseData.errors)[0][1]
        })
        // invalidate all preview queries
        queryClient.invalidateQueries([path])
        transitionTo({
          step: 'review',
          sequence,
          payload: undefined
        })
      }
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submitForm)}>
        <ModalBody>
          <ConfirmTransferForm refTurnstile={refTurnstile} />
        </ModalBody>
        <ModalFooter>
          <Button
            loading={isSubmitting}
            disabled={!isValid}
            {...modalProps.submit}
          >
            Transfer
          </Button>
        </ModalFooter>
      </form>
    </FormProvider>
  )
}

ConfirmStep.configure = (
  sequence: TransferSequence
): TransferStepConfiguration => {
  return {
    id: TransferSteps.confirm,
    title: 'Confirm Transfer',
    onRetreat: () => sequence.goTo(TransferSteps.review),
    view: props => <ConfirmStep {...props} sequence={sequence} />
  }
}
