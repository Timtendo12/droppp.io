import React, {
  FormEvent,
  KeyboardEvent,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState
} from 'react'
import classNames from 'classnames'

// components
import ErrorIndicator from './ErrorIndicator'

// render functions
import { renderAsCurrency } from './AsCurrency'
import { renderAsDefault } from './AsDefault'
import { renderAsTextarea } from './AsTextarea'
import { renderAsContentEditable } from './AsContentEditable'
import { selectContent } from '@/util/browserHelpers'

// valid types of input fields
export type InputFormats =
  | 'default'
  | 'currency:usd'
  | 'textarea'
  | 'contenteditable'
import { CurrencyFormat } from '@/types/currency'
import { FieldValues, UseFormRegister } from 'react-hook-form'

// types/interfaces
export interface IInputChildProps {
  [prop: string]: any
}

// optional sanitization function for inputs
export type SanitizeInputFunction = (input: string) => string
export type FilterInputFunction = (input: string) => boolean

export type InputType = {
  prefix?: ReactNode
  info?: ReactNode
  input: ReactElement<HTMLInputElement>
  sanitize?: SanitizeInputFunction
}

interface IInputProps {
  disabled?: boolean
  hasError?: boolean
  className?: string
  inputClassName?: string
  prefix?: ReactNode | string | any
  info?: ReactNode | string | any
  filter?: (input: string) => boolean
  onChange?: (value: string) => void
  onCommit?: (value: string) => void
  onBlur?: (value: string) => void
  onFocus?: (value: string) => void
  sanitize?: SanitizeInputFunction
  defaultValue?: string
  selectOnClick?: boolean
  autoFocus?: boolean
  max?: number
  register?: UseFormRegister<FieldValues>
  [prop: string]: any
}

interface ICurrencyProps extends IInputProps {
  format: 'currency'
  currency: CurrencyFormat
}

interface IContentEditableProps extends IInputProps {
  format: 'contenteditable'
}

interface IDefaultProps extends IInputProps {
  format?: 'default'
  info?: ReactNode | string | any
}

interface ITextAreaProps extends IInputProps {
  format: 'textarea'
  rows?: number
}

// generic input component
const Input = ({
  forwardedRef,
  className,
  inputClassName,
  hasError,
  selectOnClick = true,
  autoFocus = false,
  max,
  filter,
  sanitize,
  format = 'default',
  currency,
  register,
  disabled,
  onChange,
  onCommit,
  onBlur,
  onFocus,
  ...rest
}: IDefaultProps | ITextAreaProps | ICurrencyProps | IContentEditableProps) => {
  const ref = useRef<HTMLInputElement | null>(null)
  const defaultValue = rest.defaultValue || rest.value || ''
  const [value, setValue] = useState(defaultValue)

  let { prefix, info } = rest
  let compose = {
    prefix,
    info,
    sanitize,
    input: null as ReactNode
  }

  // auto focus, if needed
  useEffect(() => {
    if (autoFocus) {
      // needs to wait just a moment before
      // trying to select the input
      setTimeout(() => selectContent(ref.current))
    }
  }, [])

  // maintain the default
  useEffect(() => {
    const currentRef = ref.current
    const value = 'value' in rest ? rest.value : defaultValue
    setValue(value)

    // keep content editable
    if (format === 'contenteditable' && ref.current) {
      currentRef.textContent = value

      // make sure to sanitize content when pasting into a contenteditable container
      const convertToPlainText = event => {
        event.preventDefault()

        // try and replace content with plain text
        const text = event.clipboardData.getData('text/plain')
        document.execCommand('insertHTML', false, text)
      }

      // for content editable, make sure to clear pasted text
      currentRef.addEventListener('paste', convertToPlainText)
      return () => currentRef?.removeEventListener('paste', convertToPlainText)
    }
  }, [defaultValue, rest.value])

  // used to focus the element when the parent is clicked
  function handleSelectInput() {
    ref.current?.focus()

    // highlight the current selection, if needed
    if (selectOnClick) {
      selectContent(ref.current)
    }
  }

  // handle committing the value
  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    // only check for single characters since things like arrow keys
    // will show up as the key "ArrowLeft", etc. We may need to
    // evaluate this over time since it's possible this might
    // not be enough to really be sure something is being
    const isCharacterInput =
      event.key?.length === 1 && !(event.ctrlKey || event.metaKey)

    // check if this should be filtered out
    if (filter && isCharacterInput && filter(event.key)) {
      cancelEvent(event)
      return
    }

    // check if exceeding the length
    if (max && isCharacterInput && value.length === max) {
      cancelEvent(event)
      return
    }

    // check if committing the input
    if (/enter/i.test(event.key) && onCommit) {
      cancelEvent(event)
      onCommit(value)
    }
  }

  // lost focus
  function handleBlur() {
    // includes a sanitization function
    let _value = value
    if (compose.sanitize) {
      _value = compose.sanitize(value)
    }
    onBlur?.(_value)
  }

  // gained focus
  function handleFocus() {
    onFocus?.(value)
  }

  // had input changes
  function handleInput(event: FormEvent<HTMLFormElement>) {
    let current: string | null
    if (format === 'contenteditable') {
      current = event.currentTarget.textContent
    } else {
      current = event.currentTarget.value
    }

    if (current === null) {
      current = ''
    }

    // sanitize as needed
    current = compose.sanitize ? compose.sanitize(current) : current

    setValue(current)
    onChange?.(current)
  }

  useEffect(() => {
    if (forwardedRef) {
      forwardedRef.current = ref.current
    }
  }, [forwardedRef])

  // child input element props
  const inputProps = {
    ...rest,
    register,
    ref,
    value,
    className: `h-full w-full bg-transparent placeholder-gray-300 outline-none appearance-none resize-none mr-[5px] autofill:mr-[5px] ${inputClassName}`,
    disabled,
    currency,
    onInput: handleInput,
    onKeyDown: handleKeyDown,
    onBlur: handleBlur,
    onFocus: handleFocus
  }

  // determine the type of component to render
  switch (format) {
    case 'currency':
      compose = { ...compose, ...renderAsCurrency(inputProps) }
      break
    case 'textarea':
      compose = { ...compose, ...renderAsTextarea(inputProps) }
      break
    case 'contenteditable':
      compose = { ...compose, ...renderAsContentEditable(inputProps) }
      break

    // all other input types
    default:
      compose = { ...compose, ...renderAsDefault(inputProps) }
  }

  // content editable is limited in how much styling is added
  if (format === 'contenteditable') {
    return (
      <div className={className} onClick={handleSelectInput}>
        {compose.prefix}
        {compose.input}
        {compose.info}
      </div>
    )
  }

  // check for errors
  if (hasError) {
    compose.info = <ErrorIndicator after={compose.info} />
  }

  // create the main input
  const inputBg = 'var(--inputBg, var(--color-gray-800))'
  const inputClasses = classNames(
    'flex gap-1 rounded-2xl border pl-2 pr-1 h-[48px] items-center text-base text-white focus-within:border-gray-300',
    !hasError && 'border-gray-700',
    hasError && 'border-error focus-within:border-error',
    disabled && 'opacity-50',
    {
      'grid-cols-[auto_1fr_auto]': compose.prefix && compose.info,
      'grid-cols-[auto_1fr]': compose.prefix && !compose.info,
      'grid-cols-[1fr_auto]': !compose.prefix && compose.info,
      'h-10 py-[12px]': format === 'textarea'
    },
    className
  )

  return (
    <div
      className={inputClasses}
      onClick={handleSelectInput}
      style={{ backgroundColor: inputBg }}
    >
      {compose.prefix && (
        <div className="whitespace-nowrap">{compose.prefix}</div>
      )}
      {compose.input}
      {compose.info && <div className="whitespace-nowrap">{compose.info}</div>}
    </div>
  )
}

function cancelEvent(event) {
  event.preventDefault()
  event.stopPropagation()
}

export default React.forwardRef<
  HTMLDivElement,
  IDefaultProps | ITextAreaProps | ICurrencyProps | IContentEditableProps
>((props, ref) => <Input forwardedRef={ref} {...props} />)
