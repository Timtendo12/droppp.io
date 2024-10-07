import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useState, useEffect, createContext } from 'react'
import { env } from '../config/index'
import queryParser from '../util/queryHelpers'

let intervalId: NodeJS.Timeout

const routerLaunchTime = router => {
  const query = queryParser(router.asPath.split(/\?/)[1])
  return env !== 'prod' ? query.time_launch : undefined
}

export const calcTimeRemaining = (
  timeLaunch: string,
  duration_in_seconds?: number
) => {
  let now = moment().local()
  let end = moment
    .utc(timeLaunch)
    .local()
    .subtract(duration_in_seconds, 'seconds')
  const remaining = Math.floor(moment.duration(end.diff(now)).asSeconds())

  return remaining
}

export const CountdownContext = createContext<number>(null)

const Countdown = ({
  interval,
  time_launch,
  duration_in_seconds,
  children
}) => {
  const router = useRouter()
  const timeLaunch = routerLaunchTime(router) || time_launch
  const [timeRemaining, setTimeRemaining] = useState<number>(
    calcTimeRemaining(timeLaunch, duration_in_seconds)
  )

  useEffect(() => {
    startTimer()
    return () => stopTimer()
  }, [])

  const startTimer = () => {
    intervalId = setInterval(() => {
      timeRemaining <= 0 && stopTimer()

      setTimeRemaining(calcTimeRemaining(timeLaunch, duration_in_seconds))
    }, interval * 1000)
  }

  const stopTimer = () => {
    clearInterval(intervalId)
  }

  return (
    <CountdownContext.Provider value={timeRemaining}>
      {children}
    </CountdownContext.Provider>
  )
}

export default Countdown
