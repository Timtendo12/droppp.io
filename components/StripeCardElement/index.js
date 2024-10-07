import React from 'react'
import { CardElement } from '@stripe/react-stripe-js'

const StripeCardElement = ({ onChange }) => {
  const style = {
    base: {
      fontSize: '16px',
      color: '#FFF',
      fontFamily: 'proxima-nova, sans-serif',
      '::placeholder': {
        color: '#A3A3A3'
      }
    },
    invalid: {
      color: '#FF3D3D'
    }
  }

  return (
    <>
      <div className="h7 mt-3">Credit Card</div>
      <div className="px-2 py-[13px] mt-1 bg-gray-800 border border-gray-700 rounded-2xl">
        <CardElement options={{ style }} onChange={onChange} />
      </div>
    </>
  )
}

export default StripeCardElement
