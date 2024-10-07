import { ReactNode, useState } from 'react'
import Icon from '@/components/Icon'
import { classNames } from '@/util/tailwindHelpers'
import { selectWrapperClass } from '@/components/Select'

const getOptionByValue = (options, value) =>
  options.find(
    option =>
      option.value == value || option == value || option.value == value?.value
  )

export interface ComparableSelectOption {
  value: any
}

export type SelectOption = {
  label: ReactNode
} & ComparableSelectOption

interface ISelectOptions {
  disabled?: boolean
  value?: any
  options: SelectOption[]
  placeholder?: string
  onChange: (value: any) => void
}

const BrowserSelect = ({
  disabled,
  value,
  options,
  placeholder = 'Select',
  onChange
}: ISelectOptions) => {
  const [focused, setFocused] = useState(false)
  const selectedOption = getOptionByValue(options, value)

  return (
    <div className={selectWrapperClass(focused)}>
      <select
        disabled={disabled}
        className="absolute inset-0 cursor-pointer bg-transparent"
        value={selectedOption?.value}
        onChange={e => onChange(getOptionByValue(options, e.target.value))}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        <option disabled selected>
          {placeholder}
        </option>
        {options.map((item, k) => (
          <option key={k} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-0 flex items-center pointer-events-none px-2 bg-gray-800">
        <div
          className={classNames('utility-alt text-white', {
            '!text-gray-300': !selectedOption || disabled
          })}
        >
          {selectedOption?.label || placeholder}
        </div>
        {!disabled && <Icon className="ml-auto" name="chevron" />}
      </div>
    </div>
  )
}

export default BrowserSelect
