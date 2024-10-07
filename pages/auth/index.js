import React from 'react'
import { OnboardingLayout } from '@/layouts'
import { FormAuth } from '@/components'

export default function AuthPage() {
  return (
    <OnboardingLayout metaTitle="Sign In / Sign Up">
      <FormAuth />
    </OnboardingLayout>
  )
}
