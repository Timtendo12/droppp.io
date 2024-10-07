import React, { useState, ReactNode, FC } from 'react'
import PhoneInput from 'react-phone-number-input/input'
import { Button, Toast } from '@/components'
import { setup2faSMS } from '@/api/resources/user/2fa/sms/phone'
import { tryApiAction } from '@/api/core/compat'
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext
} from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import Field from '@/components/Field'
import { ModalChildrenWrappers } from '@/components/Modals/ModalV2/BaseModal'
import classNames from 'classnames'
import CodeVerification from './CodeVerification'

export enum Form2FAPhoneButtonLabel {
  Continue = 'Continue',
  Send = 'Send Code',
  Resend = 'Resend Code'
}

interface Props {
  onContinue: (recoveryPhrase: string) => void
  modalContentWrappers?: ModalChildrenWrappers
}

export const Form2FAPhoneController = ({
  onContinue,
  modalContentWrappers
}: Props) => {
  const [phoneCodeSentTo, setPhoneCodeSentTo] = useState<string | null>('')

  // When shown inside of a modal
  if (modalContentWrappers) {
    const { ModalBody, ModalFooter } = modalContentWrappers
    return phoneCodeSentTo ? (
      <CodeVerification phone={phoneCodeSentTo} onContinue={onContinue}>
        {({ Body, Footer }) => (
          <>
            <ModalBody>
              <Body />
            </ModalBody>
            <ModalFooter>
              <Footer />
            </ModalFooter>
          </>
        )}
      </CodeVerification>
    ) : (
      <PhoneInputForm onSuccess={phone => setPhoneCodeSentTo(phone)}>
        {({ FormBody, FormFooter }) => (
          <>
            <ModalBody>
              <FormBody />
            </ModalBody>
            <ModalFooter>
              <FormFooter />
            </ModalFooter>
          </>
        )}
      </PhoneInputForm>
    )
  }
  // // When shown inline (onboarding)
  else {
    return phoneCodeSentTo ? (
      <CodeVerification phone={phoneCodeSentTo} onContinue={onContinue}>
        {({ Body, Footer }) => (
          <div className="space-y-3 mt-3">
            <Body />
            <Footer />
          </div>
        )}
      </CodeVerification>
    ) : (
      <PhoneInputForm onSuccess={phone => setPhoneCodeSentTo(phone)}>
        {({ FormBody, FormFooter }) => (
          <div className="space-y-3 mt-3">
            <FormBody />
            <FormFooter />
          </div>
        )}
      </PhoneInputForm>
    )
  }
}

type FormChildrenWrapper = FC<{ className?: string }>

interface PhoneInputFormProps {
  onSuccess?: (phone: string) => void
  children?: (props: {
    FormBody: FormChildrenWrapper
    FormFooter: FormChildrenWrapper
  }) => ReactNode
}

export const PhoneInputForm = ({
  children,
  onSuccess
}: PhoneInputFormProps) => {
  const methods = useForm<{ phone: string }>({ defaultValues: { phone: '' } })
  const { handleSubmit, setError } = methods

  const onSubmit = async formData => {
    const { data } = await tryApiAction(() => setup2faSMS(formData.phone))

    if (data.status === 'ok') {
      Toast({
        type: 'success',
        title: 'Success',
        description: 'A code was sent via SMS to your phone.'
      })
      return onSuccess?.(formData.phone)
    } else {
      setError('phone', {
        message: data.errors.phone || data.errors.generic
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...methods}>
        {children ? (
          children({ FormBody, FormFooter })
        ) : (
          <>
            <FormBody />
            <FormFooter />
          </>
        )}
      </FormProvider>
    </form>
  )
}

const FormBody: FormChildrenWrapper = ({ className }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext()

  return (
    <div className={classNames('space-y-3', className)}>
      <div className="body text-gray-300">
        Enter your phone number to receive a code via SMS. Only US phone numbers
        are supported at this time.
      </div>
      <Field label="Phone Number" name={'phone'}>
        <Controller
          control={control}
          name={'phone'}
          rules={{ required: 'Phone is required', minLength: 12 }}
          render={({ field }) => (
            <PhoneInput
              id="phone"
              className="w-full h-6 mt-1 px-2 body bg-gray-800 border border-gray-700 rounded-2xl"
              country="US"
              international
              withCountryCallingCode
              placeholder="+0 000 000 0000"
              {...field}
            />
          )}
        />
      </Field>

      <ErrorMessage
        errors={errors}
        name="phone"
        render={({ message }) => (
          <Toast className="mt" type="warning" inline>
            {message}
          </Toast>
        )}
      />
    </div>
  )
}

const FormFooter: FormChildrenWrapper = ({ className }) => {
  const {
    formState: { isSubmitting, isValid }
  } = useFormContext()

  return (
    <Button
      className={classNames('w-full', className)}
      type="submit"
      disabled={!isValid}
      loading={isSubmitting}
    >
      {Form2FAPhoneButtonLabel.Send}
    </Button>
  )
}
