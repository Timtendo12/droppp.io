import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Input } from '@/components'
import Button from '@/components/Button'
import ErrorBox from '@/components/ErrorBox'
import { useUserPasswordSendMutation } from '@/api/resources/user/password/reset/send'
import { ApiError } from '@/api/core/errors'

export default function FormForgotPassword() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<ApiError>(null)

  const { mutate: passwordSendRequest } = useUserPasswordSendMutation({
    onSuccess: () => router.push(`/auth/?instructionSent=success`),
    onError: (err: ApiError) => setError(err)
  })

  useEffect(() => {
    if (!router.isReady || !router.query.email) return

    setEmail(decodeURIComponent(router.query.email.toString()))
  }, [router.query])

  const handleChangeEmail = value => {
    setEmail(value)
    setError(null)
  }

  const requestReset = async event => {
    event.preventDefault()

    const { email } = event.target
    passwordSendRequest({
      email: email.value
    })
  }

  return (
    <form onSubmit={requestReset}>
      <ErrorBox className="mb-2" error={error} />
      <Input
        name="email"
        placeholder="Enter Email"
        value={email}
        onChange={handleChangeEmail}
      />
      <Button className="w-full mt-2" size="lg" disabled={!email} type="submit">
        Send Reset Link
      </Button>
      <div className="text-center mt-2">
        <Link href="/auth">Back</Link>
      </div>
    </form>
  )
}
