import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer
} from 'react'
import { TransferTransition, TransferContextType } from './types'
import {
  TransferAction,
  defaultTransfer,
  resolveAction,
  transferReducer
} from './reducer'
import { useLayoutData } from '@/contexts/layout'
import { useTransferPreviewQuery } from '@/api/resources/user/assets/transfer/preview'

export const TransferContext = createContext<TransferContextType | undefined>(
  undefined
)
export const TransferDispatchContext =
  createContext<Dispatch<TransferAction>>(null)

export const useTransferContext = () => {
  const context = useContext(TransferContext)

  if (context === undefined)
    throw new Error('useTransferContext must be used within a TransferProvider')

  return context
}

export const useTransferDispatch = () => {
  const context = useContext(TransferDispatchContext)
  if (context === undefined) {
    throw new Error(
      'useTransferDispatch must be used within TransferDispatchContext.Provider'
    )
  }
  return context
}

export const TransferProvider = ({ children }: PropsWithChildren) => {
  const { selectedAssets } = useLayoutData()
  const [state, dispatch] = useReducer(transferReducer, defaultTransfer())

  const { isLoading, isFetching } = useTransferPreviewQuery(
    {
      assets: selectedAssets.map(asset => asset.id),
      to: state.transfer.to
    },
    {
      enabled: selectedAssets.length > 0,
      onSuccess: data => {
        dispatch({
          type: 'PREVIEW',
          payload: { isLoading: false, isFetching: false, ...data }
        })
      }
    }
  )

  // sets preview loading states
  useEffect(() => {
    if (isLoading !== state.isLoading || isFetching !== state.isFetching) {
      dispatch({ type: 'LOADING', payload: { isLoading, isFetching } })
    }
  }, [isLoading, isFetching])

  const transitionTo = <T extends TransferTransition>(transition: T) => {
    const { sequence } = transition
    const action = resolveAction(transition)
    if (action) dispatch(action)
    sequence.goTo(transition.step)
  }

  const value = {
    ...state,
    transitionTo
  }

  return (
    <TransferContext.Provider value={value}>
      <TransferDispatchContext.Provider value={dispatch}>
        {children}
      </TransferDispatchContext.Provider>
    </TransferContext.Provider>
  )
}
