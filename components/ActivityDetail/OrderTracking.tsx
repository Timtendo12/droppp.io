import React from 'react'
import { ButtonLink } from '@/components/Button'
import Separator from '@/components/Separator'

const OrderTracking = ({ trackingUrls }) => {
  return (
    <div className="mt-3">
      <div className="h5">Order Tracking</div>
      {trackingUrls.length > 1 && (
        <div className="mt-2 body-sm text-gray-400">
          Your order shipped in multiple packages.
        </div>
      )}
      {trackingUrls.map(({ tracking_url }, index) => (
        <div key={index} className="mt-2">
          {!!index && <Separator className="mb-2" />}
          <div className="flex justify-between items-center">
            <div>
              <div className="h7">Package {index + 1}</div>
            </div>
            <ButtonLink size="xs" href={tracking_url} newTab>
              Track Order
            </ButtonLink>
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrderTracking
