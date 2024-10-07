import { isProdOrStaging } from '@/config'
import { MergedDrop } from '@/config/drops/schema'
import { calcTimeRemaining } from '@/contexts/countdown'
import { DropState } from '@/enum'
import { StorageKey } from '@/storage/keys'
import useLocalStorage from '@/storage/useLocalStorage'
import { Drop } from '@/types/drop'
import { isDropStatePostSale } from '@/util/dropHelpers'
import { isOnOrBeforeNow, isToday } from '@/util/time'
import { RouterLaunchTime } from '@/util/timeHelpers'
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

type InitialDropData = Pick<
  Drop,
  | 'id'
  | 'state'
  | 'time_launch'
  | 'duration_in_seconds'
  | 'redeem_end_date'
  | 'redeem_start_date'
  | 'redeem_ship_date'
>
type DropContextData = {
  isLaunchDay: boolean
  isWithin8HoursBeforeQueue: boolean
  isQueueOpen: boolean
  isLaunched: boolean
  isPostSale: boolean
  isPostSnapshot: boolean
  isPostRedemption: boolean
  isShipping: boolean
  isPostShipping: boolean
} & InitialDropData

export const DropContext = createContext<
  DropContextData & {
    updateDropContext: (
      data: DropContextData,
      updateLocalStorage?: boolean
    ) => void
  }
>(null)

export type UseDropContextResult = DropContextData & {
  updateDropContext: (
    data: DropContextData,
    updateLocalStorage?: boolean
  ) => void
}

export const useDropContext = (): UseDropContextResult => {
  const context = useContext(DropContext)
  if (context === undefined) {
    throw new Error('useDropContext must be used within DropContext.Provider')
  }
  return context
}

export const DropProvider = ({
  drop,
  children
}: PropsWithChildren<{ drop: MergedDrop }>) => {
  const [localValues, setLocalValues] = useLocalStorage(
    StorageKey.DevDropContext
  )

  // grab any url params?
  const time_launch = RouterLaunchTime()?.toString() || drop.time_launch

  const DEFAULT_VALUES: InitialDropData = {
    id: drop.id,
    state: drop.state,
    time_launch: time_launch,
    duration_in_seconds: drop.duration_in_seconds,
    redeem_end_date: drop.redeem_end_date,
    redeem_start_date: drop.redeem_start_date,
    redeem_ship_date: drop.redeem_ship_date
  }

  // pull values from local storage if they are available
  useEffect(() => {
    if (!isProdOrStaging && localValues) {
      const parsedValues = JSON.parse(localValues)

      // if the id doesn't match the drop id, don't update the values
      if (parsedValues.id !== drop.id) return

      Object.keys(parsedValues).forEach(key => {
        DEFAULT_VALUES[key] = parsedValues[key]
      })
      updateDropContext({ ...data, ...DEFAULT_VALUES }, true)
    }
  }, [])

  const [data, setData] = useState<DropContextData>(() =>
    transformDropData(DEFAULT_VALUES)
  )

  const updateDropContext = (
    data: DropContextData,
    updateLocalStorage = false
  ) => {
    const transformedData = transformDropData(data)
    setData(transformedData)
    // set values to local storage when not in prod or staging
    if (!isProdOrStaging && updateLocalStorage)
      setLocalValues(
        JSON.stringify({
          id: transformedData.id,
          state: transformedData.state,
          time_launch: transformedData.time_launch,
          duration_in_seconds: transformedData.duration_in_seconds,
          redeem_end_date: transformedData.redeem_end_date,
          redeem_start_date: transformedData.redeem_start_date,
          redeem_ship_date: transformedData.redeem_ship_date
        })
      )
  }

  return (
    <DropContext.Provider value={{ ...data, updateDropContext }}>
      {children}
    </DropContext.Provider>
  )
}

const transformDropData = (prevData: InitialDropData): DropContextData => {
  const secondsUntilQueueOpens = calcTimeRemaining(
    prevData.time_launch,
    Number(prevData.duration_in_seconds)
  )
  return {
    id: prevData.id,
    // store these values in local storage
    state: prevData.state as DropState,
    time_launch: prevData.time_launch,
    duration_in_seconds: prevData.duration_in_seconds,
    redeem_end_date: prevData.redeem_end_date,
    redeem_start_date: prevData.redeem_start_date,
    redeem_ship_date: prevData.redeem_ship_date,

    // values below are dynamically updated from DropTimer
    isLaunchDay: isToday(prevData.time_launch),
    isWithin8HoursBeforeQueue:
      secondsUntilQueueOpens > 0 && secondsUntilQueueOpens <= 28800,
    isQueueOpen:
      calcTimeRemaining(prevData.time_launch, prevData.duration_in_seconds) <=
        0 && !isDropStatePostSale(prevData.state as DropState),
    isLaunched:
      isDropStatePostSale(prevData.state as DropState) ||
      isOnOrBeforeNow(prevData.time_launch),

    // static state values from drops.json
    isPostSale: isDropStatePostSale(prevData.state as DropState),
    isPostSnapshot: isOnOrBeforeNow(prevData.redeem_start_date),
    isPostRedemption: isOnOrBeforeNow(prevData.redeem_end_date),

    // redeem_ship_date is merged into drop from backend response
    isShipping:
      prevData.redeem_ship_date && isOnOrBeforeNow(prevData.redeem_ship_date),
    isPostShipping:
      prevData.redeem_ship_date && isOnOrBeforeNow(prevData.redeem_ship_date)
  }
}
