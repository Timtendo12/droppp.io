import { tryApiAction } from '@/api/core/compat'
import { setup2faSMSSend } from '@/api/resources/user/2fa/sms/send'
import Button from '@/components/Button'
import Toast from '@/components/Toast'
import classNames from 'classnames'
import { UseFormReturn } from 'react-hook-form'
import { Form2FAPhoneButtonLabel } from '..'

interface FormFooterProps {
  className?: string
  formMethods: UseFormReturn<{ code: string }>
}

const Footer = ({ className, formMethods }: FormFooterProps) => {
  const {
    resetField,
    setError,
    formState: { isValid, isSubmitting }
  } = formMethods

  const handleSendNewCode = async () => {
    const { data } = await tryApiAction(() => setup2faSMSSend('enable'))

    const handleSuccess = () => {
      Toast({
        type: 'success',
        title: 'Success',
        description: 'A code was sent via SMS to your phone.'
      })
      resetField('code')
    }

    return data.status === 'ok'
      ? handleSuccess()
      : setError('code', { message: data.errors.code })
  }

  return (
    <div className={classNames('flex gap-2', className)}>
      <Button className="w-full" theme="gray" onClick={handleSendNewCode}>
        {Form2FAPhoneButtonLabel.Resend}
      </Button>
      <Button
        data-testid="submit-button"
        type="submit"
        className="w-full ml-1"
        disabled={!isValid}
        loading={isSubmitting}
      >
        {Form2FAPhoneButtonLabel.Continue}
      </Button>
    </div>
  )
}

export default Footer
