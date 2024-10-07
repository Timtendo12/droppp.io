import React from 'react'
import { MEDIA_SIZES } from '@/constants'
import { PreviewMedia, Separator } from '..'

const PurchaseItems = ({
  items,
  shippingDetail = null,
  subTotal = null,
  fee = null,
  total = null
}) => {
  return (
    <>
      <div className="h5">Items</div>
      {items.map(({ media, name, detail, price }, index) => (
        <div key={index} className="flex items-center mt-2">
          <PreviewMedia
            className="w-5 h-5 object-contain mr-[12px]"
            size={MEDIA_SIZES.TINY}
            media={media[0]}
          />
          <div className="body-sm flex-1">
            <div>{name}</div>
            {detail && <div className="text-gray-300">{detail}</div>}
          </div>
          <div className="pricing ml-1">{price}</div>
        </div>
      ))}
      {!!shippingDetail && (
        <>
          <Separator className="my-3" />
          {shippingDetail?.map(({ label, value }, index) => (
            <div
              key={index}
              className="flex justify-between items-center mt-1 body-sm"
            >
              <div className="text-gray-400">{label}</div>
              <div className="text-white">{value}</div>
            </div>
          ))}
        </>
      )}
      {!!subTotal && (
        <>
          <Separator className="mt-3" />
          <div className="flex justify-between items-center my-2 body-sm">
            <div className="text-gray-400">Subtotal</div>
            <div className="text-white">{subTotal}</div>
          </div>
          <div className="flex justify-between items-center my-2 body-sm">
            <div className="text-gray-400">Fee</div>
            <div className="text-white">{fee}</div>
          </div>
        </>
      )}
      {!!total && (
        <>
          <Separator className="mt-3" />
          <div className="flex justify-between items-center my-2">
            <div className="h5">Total</div>
            <div className="pricing-xl">{total}</div>
          </div>
          <Separator className="mb-3" />
          <div className="body-sm">
            All sales are final. No refunds are permitted except with respect to
            any statutory warranties or guarantees that cannot be limited or
            excluded by law.
          </div>
        </>
      )}
    </>
  )
}

export default PurchaseItems
