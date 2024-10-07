import React, { FC } from 'react'
import { Button } from '@/components'
import RadioList from '@/components/RadioList'
import { Controller, useForm } from 'react-hook-form'
import classNames from 'classnames'

export const TwoFAButtonLabel = 'Continue'

export enum TwoFA {
  App = 'app',
  SMS = 'sms'
}

enum TwoFATitle {
  App = 'Authenticator app',
  SMS = 'SMS',
  USOnly = 'US phone numbers only'
}

enum TwoFAIntroCopy {
  Recovery = 'Your secret recovery phrase has been used and is no longer a valid phrase for login. Please set up 2-Step Verification again to add back your extra layer of\u00A0security.',
  Default = 'Add an extra layer of security to your account. Once enabled, you’ll be required to give two types of identification when you log into\u00A0Droppp.'
}

enum TwoFADetail {
  App = 'Need an authenticator app? ',
  Free2FA = 'Twilio Authy and Google Authenticator are free 2FA apps that can be found on your mobile phone’s app\u00A0store.',
  SMS = 'You’ll receive a 6-digit verification code by text message. \n',
  USOnly = ' U.S. phone numbers only. ',
  Rates = 'Text or data rates may\u00A0apply.'
}

type FormChildrenWrapper = FC<{ className?: string }>

interface IProps {
  withModal?: boolean
  phraseUsed?: boolean
  children?: ({
    FormBody,
    FormFooter
  }: {
    FormBody: FormChildrenWrapper
    FormFooter: FormChildrenWrapper
  }) => React.ReactNode
  onContinue?: (type: TwoFA) => void
}

export default function Form2FAOptions({
  phraseUsed,
  onContinue,
  children,
  withModal = false
}: IProps) {
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      type: TwoFA.SMS
    }
  })

  const handleContinue = formData => {
    if (onContinue) onContinue(formData.type)
  }

  const FormBody: FormChildrenWrapper = ({ className }) => (
    <div className={className}>
      <div className="body text-gray-300 mb-1">
        {phraseUsed ? TwoFAIntroCopy.Recovery : TwoFAIntroCopy.Default}
      </div>
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <RadioList
            onChange={field.onChange}
            value={field.value}
            options={[
              {
                value: TwoFA.SMS,
                title: withModal ? (
                  <>
                    <div className="flex-row w-full">
                      <span className="inline-block mr-1">
                        {TwoFATitle.SMS}
                      </span>
                      <div className="text-base sm:text-lg inline-block text-gray-300">
                        {TwoFATitle.USOnly}
                      </div>
                    </div>
                  </>
                ) : (
                  TwoFATitle.SMS
                ),
                label:
                  !withModal &&
                  TwoFADetail.SMS + TwoFADetail.USOnly + TwoFADetail.Rates
              },
              {
                value: TwoFA.App,
                title: TwoFATitle.App,
                label: !withModal && TwoFADetail.App + TwoFADetail.Free2FA
              }
            ]}
          />
        )}
      />
    </div>
  )

  const FormFooter: FormChildrenWrapper = ({ className }) => (
    <Button
      className={classNames('w-full', className)}
      type="submit"
      loading={isSubmitting}
      disabled={!isValid}
    >
      {TwoFAButtonLabel}
    </Button>
  )

  return (
    <form onSubmit={handleSubmit(handleContinue)}>
      {children ? (
        children({ FormBody, FormFooter })
      ) : (
        <>
          <FormBody className="mt-3" />
          <FormFooter className="mt-3" />
        </>
      )}
    </form>
  )
}
