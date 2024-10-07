import React, { MutableRefObject, ReactNode } from 'react'
import classNames from 'classnames'
import { toast } from 'react-toastify'

// components
import { Button, Icon } from '..'
import CloseButton from './CloseButton'
import ConditionalWrap from '@/components/ConditionalWrap'
import Link from 'next/link'

// type styles
const TOAST_STYLES = {
  success: {
    icon: { name: 'tick', size: 16 },
    primary: 'success',
    contrast: 'black'
  },

  information: {
    icon: { name: 'information', size: 13 },
    primary: 'blue',
    contrast: 'white'
  },

  warning: {
    icon: { name: 'exclamation', size: 14 },
    primary: 'error',
    contrast: 'white'
  },

  attention: {
    icon: { name: 'exclamation', size: 14 },
    primary: 'alert',
    contrast: 'black'
  },

  system: {
    icon: { name: 'exclamation', size: 14 },
    primary: 'white',
    contrast: 'black'
  }
}

// available toast types
export type ToastTypes =
  | 'success'
  | 'information'
  | 'warning'
  | 'attention'
  | 'system'

export interface IToastMessage {
  title?: ReactNode
  message?: ReactNode
}

export interface ToastCallbackAction {
  label: string
  callback: () => void
  href?: never
}

interface ToastLinkAction {
  label: string
  href: string
  callback?: never
}

interface IToastProps {
  toastRef?: MutableRefObject<any>
  className?: string
  type?: ToastTypes
  title?: string | ReactNode
  description?: string | ReactNode
  children?: string | ReactNode
  autoClose?: number | false
  closeOnClick?: boolean
  inline?: boolean
  separator?: boolean
  onClose?: () => void
  action?: ToastCallbackAction | ToastLinkAction
}

const ToastMessage = ({
  className,
  type,
  title,
  description,
  children,
  separator,
  inline,
  action
}: IToastProps) => {
  const style = TOAST_STYLES[type] || TOAST_STYLES.system

  const ToastIcon = () => (
    <div
      className={classNames(
        `w-[20px] h-[20px] rounded-full flex items-center justify-center`,
        `bg-${style.primary} fill-${style.contrast} text-${style.contrast}`
      )}
    >
      {/* width required to fit size correctly when used inside of a popup toast */}
      <Icon {...style.icon} className="w-[24px]" />
    </div>
  )

  // resolve content, if any
  let content = description || children
  content = content && (
    <div className="body-sm text-left flex-1">
      <div>{content}</div>
      {!!action && (
        <ConditionalWrap
          condition={!!action.href}
          wrap={children => (
            <Link
              href={action.href}
              className="inline-block mt-[12px] utility underline"
            >
              {children}
            </Link>
          )}
          falseWrap={children => (
            <Button
              className="mt-[12px] utility underline"
              theme="clean"
              onClick={action.callback}
            >
              {children}
            </Button>
          )}
        >
          {action.label}
        </ConditionalWrap>
      )}
    </div>
  )

  const renderContent = () => {
    if (separator) {
      return (
        <>
          <div
            className={classNames(
              'px-2 py-[12px] flex gap-[12px] leading-snug',
              !inline && 'pr-6'
            )}
          >
            <ToastIcon />
            <div className="font-bold">{title}</div>
          </div>
          <hr className={`border-${style.primary}`} />
          {content && <div className="p-2">{content}</div>}
        </>
      )
    }

    return (
      <div className="p-2 flex gap-[12px] text-left">
        <ToastIcon />
        <div className="flex gap-[4px] flex-col w-full">
          {!!title && <div className={classNames('font-bold')}>{title}</div>}
          {content}
        </div>
      </div>
    )
  }

  return (
    <div
      className={classNames(
        className,
        `rounded-2xl text-white`,
        `border border-${style.primary} bg-${style.primary}-opaque`,

        // when there's no title and there's an auto-close option, the
        // far right edge can overlap the close button - this is some
        // extra space that will reduce the message area, but prevent
        // the overlapping button
        !inline && 'pr-6'
      )}
    >
      {renderContent()}
    </div>
  )
}

const Toast = ({
  toastRef = { current: null },
  onClose,
  ...props
}: IToastProps) => {
  const message = <ToastMessage {...props} />
  const { autoClose } = props

  // displayed inline without using toast system
  if (props.inline) return message

  // if this toast is already being displayed
  // then don't dismiss and repost
  if (toast.isActive(toastRef.current) || toastRef.current) {
    return
  }

  // hide existing toasts...
  toast.dismiss()

  // ... then post the message
  toastRef.current = toast(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose,
    pauseOnHover: true,
    draggable: false,
    closeOnClick: props.closeOnClick,
    hideProgressBar: true,
    pauseOnFocusLoss: false,
    className: `custom-toast`,
    bodyClassName: 'custom-toast-body',
    closeButton: props => <CloseButton {...props} autoClose={autoClose} />,
    icon: false,
    onClose: () => {
      toastRef.current = null
      onClose?.()
    }
  })

  return null
}

export default Toast
