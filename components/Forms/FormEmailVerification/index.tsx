import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useAuth } from '@/contexts/auth'
import { InputVerification, Button, Toast, Separator } from '@/components'
import ErrorBox from '@/components/ErrorBox'
import { useEmailVerifySendMutation } from '@/api/resources/user/email/verify/send'
import { ApiError } from '@/api/core/errors'
import { useEmailVerifySetMutation } from '@/api/resources/user/email/verify/set'

export default function FormEmailVerification({ email }) {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [error, setError] = useState<ApiError>()
  const { logout } = useAuth()

  const { mutate: emailVerifySendMutation } = useEmailVerifySendMutation({
    onSuccess: () =>
      Toast({
        type: 'information',
        description: `A code was resent to ${email}.`
      }),
    onError: (err: ApiError) => setError(err)
  })

  const { mutate: emailVerifySetMutation } = useEmailVerifySetMutation({
    onSuccess: () => router.push('/newsletter-subscribe'),
    onError: (err: ApiError) => setError(err)
  })

  const handleChangeCode = code => {
    setCode(code)
    setError(null)
  }

  const gotoLogin = async () => {
    await logout('/auth')
  }

  const sendVerificationCode = code => async event => {
    event.preventDefault()

    emailVerifySetMutation({
      code
    })
  }

  return (
    <form onSubmit={sendVerificationCode(code)}>
      <ErrorBox className="my-2" error={error} />
      <div className="h7 mt-3">6-digit code</div>
      <InputVerification className="mt-2" onChange={handleChangeCode} />
      <Button
        className="w-full mt-3"
        size="lg"
        disabled={code.length !== 6}
        type="submit"
      >
        Confirm
      </Button>
      <div className="flex justify-center mt-3 body-sm">
        <Button className="underline" theme="clean" onClick={gotoLogin}>
          Change Email
        </Button>
        <Separator className="mx-[12px]" vertical />
        <Button
          className="underline"
          theme="clean"
          onClick={() => emailVerifySendMutation()}
        >
          Resend Code
        </Button>
      </div>
    </form>
  )
}
