import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { Icon } from '..'
import styles from './styles.module.scss'

type Props = {
  className?: string
  timeout: number
  timeoutMax: number
  timeoutId?: string
  onComplete?: () => void
}

const TimeoutCounter = ({
  className = '',
  timeout,
  timeoutMax,
  timeoutId,
  onComplete
}: Props) => {
  const timerId = useRef({ id: 0 })
  const [timeSpent, setTimeSpent] = useState(timeout)
  const [didComplete, setDidComplete] = useState(false)

  const resetTimer = () => {
    clearInterval(timerId.current.id)
    timerId.current.id = window.setInterval(countDown, 1000)

    // reset the time to whatever the requested timeout is
    setTimeSpent(timeout)

    // mark this as not previously completed
    setDidComplete(false)
  }

  useEffect(() => {
    timerId.current.id = window.setInterval(countDown, 1000)
    return () => clearInterval(timerId.current.id)
  })

  useEffect(resetTimer, [timeout, timeoutId])

  const countDown = () => {
    if (!timeSpent) {
      clearInterval(timerId.current.id)

      // don't run complete again if it's already been executed
      if (!didComplete) {
        onComplete()
        setDidComplete(true)
      }
      return
    }
    setTimeSpent(timeSpent - 1)
  }

  const remainingTime = new Date(timeSpent * 1000).toISOString().substr(11, 8)

  return (
    <div className={classNames(styles.container, className)}>
      <div className="flex items-center justify-between body-sm sm:body">
        <div className="flex items-center text-gray-400">
          <Icon className="mr-1 w-2 h-2" name="clock" />
          Time&nbsp;Remaining
        </div>
        <div className="text-white tabular-nums">{remainingTime}</div>
      </div>
      <div className={styles.progressBar}>
        <div
          className={styles.activeBar}
          style={{ width: `${(timeSpent * 100) / timeoutMax}%` }}
        ></div>
      </div>
    </div>
  )
}

export default TimeoutCounter
