import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Input } from '@/components'
import Button from '@/components/Button'
import ErrorBox from '@/components/ErrorBox'
import { useUserPasswordResetMutation } from '@/api/resources/user/password/reset/set'
import { ApiError } from '@/api/core/errors'

export default function FormResetPassword() {
  const router = useRouter()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [resetToken, setResetToken] = useState('')
  const [error, setError] = useState<ApiError>(null)

  const { token } = router.query

  const { mutate: passwordResetRequest } = useUserPasswordResetMutation({
    onSuccess: () => router.push(`/auth/?passwordReset=success`),
    onError: (err: ApiError) => setError(err)
  })

  useEffect(() => {
    setResetToken(token?.toString())
  }, [token])

  const handleChangeNewPassword = value => {
    setNewPassword(value)
    setError(null)
  }

  const handleChangeConfirmPassword = value => {
    setConfirmPassword(value)
    setError(null)
  }

  const requestReset = async event => {
    event.preventDefault()

    const { newPassword } = event.target
    const resetData = {
      token: resetToken,
      password: newPassword.value
    }
    passwordResetRequest(resetData)
  }

  return (
    <form onSubmit={requestReset}>
      <ErrorBox className="mb-2" error={error} />
      <Input
        name="newPassword"
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={handleChangeNewPassword}
      />
      <Input
        className="mt-2"
        name="confirmPassword"
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={handleChangeConfirmPassword}
      />
      <Button
        className="w-full mt-2"
        size="lg"
        disabled={newPassword !== confirmPassword}
        type="submit"
      >
        Reset Password
      </Button>
      <div className="text-center mt-2">
        <Link href="/auth">Back</Link>
      </div>
    </form>
  )
}
