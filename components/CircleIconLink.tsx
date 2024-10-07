import classNames from 'classnames'
import React, { useState } from 'react'
import { clipboardCopy } from '@/util/clipboardCopy'
import Icon, { SocialIcons } from './Icon'

export interface ICircleIconLink {
  className?: string
  iconClassName?: string
  name: SocialIcons | string
  url: string
}

export const LINK_CLASSES =
  'flex justify-center items-center rounded-full bg-[rgba(255,255,255,.15)] h-6 w-6 transition-transform duration-button hover:scale-110'

export const LINK_ICON_CLASSES = 'h-3 w-3 transform-gpu'

const CLIPBOARD_LINK_CLASSES =
  'body-lg font-black mb-2 flex items-center cursor-pointer'

export default function CircleIconLink({
  className,
  iconClassName,
  name,
  url
}: ICircleIconLink) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={classNames(LINK_CLASSES, className)}
    >
      <Icon
        name={name}
        className={classNames(LINK_ICON_CLASSES, iconClassName)}
      />
    </a>
  )
}

interface ICircleIconButton extends Omit<ICircleIconLink, 'url'> {
  size?: 'sm' | 'default'
  onClick: () => void
  children?: React.ReactNode
}

export function CircleIconButton({
  className,
  name,
  size = 'default',
  onClick,
  children
}: ICircleIconButton) {
  return (
    <button
      onClick={onClick}
      className={classNames(LINK_CLASSES, className, {
        'w-4 h-4': size === 'sm'
      })}
    >
      <Icon
        name={name}
        className={classNames(LINK_ICON_CLASSES, {
          'w-[20px] h-[20px]': size === 'sm'
        })}
      />
      {children}
    </button>
  )
}

interface IClipboardLinkButton extends Omit<ICircleIconLink, 'className'> {
  id: string
  heading: string
  titleClassName?: string
  circleIconClassName?: string
  size?: 'sm' | 'default'
}

export function ClipboardLinkButton({
  id,
  heading,
  titleClassName,
  circleIconClassName,
  iconClassName,
  name,
  url,
  size = 'sm'
}: IClipboardLinkButton) {
  const handleClick = url => {
    clipboardCopy(url)
    const tooltip = document.getElementById(`tooltip-${id}`)
    tooltip.style.display = 'inline'
    setTimeout(function () {
      tooltip.style.display = 'none'
    }, 1000)
  }

  const [isHovered, setIsHovered] = useState(false)

  const onMouseEnter = () => setIsHovered(true)
  const onMouseLeave = () => setIsHovered(false)

  return (
    <div
      onClick={async () => await handleClick(url)}
      className={classNames(CLIPBOARD_LINK_CLASSES, titleClassName)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {heading}
      <div className={classNames('ml-2 hidden', { '!block': isHovered })}>
        <div
          className={classNames(LINK_CLASSES, circleIconClassName, {
            'w-4 h-4': size === 'sm'
          })}
        >
          <Icon
            name={name}
            className={classNames(LINK_ICON_CLASSES, iconClassName)}
          />
        </div>
      </div>
      <div
        id={`tooltip-${id}`}
        className="text-black bg-white body-sm px-1 py-[3px] ml-1 hidden rounded"
      >
        Copied to Clipboard!
      </div>
    </div>
  )
}
