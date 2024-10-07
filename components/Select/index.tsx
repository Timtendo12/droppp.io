import { ReactNode, useEffect, useState } from 'react'
import RSelect, { components } from 'react-select'
import { RefCallBack } from 'react-hook-form'

// components
import Icon from '@/components/Icon'
import BrowserSelect from '@/components/BrowserSelect'
import { supportsTouchEvents } from '@/util/browserHelpers'
import { classNames } from '@/util/tailwindHelpers'
const { Option } = components

export interface ComparableSelectOption {
  value: any
}

export type SelectOption = {
  label: ReactNode
} & ComparableSelectOption

export interface ISelectOptions {
  id?: string
  searchable?: boolean
  disabled?: boolean
  inputRef?: RefCallBack
  value?: any
  placeholder?: string
  options: SelectOption[]
  onChange: (option: SelectOption) => void
}

export const selectWrapperClass = (focused: boolean) => {
  return classNames(
    'relative overflow-hidden h-6 min-w-[188px] px-1 !rounded-2xl !shadow-none !cursor-pointer !bg-gray-800 border-1 !border-gray-700',
    {
      'border-gray-300': focused
    }
  )
}

const selectorClasses = (disabled: boolean) => {
  return {
    input: () => 'flex items-center !text-gray-300',
    control: state => selectWrapperClass(state.isFocused),
    singleValue: () =>
      classNames('!flex items-center utility-alt !text-white', {
        '!text-gray-300': disabled
      }),
    indicatorsContainer: () => classNames({ '!hidden': disabled }),
    indicatorSeparator: () => '!hidden',
    menu: () => '!rounded-2xl border border-defaultBorder !bg-gray-850',
    menuList: () => '!p-[12px]',
    menuPortal: () => `z-select`,
    placeholder: () => '!text-gray-300',
    option: state =>
      `!flex items-center h-5 !p-1 !cursor-pointer rounded-xl !bg-${
        state.isSelected
          ? 'gray-700'
          : state.isFocused
          ? 'gray-800'
          : 'transparent'
      }`
  }
}

const ReactSelect = ({
  onChange,
  id,
  options,
  searchable = true,
  disabled = false,
  placeholder = 'Select',
  value,
  ...selectorProps
}: ISelectOptions) => {
  const [portal, setPortal] = useState(null)

  useEffect(() => {
    setPortal(document.body)
  }, [])

  // find the current selection
  const selectedValue =
    options.find(
      option =>
        option.value === value ||
        option === value ||
        option.value === value?.value
    ) || -1

  return (
    <RSelect
      inputId={id}
      classNames={selectorClasses(disabled)}
      placeholder={placeholder}
      isSearchable={searchable}
      isDisabled={disabled}
      isMulti={false}
      components={{ Option: DefaultOption }}
      options={options}
      value={selectedValue}
      onChange={option => option != -1 && onChange(option as SelectOption)}
      menuPortalTarget={portal}
      {...selectorProps}
    />
  )
}

// a basic dropdown list option
// NOTE: we might allow them to provide their own eventually
const DefaultOption = props => (
  <Option {...props}>
    <span className="utility-alt text-white">{props.label}</span>
    {props.isSelected && <Icon className="ml-auto" name="check" />}
  </Option>
)

const Select = (props: ISelectOptions) => {
  if (supportsTouchEvents()) {
    return <BrowserSelect {...props} />
  }

  return <ReactSelect {...props} />
}

export default Select
