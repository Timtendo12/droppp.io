import NiceModal from '@ebay/nice-modal-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MODAL_ID } from '@/constants/modalId'
import { requiredField } from '@/util/forms/inputValidators'
import ErrorBox from '@/components/ErrorBox'
import { Input } from '@/components/Inputs'
import Separator from '@/components/Separator'
import Button from '@/components/Button'
import Field from '@/components/Field'
import Toast from '@/components/Toast'
import Modal from './'
import { Error } from '@/api/resources/shared/error'
import { useUserPasswordSetMutation } from '@/api/resources/user/password/set'
import { ApiError } from '@/api/core/errors'

const INPUTS = {
  currentPassword: 'currentPassword',
  newPassword: 'newPassword',
  confirmPassword: 'confirmPassword'
}

const INPUT_VALIDATORS = {
  maxLength: {
    maxLength: {
      value: 1024,
      message: 'Password should be 8 to 1024 characters in length.'
    }
  },
  minLength: {
    minLength: {
      value: 8,
      message: 'Password should be 8 to 1024 characters in length.'
    }
  }
}

const ChangePasswordModal = () => {
  return (
    <Modal id={MODAL_ID.changePassword} title="Change Password">
      {modalProps => <ChangePasswordForm {...modalProps} />}
    </Modal>
  )
}

export default ChangePasswordModal

const ChangePasswordForm = ({ ModalBody, ModalFooter }) => {
  const [error, setError] = useState<Error>(null)

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
    delayError: 1000
  })

  const { mutate: userPasswordSetMutation, isLoading } =
    useUserPasswordSetMutation({
      onSuccess: () => {
        Toast({
          type: 'success',
          description: 'Password Changed'
        })
        NiceModal.hide(MODAL_ID.changePassword)
      },
      onError: (err: ApiError) => setError(err)
    })

  const requestChangePassword = formData => {
    setError(null)
    const { currentPassword, newPassword } = formData
    userPasswordSetMutation({
      current_password: currentPassword,
      new_password: newPassword
    })
  }

  return (
    <form onSubmit={handleSubmit(requestChangePassword)}>
      <ModalBody className="space-y-3">
        <Field
          name={INPUTS.currentPassword}
          errors={errors}
          label="Current Password"
        >
          <Input
            register={register(INPUTS.currentPassword, {
              ...requiredField(),
              ...INPUT_VALIDATORS['minLength'],
              ...INPUT_VALIDATORS['maxLength']
            })}
            id={INPUTS.currentPassword}
            type="password"
            placeholder="Type Current Password"
          />
        </Field>
        <Separator />
        <Field name={INPUTS.newPassword} errors={errors} label="New Password">
          <Input
            register={register(INPUTS.newPassword, {
              ...requiredField(),
              ...INPUT_VALIDATORS['minLength'],
              ...INPUT_VALIDATORS['maxLength']
            })}
            id={INPUTS.newPassword}
            type="password"
            placeholder="Type New Password"
          />
        </Field>
        <Field
          name={INPUTS.confirmPassword}
          errors={errors}
          label="Retype New Password"
        >
          <Input
            register={register(INPUTS.confirmPassword, {
              ...requiredField(),
              ...INPUT_VALIDATORS['minLength'],
              ...INPUT_VALIDATORS['maxLength'],
              validate: value => {
                const { newPassword } = getValues()
                return newPassword === value || 'Passwords should match!'
              }
            })}
            id={INPUTS.confirmPassword}
            type="password"
            placeholder="Retype To Confirm"
          />
        </Field>
        <ErrorBox error={error} shouldShowTitle={false} />
      </ModalBody>
      <ModalFooter>
        <Button
          loading={isLoading}
          disabled={!isValid}
          size="lg"
          type="submit"
          className="w-full"
        >
          Confirm
        </Button>
      </ModalFooter>
    </form>
  )
}
