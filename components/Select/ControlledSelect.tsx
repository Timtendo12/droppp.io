import React from 'react'
import Select, {
  SelectOption,
  ComparableSelectOption,
  ISelectOptions
} from './index'
import { Controller, ControllerProps } from 'react-hook-form'

interface IControlledSelect extends Omit<ControllerProps, 'render'> {
  searchable?: boolean
  disabled?: boolean
  options: SelectOption[]
  map?: (option: SelectOption) => ComparableSelectOption
  formProps?: {
    control: ControllerProps['control']
    name: ControllerProps['name']
    rules?: ControllerProps['rules']
  }
  selectorProps?: {
    defaultValue?: ISelectOptions['value']
    placeholder?: ISelectOptions['placeholder']
  }
}

const ControlledSelect = ({
  searchable = true,
  disabled = false,
  options,
  map,
  formProps,
  selectorProps
}: IControlledSelect) => {
  return (
    <Controller
      {...formProps}
      render={({ field: { onChange, value, ref } }) => (
        <Select
          inputRef={ref}
          searchable={searchable}
          disabled={disabled}
          onChange={option => {
            const value = !!map ? map(option) : option
            onChange(value)
          }}
          options={options}
          value={value}
          {...selectorProps}
        />
      )}
    />
  )
}

export default ControlledSelect
