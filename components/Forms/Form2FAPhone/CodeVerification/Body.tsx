import { InputVerification } from '@/components/Inputs'
import Toast from '@/components/Toast'
import { ErrorMessage } from '@hookform/error-message'
import classNames from 'classnames'
import { Controller, UseFormReturn } from 'react-hook-form'

const Body = ({
  className,
  phone,
  formMethods
}: {
  className?: string
  phone: string
  formMethods: UseFormReturn<{
    code: string
  }>
}) => {
  const {
    control,
    formState: { errors }
  } = formMethods

  return (
    <div className={classNames('space-y-3', className)}>
      <div className="body text-gray-300">
        Please Enter the 6 digit code sent to the phone number ending in{' '}
        <span className="text-white">{phone.slice(-4)}</span>.
      </div>
      <div className="h7">6-Digit Code</div>
      <Controller
        control={control}
        name="code"
        rules={{
          required: 'Code is required',
          minLength: { value: 6, message: 'Code must be 6 digits' }
        }}
        render={({ field }) => (
          <InputVerification values={field.value.split('')} {...field} />
        )}
      />
      <ErrorMessage
        errors={errors}
        name="code"
        render={({ message }) => (
          <Toast className="mt" type="warning" inline>
            {message}
          </Toast>
        )}
      />
    </div>
  )
}

export default Body
