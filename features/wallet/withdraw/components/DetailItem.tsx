import { ReactNode } from 'react'

interface DetailItemProps {
  title: ReactNode
  value: ReactNode
  className?: string
}
export const DetailItem = ({ title, value, className }: DetailItemProps) => {
  return (
    <div className={className}>
      <div className="text-gray-300 mb-1">{title}</div>
      {value}
    </div>
  )
}
