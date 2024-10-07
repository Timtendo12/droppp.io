import Link from 'next/link'
import React from 'react'
import { AUTH_TYPES } from '@/enum'

export const POSLinks = ({ authType = '' }) => (
  <div className="mt-3 body-sm text-gray-300 text-center">
    By {authType === AUTH_TYPES.SIGNUP ? 'signing up' : 'continuing above'} you
    acknowledge that you have read and agree to all applicable{' '}
    <Link
      className="inline-link"
      href="/terms"
      target="_blank"
      rel="noopener noreferrer"
    >
      Terms of Service
    </Link>{' '}
    and our{' '}
    <Link
      className="inline-link"
      href="/privacy"
      target="_blank"
      rel="noreferrer"
    >
      Privacy Notice
    </Link>
    .
  </div>
)
