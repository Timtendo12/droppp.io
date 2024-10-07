import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { useNavigation, UseNavigationResult } from '@/hooks/useNavigation'
import { useAccount, UseAccountResult } from '@/hooks/useAccount'
import { useSalesHistoryQuery } from './hooks/useSalesHistoryQuery'
import {
  PagedQueryActions,
  PagedQueryData
} from '@/api/resources/catalog/item/sales/history/get/types'

export type SalesHistoryContextValues = {
  isInitializing: boolean
  isLoading: boolean
  data: PagedQueryData
  goTo: UseNavigationResult['goTo']
  account: UseAccountResult
  isActionStarting: boolean
  actions: PagedQueryActions & {
    setIsActionStarting: (value: boolean) => void
  }
}

export const SalesHistoryContext = createContext<
  SalesHistoryContextValues | undefined
>(undefined)

export const useSalesHistoryContext = () => {
  const context = useContext(SalesHistoryContext)
  if (context === undefined) {
    throw new Error(
      'useSalesHistoryContext must be used within SalesHistoryContext.Provider'
    )
  }
  return context
}

type Props = {
  dataId: number
  children: ReactNode
}

export const SalesHistoryProvider = ({ dataId, children }: Props) => {
  const [isActionStarting, setIsActionStarting] = useState(false)
  const account = useAccount()
  const { goTo } = useNavigation()

  const { isInitializing, isLoading, data, actions } = useSalesHistoryQuery({
    dataId: dataId.toString()
  })

  useEffect(() => {
    if (isLoading && isActionStarting) setIsActionStarting(false)
  }, [isLoading, isActionStarting])

  return (
    <SalesHistoryContext.Provider
      value={{
        isInitializing,
        isLoading,
        data,
        goTo,
        account,
        isActionStarting,
        actions: { ...actions, setIsActionStarting: setIsActionStarting }
      }}
    >
      {children}
    </SalesHistoryContext.Provider>
  )
}
