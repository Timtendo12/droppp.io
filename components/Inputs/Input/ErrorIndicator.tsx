import { ReactNode } from 'react'

const ErrorIndicator = ({
  before,
  after
}: {
  before?: ReactNode
  after?: ReactNode
}) => (
  <div className="flex gap-1 items-center">
    {before}
    <div className="flex items-center justify-center rounded-xl w-3 h-3 font-bold text-white bg-error">
      !
    </div>
    {after}
  </div>
)

export default ErrorIndicator
