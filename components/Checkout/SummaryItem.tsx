import React, { ReactNode } from 'react'

interface Props {
  label: ReactNode
  value?: ReactNode
}

const SummaryItem = ({ label, value }: Props) => {
  return (
    <div className="flex justify-between">
      <div className="body text-gray-300">{label}</div>
      <div className="pricing-lg">{value}</div>
    </div>
  )
}

export default SummaryItem
