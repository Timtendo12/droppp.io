import { calcTimeRemaining } from '@/contexts/countdown'
import { Drop } from '@/types/drop'
import { formattedCountdown, isOnOrBeforeNow } from '@/util/time'
import moment from 'moment'
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import { useDropContext } from './DropContextProvider'

type DropContextType = {
  active: boolean
  remainingUntilQueueOpen: {
    seconds: number
    display: string
  }
  remainingUntilLaunch: {
    seconds: number
    display: string
  }
}

export const DropTimerContext = createContext<DropContextType>(null)

export const useDropTimerContext = () => {
  const context = useContext(DropTimerContext)
  if (context === undefined) {
    throw new Error(
      'useDropTimerContext must be used within DropTimerContext.Provider'
    )
  }
  return context
}

export const DropTimerProvider = ({
  children
}: PropsWithChildren<{ drop: Drop }>) => {
  const { updateDropContext, ...dropData } = useDropContext()
  const {
    time_launch,
    duration_in_seconds,
    redeem_ship_date,
    isWithin8HoursBeforeQueue,
    isPostSale,
    isQueueOpen,
    isLaunched
  } = dropData

  const [data, setData] = useState<DropContextType>(
    calculateTime(time_launch, duration_in_seconds.toString(), redeem_ship_date)
  )

  let timer: NodeJS.Timeout

  useEffect(() => {
    // remove timer after ship date
    if (redeem_ship_date && isOnOrBeforeNow(redeem_ship_date)) {
      if (!!timer) {
        return clearInterval(timer)
      } else return
    }

    timer = setInterval(
      () =>
        setData(
          calculateTime(
            time_launch,
            duration_in_seconds.toString(),
            redeem_ship_date
          )
        ),
      1000
    )
    return () => clearInterval(timer)
  }, [isPostSale, time_launch, duration_in_seconds, redeem_ship_date])

  useEffect(() => {
    if (isLaunched) return

    if (data.remainingUntilQueueOpen.seconds <= 0 && !isQueueOpen) {
      updateDropContext({
        ...dropData,
        isQueueOpen: true
      })
    }
    if (
      !isWithin8HoursBeforeQueue &&
      data.remainingUntilLaunch.seconds <= 28800 &&
      data.remainingUntilLaunch.seconds > duration_in_seconds
    ) {
      updateDropContext({
        ...dropData,
        isWithin8HoursBeforeQueue: true
      })
    }
    if (data.remainingUntilLaunch.seconds <= 0) {
      updateDropContext({
        ...dropData,
        isLaunched: true
      })
    }
  }, [data.remainingUntilLaunch.seconds, isLaunched])

  return (
    <DropTimerContext.Provider value={data}>
      {children}
    </DropTimerContext.Provider>
  )
}

export default DropTimerProvider

const calculateTime = (
  time_launch: string,
  duration_in_seconds: string,
  redeem_ship_date
): DropContextType => {
  const secondsUntilQueueOpens = calcTimeRemaining(
    time_launch,
    Number(duration_in_seconds)
  )
  const secondsUntilLaunch = calcTimeRemaining(time_launch)

  return {
    active: isOnOrBeforeNow(redeem_ship_date),
    remainingUntilQueueOpen: {
      seconds: secondsUntilQueueOpens,
      display: formattedCountdown(
        moment.duration(secondsUntilQueueOpens, 'seconds')
      )
    },
    remainingUntilLaunch: {
      seconds: secondsUntilLaunch,
      display: formattedCountdown(
        moment.duration(secondsUntilLaunch, 'seconds')
      )
    }
  }
}
