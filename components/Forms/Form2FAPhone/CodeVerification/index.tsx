import { tryApiAction } from '@/api/core/compat'
import { setup2faVerifyCode } from '@/api/resources/user/2fa/verify'
import { removeTokenScope } from '@/util/cookieHelpers'
import { FC, ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import Body from './Body'
import Footer from './Footer'

type FormChildrenWrapper = FC<{ className?: string }>

interface PhoneVerificationFormProps {
  phone: string
  onContinue: (recoveryPhrase: string) => void
  children?: (props: {
    Body: FormChildrenWrapper
    Footer: FormChildrenWrapper
  }) => ReactNode
}

const PhoneVerificationForm = ({
  onContinue,
  phone,
  children
}: PhoneVerificationFormProps) => {
  const methods = useForm<{ code: string }>({ defaultValues: { code: '' } })
  const { handleSubmit, setError } = methods

  const onSubmit = async formData => {
    const { data } = await tryApiAction(() =>
      setup2faVerifyCode(formData.code, 'enable')
    )
    if (data.status === 'ok') {
      removeTokenScope()
      onContinue?.(data.recovery_phrase)
    } else {
      setError('code', { message: data.errors.generic })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {children ? (
        children({
          Body: ({ className }) => (
            <Body className={className} formMethods={methods} phone={phone} />
          ),
          Footer: ({ className }) => (
            <Footer className={className} formMethods={methods} />
          )
        })
      ) : (
        <>
          <Body phone={phone} formMethods={methods} />
          <Footer formMethods={methods} />
        </>
      )}
    </form>
  )
}

export default PhoneVerificationForm
