import classNames from 'classnames'
import { ReactNode } from 'react'

interface BreakdownReplacedValueProps {
  children: ReactNode
  className?: string
}

export default function BreakdownReplacedValue({
  children,
  className
}: BreakdownReplacedValueProps) {
  return (
    <div className={classNames('relative', className)}>
      <hr className="absolute scale-125 rotate-[35deg] left-0 top-[50%] right-0 border-error border-t-[2px] rounded" />
      <p className="text-gray-300">{children}</p>
    </div>
  )
}
