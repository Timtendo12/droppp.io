import classNames from 'classnames'
import React from 'react'
import { MEDIA_SIZES } from '@/constants'
import { DropPurchase, AddressPurchase } from '@/api/resources/shared/purchase'
import { Icon, PreviewMedia } from './..'

interface Props {
  order?: DropPurchase[] | AddressPurchase[]
  isAddress: boolean
  inReview?: boolean
}

const OrderItem = ({ order, isAddress, inReview }: Props) => {
  if (isAddress) {
    const { name, address, price } = order[0] as AddressPurchase
    return (
      <div className="flex items-center mt-3">
        <div className="w-5 mr-[12px] text-left">
          <Icon name="dpCustomAddressPay" />
        </div>
        <div className="body flex-1">
          {name}
          <div className="text-gray-300">{address}.dp</div>
        </div>
        <div className="pricing-lg text-right">${(price / 100).toFixed(2)}</div>
      </div>
    )
  }

  return (
    <>
      {order.map(({ template_id, name, count, media, price }: DropPurchase) => (
        <div key={template_id} className="flex items-center mt-3">
          <div className="w-[15%] text-left">
            <PreviewMedia
              className={classNames(
                'w-[42px] h-[42px] flex-shrink-0 m-0 object-contain',
                {
                  '!w-[55px] !h-8': inReview
                }
              )}
              size={MEDIA_SIZES.TINY}
              media={media[0]}
            />
          </div>
          <div className="w-[60%] body flex-1">{name}</div>
          <div className="w-[5%] pl-1">{`x${count}`}</div>
          <div className="w-[20%] pricing-lg text-right">
            ${(price / 100).toFixed(2)}
          </div>
        </div>
      ))}
    </>
  )
}

export default OrderItem
