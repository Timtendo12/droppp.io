import React, { useEffect } from 'react'
import Toast from '@/components/Toast'
import Link from 'next/link'
import { ApiErrorNotifierProps } from './..'

const AutoCloseMs = 7500

export function InsufficientFundsNotifier({
  error,
  onNotified
}: ApiErrorNotifierProps) {
  const description = (
    <div className="flex flex-col gap-2">
      <div className="body-sm">
        The price of this item has increased higher than your available Droppp
        Balance.
      </div>
      <div className="utility">
        <Link href="/wallet">Add Funds To Purchase</Link>
      </div>
    </div>
  )

  useEffect(() => {
    if (error) {
      Toast({
        type: 'warning',
        title: 'Insufficient Funds',
        description: description,
        autoClose: AutoCloseMs,
        onClose: onNotified
      })
    }
  }, [error])

  return null
}
