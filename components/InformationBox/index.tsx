import classNames from 'classnames'
import { isString } from 'lodash'
import { ReactNode } from 'react'
import Icon, { Icons } from '@/components/Icon'

interface IInformationBoxProps {
  title: ReactNode | string
  children?: ReactNode
  description?: ReactNode | string
  icon?: ReactNode | Icons
  className?: string
  titleClassName?: string
  contentClassName?: string
  iconClassName?: string
}

const InformationBox = ({
  icon,
  title,
  children,
  description,
  className,
  titleClassName,
  contentClassName,
  iconClassName
}: IInformationBoxProps) => {
  // check for an icon to show
  let displayIcon = icon
  if (isString(icon)) {
    displayIcon = <Icon name={icon} className={iconClassName} />
  }

  return (
    <div
      className={classNames(
        'flex flex-col gap-1 bg-gray-800 py-2 px-3 rounded-3xl',
        className
      )}
    >
      <div
        className={classNames(
          'flex gap-1 items-center text-base font-bold text-gray-25',
          titleClassName
        )}
      >
        {displayIcon}
        <div>{title}</div>
      </div>

      <div className={classNames('text-sm text-gray-300', contentClassName)}>
        {children || description}
      </div>
    </div>
  )
}

export default InformationBox
