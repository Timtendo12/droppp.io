import React from 'react'
import Icon, { Icons } from '@/components/Icon'
import { Column } from '@/features/wallet/core/components/Column'

interface USDCHeaderItemProps {
  category: string
  label: string
  icon: Icons
}

export const USDCHeaderItem = ({
  category,
  label,
  icon
}: USDCHeaderItemProps) => {
  return (
    <Column>
      <h4 className="h8 md:h7 text-gray-300 mb-1">{category}</h4>
      <div className="flex gap-1 h-3 items-center">
        <Icon name={icon} className="w-[20px] md:w-3" />
        <h3 className="h7 md:h6">{label}</h3>
      </div>
    </Column>
  )
}
