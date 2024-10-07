import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Toast from '../Toast'
import Icon from '../Icon'
import classNames from 'classnames'

type Props = {
  className?: string
  valueToCopy: string | number
  successMessage?: string
  size?: 'default' | 'sm'
}

export default function CopyButton({
  className,
  valueToCopy,
  successMessage = 'Copied to clipboard.',
  size = 'default'
}: Props) {
  const { sizeClass, iconClass } = getClasses(size)
  return (
    <CopyToClipboard
      className={classNames(
        'rounded-full bg-white/15 flex items-center justify-center hover:bg-white hover:text-gray-900 cursor-pointer',
        sizeClass,
        className
      )}
      text={valueToCopy}
      onCopy={() => {
        Toast({
          type: 'success',
          description: successMessage
        })
      }}
    >
      <div>
        <Icon className={iconClass} name="copy" />
      </div>
    </CopyToClipboard>
  )
}

const getClasses = size => {
  if (size === 'sm') {
    return {
      sizeClass: 'h-3 w-3',
      iconClass: 'w-2 h-2'
    }
  }
  return {
    sizeClass: 'w-4 h-4',
    iconClass: 'h-[20px] w-[20px]'
  }
}
