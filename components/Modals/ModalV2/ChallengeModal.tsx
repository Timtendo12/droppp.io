import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useAuth } from '@/contexts/auth'
import { Button, Input } from '@/components'
import Modal from './BaseModal'
import ModalStateGraphic from './ModalStateGraphic'
import { getDropOrderAssets } from '@/api/resources/drop/order/assets/get'
import { tryApiAction } from '@/api/core/compat'
import { useForm } from 'react-hook-form'
import Field from '@/components/Field'
import { ApiErrorResponse } from '@/api/core/errors'
import { DropOrderAssetsGetResponse } from '@/api/resources/drop/order/assets/get/schema'

interface Props {
  onSuccess: (res: DropOrderAssetsGetResponse) => void
  onError: (res: ApiErrorResponse) => void
}

const ChallengeModal = NiceModal.create<Props>(({ onSuccess, onError }) => {
  const { hide, visible, remove } = useModal()
  const [blockActions, setBlockActions] = useState(false)
  const router = useRouter()

  const handleBack = () => router.back()

  const onChallengeSuccess = (res: DropOrderAssetsGetResponse) => {
    onSuccess?.(res)
    setBlockActions(false)
    hide()
  }

  const onChallegeError = (res: ApiErrorResponse) => {
    setBlockActions(false)

    // only send error through if it's not a challenge error
    if (!res.challengeError) {
      onError?.(res)
      hide()
    }
  }

  return (
    <Modal
      onRetreat={handleBack}
      className="px-[var(--modalPadding)]"
      shouldHideHeader
      isOpen={visible}
      isCancelDisabled
      hide={handleBack}
      onAfterClose={remove}
      shouldBlockActions={blockActions}
    >
      {modalProps => (
        <ChallengeForm
          {...modalProps}
          onSuccess={onChallengeSuccess}
          onError={onChallegeError}
          onSubmitting={() => setBlockActions(true)}
        />
      )}
    </Modal>
  )
})

export default ChallengeModal

const ChallengeForm = ({
  ModalBody,
  ModalFooter,
  onSuccess,
  onError,
  onSubmitting
}) => {
  const router = useRouter()
  const { drop_id } = router.query
  const { user, fetchUser } = useAuth()
  const {
    register,
    getValues,
    handleSubmit,
    setError,
    formState: { isSubmitting, isValid, errors }
  } = useForm()

  const handleComplete = async () => {
    onSubmitting()
    const answer = getValues('answer')
    const input = { drop_id: drop_id?.toString(), answer }
    const res = await tryApiAction<DropOrderAssetsGetResponse>(() =>
      getDropOrderAssets(user, input)
    )
    if (res.data.status === 'error') {
      if (res.data.challengeError) {
        await fetchUser?.()
        setError('answer', { message: res.data.errors.generic })
      }
      onError(res.data)
    } else {
      onSuccess(res.data)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleComplete)}>
      <ModalBody className="text-center ">
        <ModalStateGraphic
          icon="bot"
          className="mx-auto mt-[var(--modalPadding)]"
        />
        <div className="h3 mt-3">Human Detection</div>
        <div className="body mt-2 text-gray-300">{user.challenge}</div>
        <Field name="answer" errors={errors}>
          <Input
            className="mt-3"
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Enter Answer"
            register={register('answer')}
          />
        </Field>
      </ModalBody>
      <ModalFooter>
        <Button
          className="w-full"
          loading={isSubmitting}
          disabled={!isValid}
          type="submit"
          size="lg"
        >
          Continue
        </Button>
      </ModalFooter>
    </form>
  )
}
