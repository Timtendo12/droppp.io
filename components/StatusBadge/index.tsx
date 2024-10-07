import { ReactNode } from 'react'
import classNames from 'classnames'
import Icon, { Icons } from '@/components/Icon'

export interface IStatusBadgeProps {
  status?: 'alert' | 'error' | 'success' | 'default'
  children: ReactNode
  icon?: Icons
  size?: 'sm' | 'default' // TODO:? | 'lg' | 'xl'
  iconSize?: number
  iconClassName?: string
  className?: string
}
const STATUS_BADGE_TEXT_CLASSES_BASE = 'font-bold uppercase'
export const STATUS_BADGE_TEXT_CLASSES_SM =
  'text-xxs ' + STATUS_BADGE_TEXT_CLASSES_BASE
export const STATUS_BADGE_TEXT_CLASSES_DEFAULT =
  'text-xxs ' + STATUS_BADGE_TEXT_CLASSES_BASE
const STATUS_BADGE_PADDING_CLASSES_SM = 'px-[8px] py-[1px]'
const STATUS_BADGE_PADDING_CLASSES_DEFAULT = 'px-[8px] py-[3px]'

// and used elsewhere
export const StatusBadge = ({
  className,
  children,
  icon,
  iconSize,
  iconClassName,
  size = 'default',
  status
}: IStatusBadgeProps) => {
  const showIcon = icon && (
    <Icon name={icon} size={iconSize} className={iconClassName} />
  )

  const statusClassNames =
    status === 'alert'
      ? 'text-alert border-alert'
      : status === 'error'
      ? 'text-error border-error'
      : status === 'success'
      ? 'text-success border-success'
      : 'text-gray-400 border-gray-400'

  return (
    <div
      className={classNames(
        'flex items-center border-1 rounded-full whitespace-nowrap',
        showIcon && 'pl-[5px]',
        size === 'sm' && [
          STATUS_BADGE_TEXT_CLASSES_SM,
          STATUS_BADGE_PADDING_CLASSES_SM
        ],
        size === 'default' && [
          STATUS_BADGE_TEXT_CLASSES_DEFAULT,
          STATUS_BADGE_PADDING_CLASSES_DEFAULT
        ],
        statusClassNames,
        className
      )}
    >
      {showIcon}
      {children}
    </div>
  )
}
