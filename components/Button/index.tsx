import { classNames } from '@/util/tailwindHelpers'
import Link from 'next/link'
import { HTMLAttributeAnchorTarget, ReactNode } from 'react'
import { scrollIntoViewWithOffset } from '@/util/scrollHelpers'
import Spinner from '@/components/Spinner'

export type ButtonSize = 'lg' | 'md' | 'sm' | 'xs' | 'auto'
export type ButtonTheme =
  | 'blue'
  | 'white'
  | 'gray'
  | 'gray-transparent'
  | 'black'
  | 'blocked'
  | 'green'
  | 'rainbow'
  | 'clean'
  | 'clean-blue'
  | 'secondary'
  | 'destructive'
  | 'gray-blur'
  | 'green-cta'
export type ButtonDisabledTheme = 'default' | 'secondary' | 'black'

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabledTheme?: ButtonDisabledTheme
  loading?: boolean
  size?: ButtonSize
  theme?: ButtonTheme
  children: ReactNode
}

// button as link

const Button = ({
  className = '',
  type = 'button',
  theme = 'blue',
  size = 'md',
  disabled = false,
  disabledTheme = 'default',
  loading,
  onClick,
  children,
  ...rest
}: IButtonProps) => {
  if (theme === 'clean' || theme === 'clean-blue') {
    return (
      <button
        {...rest}
        className={classNames(getButtonClasses(theme, size), className)}
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
      >
        {children}
      </button>
    )
  }

  return (
    <button
      className={classNames(
        getButtonClasses(theme, size),
        getDisabledThemeClasses(disabledTheme),
        className
      )}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <Spinner />}
      <span
        className={classNames('flex items-center justify-center w-full', {
          invisible: loading
        })}
      >
        {children}
      </span>
    </button>
  )
}

interface IScrollToButton {
  className?: string
  theme?: ButtonTheme
  size?: ButtonSize
  offset?: number
  targetId: string
  onClick?: () => void
  children: ReactNode
}

export const ScrollToButton = ({
  className = '',
  theme = 'clean',
  size = 'lg',
  offset = 0,
  targetId,
  onClick,
  children
}: IScrollToButton) => {
  const handleScrollTo = () => {
    scrollIntoViewWithOffset(targetId, offset)
    onClick && onClick()
  }

  return (
    <Button
      theme={theme}
      size={size}
      className={className}
      onClick={handleScrollTo}
    >
      {children}
    </Button>
  )
}

interface IButtonLink {
  className?: string
  ariaLabel?: string
  disabledTheme?: ButtonDisabledTheme
  disabled?: boolean
  style?: React.CSSProperties
  size?: ButtonSize
  rel?: string
  theme?: ButtonTheme
  target?: HTMLAttributeAnchorTarget
  newTab?: boolean
  href: string
  children: ReactNode
}

export const ButtonLink = ({
  ariaLabel,
  children,
  style,
  className,
  disabledTheme,
  disabled,
  newTab = false,
  href,
  size = 'md',
  target,
  rel,
  theme = 'blue'
}: IButtonLink) => {
  const _href = disabled ? '' : href.trim()

  // lets check to see if this is an external url
  let isRelative = true
  if (typeof window !== 'undefined') {
    isRelative =
      new URL(document.baseURI).origin ===
      new URL(_href, document.baseURI).origin
  }

  // if disabled, just return a button with no
  // click action associated with it
  if (disabled) {
    return (
      <Button
        style={style}
        aria-label={ariaLabel}
        size={size}
        className={classNames(className, 'flex justify-center items-center')}
        disabled={true}
        theme={theme}
        disabledTheme={disabledTheme}
      >
        {children}
      </Button>
    )
  }

  const newTabSettings = newTab
    ? {
        target: '_blank',
        rel: 'noopener noreferrer'
      }
    : {}

  if (isRelative) {
    return (
      <Link
        aria-label={ariaLabel}
        href={_href}
        target={target}
        rel={rel}
        {...newTabSettings}
        className={classNames(
          getButtonClasses(theme, size, true),
          className,
          'flex items-center justify-center'
        )}
        style={{ ...style }}
      >
        {children}
      </Link>
    )
  } else {
    return (
      <a
        href={_href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        {...newTabSettings}
        className={classNames(
          getButtonClasses(theme, size, true),
          className,
          'flex items-center justify-center'
        )}
        style={{ ...style }}
      >
        {children}
      </a>
    )
  }
}

const getButtonClasses = (
  theme: ButtonTheme,
  size: ButtonSize,
  isLink?: boolean
): string => {
  if (theme === 'clean') {
    return ''
  } else if (theme === 'clean-blue') {
    return 'utility text-blue--light hover:text-blue'
  }

  let themeClasses
  let sizeClasses
  let defaultClasses =
    'transition-transform duration-button transform-gpu focus:ring-blue/[.75] focus-visible:ring-2 outline-none font-primary font-bold uppercase whitespace-nowrap enabled:hover:scale-105 disabled:cursor-not-allowed'

  if (isLink) {
    defaultClasses += ' hover:scale-105'
  }

  switch (theme) {
    case 'blue':
      themeClasses = 'text-white bg-blue'
      break
    case 'white':
      themeClasses = 'text-gray-900 bg-white'
      break
    case 'gray-blur':
      themeClasses = 'text-white bg-gray-700/30 backdrop-blur-sm'
      break
    case 'gray':
      themeClasses = 'text-white bg-gray-700'
      break
    case 'gray-transparent':
      themeClasses = 'text-white bg-gray-700/70'
      break
    case 'black':
      themeClasses = 'text-white bg-gray-900'
      break
    case 'green':
      themeClasses = 'text-white bg-rarity-uncommon'
      break
    case 'rainbow':
      themeClasses = 'text-white bg-rainbow--linear'
      break
    case 'secondary':
      themeClasses = 'text-white bg-white/15'
      break
    case 'destructive':
      themeClasses = 'text-white bg-error-opaque border-1 border-error'
      break
    case 'green-cta':
      themeClasses = 'text-white bg-rarity-uncommon'
      break
    case 'blocked':
      themeClasses =
        'text-gray-400 bg-transparent bg-none shadow-buttonInset--transparent'
      break
    default:
      break
  }

  switch (size) {
    case 'xs':
      sizeClasses = `h-4 rounded-[12px] text-xs px-[12px]`
      break
    case 'sm':
      sizeClasses = `h-5 rounded-[16px] text-sm px-[12px]`
      break
    case 'md':
      sizeClasses = `h-6 rounded-[18px] text-sm px-2`
      break
    case 'lg':
      sizeClasses = `h-7 rounded-[20px] text-base px-3`
      break
    default:
      break
  }

  return `${defaultClasses} ${themeClasses} ${sizeClasses}`
}

const getDisabledThemeClasses = (
  disabledTheme: ButtonDisabledTheme
): string => {
  switch (disabledTheme) {
    case 'secondary':
      return 'disabled:bg-transparent disabled:shadow-buttonInset--transparent disabled:text-white'
    case 'black':
      return 'disabled:bg-transparent disabled:shadow-buttonInset disabled:text-black'
    default:
      return 'disabled:text-gray-400 disabled:bg-transparent disabled:bg-none disabled:shadow-buttonInset--transparent disabled:border-0'
  }
}

export default Button
