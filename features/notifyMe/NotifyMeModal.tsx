import React from 'react'
import NiceModal from '@ebay/nice-modal-react'
import { useForm } from 'react-hook-form'
import { MODAL_ID } from '@/constants/modalId'
import { getDropCloudinaryFolderById, findDropConfigById } from '@/config/drops'
import Modal, { hideModal } from '@/components/Modals/ModalV2'
import Field from '@/components/Field'
import Input from '@/components/Inputs/Input'
import Button from '@/components/Button'
import { emailRegex } from '@/constants'
import { Toast } from '@/components'
import { useSubscriptionSubscribeMutation } from '@/api/resources/subscription/subscribe'
import { sendGTMEvent } from '@next/third-parties/google'

type Props = {
  dropId: number
}

const INPUTS = {
  email: 'email'
}

const NotifyMeModal = NiceModal.create<Props>(({ dropId }: Props) => {
  const config = findDropConfigById(dropId)

  return (
    <Modal
      title={'Notify Me'}
      id={MODAL_ID.notifyMe}
      theme={config.theme}
      overlayHeaderOpaqueOnScroll
    >
      {props => <NotifyMeForm {...props} dropId={dropId} />}
    </Modal>
  )
})

export default NotifyMeModal

const NotifyMeForm = ({ ModalHeaderMedia, ModalBody, ModalFooter, dropId }) => {
  const {
    handleSubmit,
    register,
    formState: { isValid, errors }
  } = useForm({ mode: 'onChange', delayError: 1000 })

  const { mutate, isLoading } = useSubscriptionSubscribeMutation({
    onSuccess: () => {
      Toast({
        type: 'information',
        description: 'Check your email to finish subscribing.'
      })
      hideModal(MODAL_ID.notifyMe)

      sendGTMEvent({
        event: 'notify_me_complete',
        drop_id: dropId
      })
    }
  })

  const onSubmit = data => {
    const { email } = data
    mutate({ email, drop_id: dropId })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalHeaderMedia
        content={{
          image: {
            id: 'notifyme.png',
            path: getDropCloudinaryFolderById(dropId),
            alt: 'alt text',
            width: 480,
            height: 300
          }
        }}
      />
      <ModalBody>
        <p className="text-gray-300 pb-2">
          Sign up today to receive email notifications before the queue opens
          and for all key moments during this drop.
        </p>
        <Field
          className="w-full"
          name={INPUTS.email}
          errors={errors}
          label="Email Address"
        >
          <Input
            register={register(INPUTS.email, {
              required: 'This field is required',
              pattern: {
                value: emailRegex,
                message: 'Invalid email address.'
              }
            })}
            label="Email Address"
            id={INPUTS.email}
            placeholder="Type Email Address"
          />
        </Field>
        <p className="mt-2 body-xs text-gray-300">
          You may opt out of this collection’s drop moments by clicking the
          unsubscribe link in the email you receive.
        </p>
      </ModalBody>
      <ModalFooter>
        <Button
          type="submit"
          disabled={!isValid}
          loading={isLoading}
          theme="blue"
          className="w-full"
        >
          Notify Me
        </Button>
      </ModalFooter>
    </form>
  )
}
