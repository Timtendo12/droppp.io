import { Dispatch, createContext, useContext, useReducer } from 'react'
import { DepositAction, DepositValues, depositReducer } from './depositReducer'

const initialState: DepositValues = {
  confirm: false,
  network: undefined,
  address: null,
  depositViewType: 'copy'
}

export const DepositContext = createContext<DepositValues>(null)
export const DepositDispatchContext =
  createContext<Dispatch<DepositAction>>(null)

export const useDepositContext = () => {
  const context = useContext(DepositContext)
  if (context === undefined) {
    throw new Error(
      'useDepositContext must be used within DepositContext.Provider'
    )
  }
  return context
}

export const useDepositDispatch = () => {
  const context = useContext(DepositDispatchContext)
  if (context === undefined) {
    throw new Error(
      'useDepositDispatch must be used within DepositDispatchContext.Provider'
    )
  }
  return context
}

export const DepositProvider = ({ children }) => {
  const [state, dispatch] = useReducer(depositReducer, initialState)
  return (
    <DepositContext.Provider value={state}>
      <DepositDispatchContext.Provider value={dispatch}>
        {children}
      </DepositDispatchContext.Provider>
    </DepositContext.Provider>
  )
}
