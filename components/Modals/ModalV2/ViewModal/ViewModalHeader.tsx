import Link from 'next/link'
import React, { ReactNode } from 'react'
import Button from '@/components/Button'
import Icon from '@/components/Icon'
import classNames from 'classnames'
import { ViewModalCancelButtonConfig, headerHeightCustomProp } from '.'

export type Props = {
  className?: string
  cancelButtonConfig?: ViewModalCancelButtonConfig
  children?: ReactNode
  onLogoAction?: () => void
  shouldShowBetaLogo?: boolean
  shouldShowLogoOnSmall?: boolean
  style?: React.CSSProperties
}

export default function ViewModalHeader({
  className,
  onLogoAction,
  cancelButtonConfig,
  children,
  shouldShowBetaLogo = false,
  style
}: Props) {
  return (
    <div
      className={classNames(
        `h-[var(--viewModalHeaderHeight)] flex-shrink-0 bg-black border-b border-defaultBorder flex justify-between items-center z-10`,
        className
      )}
      style={{
        ...style,
        ...headerHeightCustomProp
      }}
    >
      <div className="flex md:mr-3 items-center self-stretch">
        <Link
          href="/"
          onClick={onLogoAction}
          className="px-2 md:px-3 self-stretch flex items-center"
        >
          <Icon name="dpLogo" />
        </Link>
        {shouldShowBetaLogo && <Icon name="betaLogo" className="mr-3" />}
        {children && <VerticalSeparator />}
      </div>

      <div className="max-md:ml-2 flex-1 min-w-0">{children}</div>
      <div className="flex ml-2 md:ml-3 self-stretch items-center">
        {children && <VerticalSeparator />}
        {cancelButtonConfig && (
          <Button
            className="px-2 md:px-3 utility self-stretch"
            theme={cancelButtonConfig?.theme || 'clean'}
            onClick={cancelButtonConfig?.action}
          >
            {cancelButtonConfig?.label || 'Cancel'}
          </Button>
        )}
      </div>
    </div>
  )
}

const VerticalSeparator = () => {
  return <div className="h-4 border-r border-defaultBorder" />
}
