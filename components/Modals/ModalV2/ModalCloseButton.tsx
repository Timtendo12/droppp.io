import React from 'react'
import { classNames } from '@/util/tailwindHelpers'
import { Button, Icon } from '@/components'
import { getCloseIconClassNames } from '@/util/theme'

interface ModalCloseButtonProps {
  theme?: 'light' | 'dark'
  isSticky?: boolean
  isDisabled?: boolean
  className?: string
  onClick: () => void
}

export const ModalCloseButton = ({
  theme = 'light',
  isSticky = false,
  isDisabled = false,
  className,
  onClick
}: ModalCloseButtonProps) => {
  const closeIconClassNames = getCloseIconClassNames(theme, isSticky)

  return (
    <Button
      theme="clean"
      size="xs"
      className={classNames(
        "!rounded-full outline-none flex items-center justify-center z-1 !w-3 !h-3 !p-0 flex-0 ml-[var(--modalPadding)] relative before:content-[''] before:absolute before:-inset-3 before:-z-10",
        className,
        closeIconClassNames
      )}
      disabled={isDisabled}
      onClick={onClick}
    >
      <Icon className="text-white w-[17px] h-[18px]" name="cross" />
    </Button>
  )
}
