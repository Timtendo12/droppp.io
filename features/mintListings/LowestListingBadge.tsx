import React from 'react'
import { StatusBadge } from '@/components/StatusBadge'
import classNames from 'classnames'

interface Props {
  className?: string
}

const LowestListingBadge = ({ className = '' }: Props) => {
  return (
    <StatusBadge
      status="success"
      size={'sm'}
      className={classNames('!text-white', className)}
    >
      Lowest<span className="max-[959px]:hidden">&nbsp;Listing</span>
    </StatusBadge>
  )
}

export default LowestListingBadge
