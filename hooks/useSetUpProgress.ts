import { useState, useEffect } from 'react'
import IdentityVerificationState from '../types/identityVerificationState'
import { useAuth } from '@/contexts/auth'

const SetUpTaskValues = ['setup', 'verify', 'fund'] as const

export type SetUpTask = typeof SetUpTaskValues[number]

export type SetUpProgress = {
  completedTasks: SetUpTask[]
  isComplete: boolean
}

const useSetUpProgress = (): SetUpProgress => {
  const [progress, setProgress] = useState<SetUpProgress>({
    completedTasks: [],
    isComplete: false
  })
  const { user, identityVerificationState, walletBalance } = useAuth()
  const kycIsCompleted =
    identityVerificationState === IdentityVerificationState.Completed

  useEffect(() => {
    const tasks: SetUpTask[] = []

    if (user) {
      tasks.push('setup')

      if (kycIsCompleted) {
        tasks.push('verify')

        if (walletBalance && walletBalance > 0) {
          tasks.push('fund')
        }
      }
    }

    let progress = {
      completedTasks: tasks,
      isComplete: tasks.length == SetUpTaskValues.length
    }

    setProgress(progress)
  }, [walletBalance, kycIsCompleted, user])

  return progress
}

export default useSetUpProgress
