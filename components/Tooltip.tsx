import React, { ReactElement } from 'react'
import Popup, { IPopupProps } from './Popup'
import Icon from './Icon'
import classNames from 'classnames'

type TriggerProps = {
  isOpen: boolean
  DefaultTriggerComponent: ({
    className
  }: DefaultTooltipTriggerProps) => ReactElement
}

type Props = Omit<IPopupProps, 'trigger'> & {
  triggerClassName?: string
  trigger?: ({ isOpen, DefaultTriggerComponent }: TriggerProps) => ReactElement
}

const Tooltip = ({
  size = 'sm',
  trigger,
  children,
  triggerClassName,
  ...rest
}: Props) => {
  return (
    <Popup
      size={size}
      trigger={isOpen => {
        return (
          trigger?.({
            isOpen,
            DefaultTriggerComponent: () => <DefaultTooltipTrigger />
          }) || (
            <div className="max-w-max">
              <DefaultTooltipTrigger className={triggerClassName} />
            </div>
          )
        )
      }}
      {...rest}
    >
      <div className="flex gap-1">
        <Icon name="informationalFilled" className="w-2 h-2 flex-none" />
        <div className="-mt-[3px]">{children}</div>
      </div>
    </Popup>
  )
}

export default Tooltip

interface DefaultTooltipTriggerProps {
  className?: string
}

const DefaultTooltipTrigger = ({ className }: DefaultTooltipTriggerProps) => {
  return (
    <div className={classNames('max-w-max w-2', className)}>
      <Icon name="question" className="w-full" />
    </div>
  )
}
