import classNames from 'classnames'
import React from 'react'
import Icon, { Icons } from '@/components/Icon'
import styles from './styles.module.scss'

export type ModalStateGraphicTheme = 'default' | 'error'

export type Props = {
  icon: Icons | string
  className?: string
  iconClassName?: string
  theme?: ModalStateGraphicTheme
}

export default function ModalStateGraphic({
  className,
  icon,
  iconClassName = 'w-4 h-4',
  theme = 'default'
}: Props) {
  const isDefaultStyles = theme === 'default'

  return (
    <div
      className={classNames(
        'relative flex items-center justify-center w-9 h-9',
        className
      )}
    >
      <div
        className={classNames(
          'absolute inset-0 rounded-full p-half',
          getIconWrapperStyle(theme),
          {
            [styles.iconCircle]: isDefaultStyles
          }
        )}
      />
      <Icon name={icon} className={iconClassName} />
    </div>
  )
}

const getIconWrapperStyle = theme => {
  let result = ''
  switch (theme) {
    case 'error':
      result = 'border-4 border-error'
      break

    default:
      result = 'bg-rainbowCircle'
      break
  }
  return result
}
