import Button from '@/components/Button'
import Field from '@/components/Field'
import { Input } from '@/components/Inputs'
import { Form2FARecoveryButtonLabel } from './constants'
import { removeTokenScope } from '@/util/cookieHelpers'
import { setup2faConfirmPhrase } from '@/api/resources/user/2fa/confirm/phrase'
import { tryApiAction } from '@/api/core/compat'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import { ModalChildrenWrappers } from '@/components/Modals/ModalV2/BaseModal'

const buttonStyleProps = {
  className: 'w-full'
}

interface Props {
  onContinue: () => void
  onRetreat: () => void
  modalContentWrappers?: ModalChildrenWrappers
}

export const ConfirmRecoveryPhrase = ({
  onContinue,
  onRetreat,
  modalContentWrappers
}: Props) => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { isSubmitting, isValid, errors }
  } = useForm()

  const onSubmit = async formData => {
    const { data } = await tryApiAction(() =>
      setup2faConfirmPhrase(formData.confirmPhrase)
    )
    if (data.status === 'ok') {
      removeTokenScope()
      onContinue()
    } else {
      setError('confirmPhrase', {
        message: 'Invalid recovery phrase. Please try again.'
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!!modalContentWrappers ? (
        <>
          <modalContentWrappers.ModalBody>
            <Body errors={errors} register={register} />
          </modalContentWrappers.ModalBody>
          <modalContentWrappers.ModalFooter>
            <Footer
              isSubmitting={isSubmitting}
              isValid={isValid}
              onCancel={onRetreat}
            />
          </modalContentWrappers.ModalFooter>
        </>
      ) : (
        <>
          <Body errors={errors} register={register} className="mt-3" />
          <Footer
            onCancel={onRetreat}
            isSubmitting={isSubmitting}
            isValid={isValid}
            className="mt-3"
          />
        </>
      )}
    </form>
  )
}

const Body = ({ errors, register, className = '' }) => {
  return (
    <div className={className}>
      <div className="body text-gray-300">
        Use the recovery phrase given to you when{' '}
        <span className="inline-block">2-step</span> verification was
        turned&nbsp;on.
      </div>
      <Field
        className="mt-3"
        name="confirmPhrase"
        label="Your Secret Recovery&nbsp;Phrase"
        errors={errors}
      >
        <Input
          className="!h-9 body"
          format="textarea"
          register={register('confirmPhrase', { required: true })}
          placeholder="Insert phrase here..."
        />
      </Field>
    </div>
  )
}

interface FooterProps {
  isSubmitting: boolean
  isValid: boolean
  onCancel: () => void
  className?: string
}

const Footer = ({
  isSubmitting,
  isValid,
  onCancel,
  className = ''
}: FooterProps) => {
  return (
    <div className={classNames('flex gap-2', className)}>
      <Button {...buttonStyleProps} theme="gray" onClick={onCancel}>
        {Form2FARecoveryButtonLabel.Back}
      </Button>
      <Button
        {...buttonStyleProps}
        loading={isSubmitting}
        disabled={!isValid}
        type="submit"
      >
        {Form2FARecoveryButtonLabel.Continue}
      </Button>
    </div>
  )
}
