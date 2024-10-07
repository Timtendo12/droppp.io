import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import {
  PagedQueryActions,
  PagedQueryData
} from '@/api/resources/catalog/item/listings/get/types'
import { ListedCatalogItem } from '@/api/resources/catalog/item/listings/get/schema'
import { useNavigation, UseNavigationResult } from '@/hooks/useNavigation'
import { useAccount, UseAccountResult } from '@/hooks/useAccount'
import { useMintListingsQuery } from './hooks/useMintListingsQuery'

export type MintListingsContextValues = {
  isInitializing: boolean
  isLoading: boolean
  product: ListedCatalogItem
  data: PagedQueryData
  goTo: UseNavigationResult['goTo']
  account: UseAccountResult
  isActionStarting: boolean
  actions: PagedQueryActions & {
    setIsActionStarting: (value: boolean) => void
  }
}

export const MintListingsContext = createContext<
  MintListingsContextValues | undefined
>(undefined)

export const useMintListingsContext = () => {
  const context = useContext(MintListingsContext)
  if (context === undefined) {
    throw new Error(
      'useListingsContext must be used within MintListingContext.Provider'
    )
  }
  return context
}

type MintListingsProviderProps = {
  chainTemplateId: number
  children: ReactNode
}

export const MintListingsProvider = ({
  chainTemplateId,
  children
}: MintListingsProviderProps) => {
  const [isActionStarting, setIsActionStarting] = useState(false)
  const account = useAccount()
  const { goTo } = useNavigation()

  const { isInitializing, isLoading, product, data, actions } =
    useMintListingsQuery({
      chainTemplateId: chainTemplateId.toString()
    })

  useEffect(() => {
    if (isLoading && isActionStarting) setIsActionStarting(false)
  }, [isLoading, isActionStarting])

  return (
    <MintListingsContext.Provider
      value={{
        isInitializing,
        isLoading,
        product,
        data,
        goTo,
        account,
        isActionStarting,
        actions: { ...actions, setIsActionStarting: setIsActionStarting }
      }}
    >
      {children}
    </MintListingsContext.Provider>
  )
}
