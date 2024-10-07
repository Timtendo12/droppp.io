import NiceModal from '@ebay/nice-modal-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MODAL_ID } from '@/constants/modalId'
import { requiredField } from '@/util/forms/inputValidators'
import { Input } from '@/components/Inputs'
import Toast from '@/components/Toast'
import Button from '@/components/Button'
import Field from '@/components/Field'
import Modal from './'
import ErrorBox from '@/components/ErrorBox'
import { useUserEmailSetRequestMutation } from '@/api/resources/user/email/set/request'
import { ApiError } from '@/api/core/errors'
import { emailRegex } from '@/constants'

const INPUTS = {
  email: 'email',
  password: 'password'
}

const ChangeEmailModal = () => {
  return (
    <Modal id={MODAL_ID.changeEmail} title="Change Email">
      {modalProps => <ChangeEmailForm {...modalProps} />}
    </Modal>
  )
}

export default ChangeEmailModal

const ChangeEmailForm = ({ ModalBody, ModalFooter }) => {
  const [error, setError] = useState<ApiError>(null)

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange'
  })
  const email = watch(INPUTS.email)

  const { mutate: setEmailRequest, isLoading } = useUserEmailSetRequestMutation(
    {
      onSuccess: () => {
        Toast({
          type: 'success',
          title: 'Verify your new email address',
          description: `A confirmation email was sent to ${email}.`
        })
        NiceModal.hide(MODAL_ID.changeEmail)
      },
      onError: (err: ApiError) => setError(err)
    }
  )

  const requestChangeEmail = formData => {
    setError(null)
    setEmailRequest(formData)
  }

  return (
    <form onSubmit={handleSubmit(requestChangeEmail)}>
      <ModalBody>
        <Field name={INPUTS.email} errors={errors} label="New Email">
          <Input
            register={register(INPUTS.email, {
              required: 'This field is required',
              pattern: {
                value: emailRegex,
                message: 'Invalid email address.'
              }
            })}
            id={INPUTS.email}
            placeholder="Type Email Address"
          />
        </Field>
        <Field
          className="mt-3"
          name={INPUTS.password}
          errors={errors}
          label="Current Password"
        >
          <Input
            register={register(INPUTS.password, {
              ...requiredField()
            })}
            id={INPUTS.password}
            type="password"
            placeholder="Type Current Password"
          />
        </Field>
        <ErrorBox className="mt-2" error={error} shouldShowTitle={false} />
      </ModalBody>
      <ModalFooter>
        <Button
          loading={isLoading}
          disabled={!isValid}
          size="lg"
          type="submit"
          className="w-full"
        >
          Apply
        </Button>
      </ModalFooter>
    </form>
  )
}
