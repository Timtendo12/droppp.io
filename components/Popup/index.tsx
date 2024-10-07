import React, { ReactElement, Ref } from 'react'
import classNames from 'classnames'
import PopupComponent from 'reactjs-popup'
import {
  EventType,
  PopupActions,
  PopupPosition
} from 'reactjs-popup/dist/types'

// NOTE: rather than replacing the library, it's easier to just
// void out the provided styling and use Tailwind with a nested
// element
const REMOVE_BUILT_IN_STYLING = {
  background: 'none',
  border: 'none',
  boxShadow: 'none',
  borderRadius: 0,
  width: 'auto',
  padding: 0
}

type Size = 'sm' | 'md' | 'lg'

export interface IPopupProps {
  trigger: ReactElement | ((isOpen: boolean) => JSX.Element)
  children: any
  className?: string
  event?: EventType | EventType[]
  position?: PopupPosition | PopupPosition[]
  closeOnDocumentClick?: boolean
  keepTooltipInside?: boolean
  clean?: boolean
  width?: number
  offsetX?: number
  offsetY?: number
  size?: Size
  onClose?: () => void
  onOpen?: () => void
}

// TODO: possibly add mobile view sizes
const SIZING_TO_TAILWIND = {
  sm: 'w-[250px]',
  md: 'w-[300px]',
  lg: 'w-[500px]'
}

const Popup = React.forwardRef(
  (
    {
      clean,
      width,
      size = 'sm',
      event: on = 'hover',
      position = 'top center',
      children,
      keepTooltipInside = true,
      trigger,
      ...props
    }: IPopupProps,
    ref: Ref<PopupActions>
  ) => {
    // styling
    const sizing = SIZING_TO_TAILWIND[size]
    const className = classNames(
      'text-sm rounded-[24px] p-2',
      !clean && `bg-gray-800 ${sizing}`,
      props.className
    )

    // props used by the popup
    const popupProps = {
      ...props,
      position,
      keepTooltipInside,
      on,

      // NOTE: if you're having issues with the popup not aligning to
      // the trigger element, it might be the type of element being
      // returned as a trigger. For example, the Icon component doesn't
      // work inside of modals without wrapping in a div first. It's
      // not clear why since this happens inside of the library, but
      // if you're having problems, try wrapping with a div
      trigger
    }

    return (
      <PopupComponent
        ref={ref}
        arrow={false}
        repositionOnResize={true}
        contentStyle={REMOVE_BUILT_IN_STYLING}
        nested
        {...popupProps}
      >
        {/* @ts-ignore - https://github.com/yjose/reactjs-popup/issues/310 */}
        {close => (
          <div className={className} style={{ width }}>
            {typeof children === 'function' ? children(close) : children}
          </div>
        )}
      </PopupComponent>
    )
  }
)

export default Popup
