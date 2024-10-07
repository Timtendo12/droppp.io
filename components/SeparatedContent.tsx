import { ReactNode } from 'react'
import Separator from './Separator'

const SeparatedContent = ({
  showSeparator = true,
  separatorContainerClass = '',
  children
}: {
  showSeparator?: boolean
  separatorContainerClass?: string
  children: ReactNode
}) => (
  <>
    {showSeparator && (
      <div className={separatorContainerClass}>
        <Separator className="my-8" />
      </div>
    )}
    {children}
  </>
)

export default SeparatedContent
