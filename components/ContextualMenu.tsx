import classNames from 'classnames'
import React, { RefObject, useRef, useState } from 'react'
import { useEffect } from 'react'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import Icon, { Icons } from './Icon'

export type ContextualMenuProps = {
  isOpen: boolean
  className?: string
  itemClassName?: string
  buttonClassName?: string
  onClose?: () => void
  buttonRef?: RefObject<HTMLElement>
  items: {
    iconName?: Icons
    keepContextMenuOpen?: boolean
    label: string
    action: () => void
  }[]
}

const OFFSET_PADDING = 32
const DEFAULT_ORIGIN_CLASSES =
  'mt-1 top-full left-1/2 -translate-x-1/2 origin-top-[50%]'

export default function ContextualMenu({
  className,
  itemClassName,
  buttonClassName,
  isOpen,
  items,
  buttonRef,
  onClose
}: ContextualMenuProps) {
  const handleAction = (action, keepContextMenuOpen) => {
    // if the option doesn't explicity request that the context menu
    // stays open, go ahead and auto-close the context menu
    if (!keepContextMenuOpen) {
      onClose()
    }

    // wait just a moment before triggering the action
    // to make sure the close animation has been triggered
    // for actions that open new tabs, it's possible to
    // return to the page and the context menu dismisses
    // at that point
    setTimeout(action, 100)
  }

  const [originClasses, setOriginClasses] = useState(DEFAULT_ORIGIN_CLASSES)
  const menuRef = useRef<HTMLUListElement>()

  const updateContextMenuPosition = () => {
    setOriginClasses(
      getPositioningClasses(
        getPositioningCoords(
          buttonRef.current.getBoundingClientRect(),
          menuRef.current,
          window
        )
      )
    )
  }

  // when opening, update the position again
  useEffect(() => {
    if (isOpen) {
      updateContextMenuPosition()
    }
  }, [isOpen, buttonRef])

  // on mount, set the default position -- this
  // will prevent it from animating from the far
  // left edge of the screen to the new origin
  useEffect(() => {
    updateContextMenuPosition()
  }, [])

  useOnClickOutside([menuRef, buttonRef], () => onClose())

  return (
    <ul
      ref={menuRef}
      className={classNames(
        className,
        'bg-gray-850 rounded-3xl shadow-md opacity-0 pointer-events-none scale-75 transition-all absolute z-[1000] p-1',
        originClasses,

        {
          // placed to allow for dynamic results - otherwise tailwind will strip
          ['bottom-full top-full origin-bottom-left origin-bottom-right']:
            false,
          ['scale-100 pointer-events-auto opacity-100']: isOpen
        }
      )}
    >
      {items.map((item, i) => (
        <li
          key={`${i} - ${item.label}`}
          className={classNames(
            'border-b-1 border-defaultBorder last:border-none mx-2',
            itemClassName
          )}
        >
          <button
            onClick={() => handleAction(item.action, item.keepContextMenuOpen)}
            className={classNames(
              'w-full text-sm flex whitespace-nowrap items-center py-[10px] hover:text-gray-400',
              buttonClassName
            )}
          >
            {item.iconName && <Icon name={item.iconName} className="mr-1" />}
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  )
}

const getPositioningCoords = (
  { x: buttonX, y: buttonY },
  { offsetWidth: width, offsetHeight: height },
  { innerHeight, innerWidth }
) => {
  const coords = { x: 'left', y: 'bottom' }

  if (buttonX + width + OFFSET_PADDING > innerWidth) {
    coords.x = 'center'
  } else if (buttonX - width / 2 - OFFSET_PADDING < 0) {
    coords.x = 'left'
  }
  if (buttonY + height + OFFSET_PADDING > innerHeight) {
    coords.y = 'top'
  }
  return coords
}

const getPositioningClasses = ({ x, y }) => {
  let originString = 'origin'
  let result = ''

  if (y === 'top') {
    result += 'bottom-full mb-1'
    originString += '-bottom'
  } else {
    result += 'top-full mt-1'
    originString += '-top'
  }

  if (x === 'left') {
    result += ' left-0'
    originString += '-left'
  } else if (x === 'right') {
    result += ' right-0'
    originString += '-right'
  } else {
    result += ' left-1/2 -translate-x-1/2'
  }
  return result + ' ' + originString
}
