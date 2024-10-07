import React from 'react'
import { ButtonLink, ButtonTheme } from './Button'
import Icon, { Icons } from './Icon'
import classNames from 'classnames'

type Props = {
  href: string
  disabled?: boolean
  theme?: ButtonTheme
  ariaLabel: string
  icon: {
    name: Icons
    className?: string
  }
  subLabel?: string
  newTab?: boolean
}

export default function IconLink({
  ariaLabel,
  href,
  icon,
  disabled,
  subLabel,
  theme = 'secondary',
  newTab = true
}: Props) {
  let iconSizing = ''

  switch (icon.name) {
    case 'expand':
      iconSizing = 'w-[22px] h-[22px]'
      break
    case 'download':
    case 'blockchainV2':
      iconSizing = 'w-[24px] h-[24px]'
      break
    default:
      break
  }

  return (
    <div>
      <ButtonLink
        ariaLabel={ariaLabel}
        theme={theme}
        disabled={disabled}
        href={href}
        className="max-md:px-[15px] md:px-[25px] !py-[15px] hover:!scale-[1.12]"
        newTab={newTab}
      >
        <Icon
          name={icon.name}
          className={classNames(
            'w-[20px] h-[20px]',
            icon.className,
            iconSizing
          )}
        />
      </ButtonLink>
      {subLabel && (
        <div className="text-center w-full body-xs text-gray-300 mt-1">
          {subLabel}
        </div>
      )}
    </div>
  )
}
