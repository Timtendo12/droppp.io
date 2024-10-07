import React from 'react'
import ControlledSelect from './ControlledSelect'
import Select from './'
import STATE_LIST from '@/constants/states.json'

interface Props {
  value?: any
  onChange?: (value) => void
  disabled?: boolean
  formProps?: any
  selectorProps?: any
}

export const StateSelector = ({
  value,
  onChange,
  disabled,
  formProps,
  selectorProps
}: Props) => {
  if (!formProps) {
    return (
      <Select
        placeholder="Select State"
        options={STATE_LIST}
        value={STATE_LIST.find(state => state.value === value)}
        onChange={({ value }) => onChange(value)}
        {...selectorProps}
      />
    )
  }

  return (
    // @ts-expect-error
    <ControlledSelect
      disabled={disabled}
      options={STATE_LIST}
      map={option => option.value}
      formProps={formProps}
      selectorProps={selectorProps}
    />
  )
}

export default StateSelector
