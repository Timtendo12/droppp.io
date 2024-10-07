import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Button from '@/components/Button'
import styles from './styles.module.scss'
import { useInviteVerifyMutation } from '@/api/resources/user/invite/verify'
import ErrorBox from '@/components/ErrorBox'
import { ApiError, isApiError } from '@/api/core/errors'

export default function InputClaim() {
  const [code, setCode] = useState()
  const [error, setError] = useState<ApiError>(null)
  const router = useRouter()

  const { mutate: inviteClaimMutation, isLoading } = useInviteVerifyMutation({
    onSuccess: async () =>
      router.push(`/inventory/?claimCode=${code}&claimType=comedy-store`),
    onError: err => {
      if (isApiError(err)) {
        setError(err)
      }
    }
  })

  const handleChangeCode = e => {
    setError(null)
    setCode(e.target.value)
  }

  return (
    <>
      <ErrorBox className={styles.errorBox} error={error} />
      <div className={styles.container}>
        <input
          className={styles.input}
          placeholder="Promo Code"
          value={code}
          onChange={handleChangeCode}
        />
        <Button
          className={styles.btnContinue}
          theme="rainbow"
          loading={isLoading}
          onClick={() => inviteClaimMutation(code)}
        >
          Continue
        </Button>
      </div>
    </>
  )
}
