import React from 'react'

export const WalletColumnHeader = ({ title, description }) => {
  return (
    <div>
      <h2 className="h4 mb-2">{title}</h2>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}
