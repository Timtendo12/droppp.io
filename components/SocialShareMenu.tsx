import classNames from 'classnames'
import React, { useRef, useState } from 'react'
import { CircleIconButton } from './CircleIconLink'
import ContextualMenu from './ContextualMenu'
import { clipboardCopy } from '@/util/clipboardCopy'
import { ContextualMenuProps } from './ContextualMenu'

interface Props {
  className?: string
  circleIconButtonClassName?: string
  contextualMenuConfig?: Partial<ContextualMenuProps>
}

export default function SocialShareMenu({
  className = '',
  circleIconButtonClassName = '',
  contextualMenuConfig
}: Props) {
  const buttonRef = useRef<HTMLDivElement>()
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsShareMenuOpen(!isShareMenuOpen)
  }

  // setPositioningClasses

  return (
    <div className={classNames('relative', className)}>
      <div ref={buttonRef}>
        <CircleIconButton
          name="share"
          onClick={toggleMenu}
          className={circleIconButtonClassName}
        />
      </div>

      <ContextualMenu
        isOpen={isShareMenuOpen}
        onClose={() => setIsShareMenuOpen(false)}
        buttonRef={buttonRef}
        {...contextualMenuConfig}
        items={[
          {
            label: 'Copy Link',
            iconName: 'link',
            action: async () => await clipboardCopy(location.href)
          },
          {
            label: 'Share on Facebook',
            iconName: 'facebook',
            action: () =>
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${location.href}`,
                '_blank'
              )
          },
          {
            label: 'Share on X',
            iconName: 'twitter',
            action: () =>
              window.open(
                `https://twitter.com/intent/tweet?url=${location.href}"`,
                '_blank'
              )
          }
        ]}
      />
    </div>
  )
}
