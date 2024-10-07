import React, { ReactNode } from 'react'
import classNames from 'classnames'
import Icon from '@/components/Icon'
import Confirmation from './Confirmation'

export interface IAcknowledgeBoxProps {
  className?: string
  title?: ReactNode
  confirm?:
    | React.ReactElement<typeof Confirmation>
    | React.ReactElement<typeof Confirmation>[]

  children?: ReactNode
  addendum?: ReactNode
  type?: 'default' | 'danger'
}

const AcknowledgeBox = ({
  className,
  type = 'default',
  children: description,
  title,
  confirm,
  addendum
}: IAcknowledgeBoxProps) => {
  const hasConfirmations = React.Children.count(confirm) > 0
  const isDanger = type === 'danger'
  const isDefault = !isDanger

  // some acknowledgement boxes show an icon
  let icon
  if (isDanger) {
    icon = (
      <div className="bg-error w-[20px] h-[20px] rounded-full flex items-center justify-center font-bold text-base">
        <Icon name="exclamation" size={12} className="fill-white" />
      </div>
    )
  }

  return (
    <div
      className={classNames(
        'group p-2 border rounded-2xl text-sm',
        isDefault && 'is-danger bg-gray-800 border-gray-700',
        isDanger && 'is-default bg-error-opaque border-error',
        className
      )}
    >
      {title && (
        <div
          className={classNames(
            'pb-1 flex items-center font-bold text-base',
            icon && 'gap-1'
          )}
        >
          {icon}
          {title}
        </div>
      )}

      {/* the passage of text */}
      {description && (
        <div
          className={classNames('pb-2', {
            'text-gray-200': !isDanger
          })}
        >
          {description}
        </div>
      )}

      {/* each confirmation option */}
      <div className="flex flex-col gap-1">{confirm}</div>

      {/* bottom addendum, if any */}
      {addendum && !hasConfirmations && <hr className="border-white/15" />}
      {addendum && (
        <div className="text-center underline pt-[10px]">{addendum}</div>
      )}
    </div>
  )
}

// share to make it easier to access
AcknowledgeBox.Confirm = Confirmation

export default AcknowledgeBox
