import React, { createContext, useContext } from 'react'
import Cookies from 'js-cookie'

const QueueItContext = createContext()

export const QueueItProvider = ({ children }) => {
  const setQueueItToken = token => {
    Cookies.set('queue-it-token', token)
  }

  const getQueueItToken = () => {
    const queueItToken = Cookies.get('queue-it-token')
    return queueItToken
  }

  return (
    <QueueItContext.Provider
      value={{
        setQueueItToken,
        getQueueItToken
      }}
    >
      {children}
    </QueueItContext.Provider>
  )
}

export const useQueueIt = () => useContext(QueueItContext)
