import { IInputChildProps, InputType } from '.'

export const renderAsCurrency = (inputProps: IInputChildProps): InputType => {
  const { register, ...rest } = inputProps
  const prefix = inputProps.currency === 'usdc' ? null : <div>$</div>
  const info = inputProps.info || (
    <div className="text-gray-300 uppercase">{inputProps.currency}</div>
  )

  // disregard key inputs that are not numeric
  // this prevents the cursor from jumping around
  // when removing an invalid character
  const handleKeyDown = (event: KeyboardEvent) => {
    if (
      // is the modifier key not down
      !(event.shiftKey || event.metaKey || event.ctrlKey) &&
      // is this a single character entry
      event.key?.length === 1 &&
      // does it fail to match a numeric value
      // may need to reevaluate for international numeric types
      !/^[0-9\.\,]$/.test(event.key)
    ) {
      // want to ignore this
      event.stopPropagation()
      event.preventDefault()
    }
  }

  const handleBlur = (event: FocusEvent) => {
    register?.onBlur?.(event)
    inputProps.onBlur?.()
  }

  // ensure not using any NaN value
  let { value, defaultValue } = rest
  if (isNaN(value)) value = ''
  if (isNaN(defaultValue)) value = ''

  // If we are using the input with React Hook Form we don't want competing values - Josh Dobson - 9/28/23
  if (register) {
    delete rest.value
  }

  const input = (
    <input
      {...rest}
      {...register}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    />
  )

  return {
    input,
    prefix,
    info,

    // handles formatting values to be currency
    // TODO: we probably want something more robust eventually
    sanitize: (str: string) => {
      const formatted = str
        ?.toString()
        // strip non-numeric values
        .replace(/[^0-9\.\,]*/g, '')

        // don't allow too many decimals
        // find the first decimal, replace all decimals
        // with blank, and then return the trailing
        // numbers all at once (with a leading decimal)
        .replace(
          /\..*$/,
          match => `.${match.replace(/\./g, '').substring(0, 2)}`
        )

      // if it's only a decimal point, that's okay
      if (formatted === '.') {
        return formatted
      }

      // parse the number and make sure it's valid
      return isNaN(parseFloat(formatted)) ? '' : formatted
    }
  }
}
