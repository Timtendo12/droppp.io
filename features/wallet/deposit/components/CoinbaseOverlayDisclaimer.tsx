import classNames from 'classnames'
import React from 'react'

type Props = {
  className?: string
}

export default function CoinbaseOverlayDisclaimer({
  className = 'flex items-end my-2 mx-3'
}: Props) {
  return (
    <div className={classNames('flex-1', className)}>
      <div className="bg-black/80 h-3 flex items-center px-[10px] rounded-full text-xxs text-gray-300">
        Coinbase example. Your experience may differ.
      </div>
    </div>
  )
}
