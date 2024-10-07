import React from 'react'
import { useCountriesQuery } from '@/api/resources/countries/get'
import { CountriesResponse } from '@/api/resources/countries/get/schema'
import ControlledSelect from './ControlledSelect'
import Select from './'
import { ControllerProps } from 'react-hook-form'

interface Props {
  value?: string
  onChange?: (value) => void
  disabled?: boolean
  formProps?: {
    control: ControllerProps['control']
    name: ControllerProps['name']
    rules?: ControllerProps['rules']
  }
}

export const CountrySelector = ({
  value,
  onChange,
  disabled,
  formProps
}: Props) => {
  const { data } = useCountriesQuery<CountriesResponse>()
  const countries = data
    ? data.countries.map(({ id, name }) => ({
        value: id,
        label: name
      }))
    : []

  if (!formProps) {
    return (
      <Select
        placeholder="Select Country"
        options={countries}
        value={countries.find(country => country.value.toString() === value)}
        onChange={({ value }) => onChange(value)}
      />
    )
  }

  return (
    <ControlledSelect
      name={formProps.name}
      disabled={disabled}
      options={countries}
      map={option => option.value}
      formProps={formProps}
    />
  )
}

export default CountrySelector
