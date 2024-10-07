import React, { ReactNode, SyntheticEvent, useId, useState } from 'react'

// utils
import classNames from 'classnames'
import { isFunction } from 'lodash'

// components
import { Icon } from '..'
import { Icons } from '@/components/Icon'

type StateClassNames = {
  default?: string
  open?: string
  closed?: string
}

interface ICollapsibleProps {
  label?: ReactNode | ((isOpen: boolean) => ReactNode)
  icon?: Icons | string
  children?: any
  open?: boolean
  disabled?: boolean
  className?: string
  renderContentAbove?: boolean
  labelClassName?: StateClassNames | string
  contentClassName?: StateClassNames | string
  iconClassName?: StateClassNames | string

  onToggle?: (open: boolean) => void
}

// helps convert StateClassName types to a className string
function createStateClassName(
  value: StateClassNames | string,
  isOpen: boolean
): string {
  // a normal string
  if (typeof value === 'string') {
    return classNames(value)
  }

  // more complex
  return classNames(value?.default, {
    [value?.open]: isOpen,
    [value?.closed]: !isOpen
  })
}

const Collapsible = ({
  label,
  icon,
  children,
  className,
  labelClassName,
  contentClassName,
  iconClassName,
  renderContentAbove = false,
  open: openByDefault = false,
  disabled,
  onToggle
}: ICollapsibleProps) => {
  const id = useId()
  const [open, setOpen] = useState(openByDefault)
  const rendered = isFunction(label) ? (
    label(open)
  ) : // provided an icon name
  icon ? (
    <Icon name={icon} className={createStateClassName(iconClassName, open)} />
  ) : (
    // just provided label content
    label
  )

  // handles toggling and maintaining the state
  const handleToggle = (event: SyntheticEvent<HTMLDetailsElement, Event>) => {
    const isOpen = ![null, undefined].includes(
      event.currentTarget?.getAttribute('open')
    )

    // did the state change?
    if (isOpen !== open) {
      setOpen(isOpen)
      onToggle?.(!isOpen)
    }
  }

  return (
    <details
      className={classNames(className, { 'relative pb-4': renderContentAbove })}
      open={openByDefault}
      onToggle={handleToggle}
    >
      <summary
        aria-controls={id}
        aria-expanded={open}
        className={classNames(
          'list-none',
          createStateClassName(labelClassName, open),
          {
            'pointer-events-none select-none': disabled,
            'absolute bottom-0 right-1/2 transform translate-x-1/2':
              renderContentAbove
          }
        )}
      >
        {rendered}
      </summary>
      {children && (
        <div id={id} className={createStateClassName(contentClassName, open)}>
          {children}
        </div>
      )}
    </details>
  )
}

export default Collapsible
