import { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
// Helpers & Hooks
import useStates from '@/hooks/useStates'
import useCountries from '@/hooks/useCountries'
import { buildSelectOptions } from './Select/optionBuilder'
import {
  handleOptionCountry,
  handleOptionState
} from '@/util/regionInfoHelpers'
// API
import { Country } from '@/api/resources/countries/get/schema'
import { State } from '@/api/resources/states/get/schema'
// Components
import ControlledSelect from './Select/ControlledSelect'
import { ComparableSelectOption } from './Select'
import Field from './Field'

// Enums, Types & Interfaces /////////////////////////////////////////////////

export enum VerifyInputs {
  country = 'country',
  state = 'state'
}

type Form = Pick<UseFormReturn, 'watch' | 'control' | 'setValue' | 'trigger'>

export type CountrySelection = {
  country: Country
  needsRegionRefinement: boolean
} & ComparableSelectOption

interface Inputs {
  country: string
  state: string
}

export interface StateSelection extends State {
  value: number
}

export interface DefaultRegionValues {
  country: CountrySelection | undefined
  state?: StateSelection | undefined
}

interface Props extends Form {
  inputs: Inputs
  defaultValues?: DefaultRegionValues
}

// Component ///////////////////////////////////////////////////////////////////

const RegionFormField = ({
  inputs,
  watch,
  control,
  trigger,
  setValue,
  defaultValues
}: Props) => {
  const [defaults, setDefaults] = useState<DefaultRegionValues>(defaultValues)
  const [initialized, setInitialized] = useState<boolean>(false)

  const countries = useCountries()
  const countrySelection: CountrySelection = watch(inputs.country)
  const states = useStatesEnabledByCountry(countrySelection)

  const hasStates =
    countrySelection?.needsRegionRefinement ||
    (!initialized && !!defaults?.state)

  useEffect(() => {
    if (countrySelection && !initialized) {
      setInitialized(true)
      setValue(inputs.state, defaults.state)
    }
    trigger()
  }, [countrySelection])

  useEffect(() => {
    setDefaults(defaultValues)
  }, [defaultValues])

  const stateClass = `mb-2 ${!hasStates && 'hidden'}`

  return (
    <>
      <Field name={inputs.country} label="Country" className="mb-2">
        <ControlledSelect
          name={inputs.country}
          options={buildSelectOptions(countries)}
          map={option => handleOptionCountry(option.value, countries)}
          formProps={{
            name: inputs.country,
            control,
            rules: {
              required: true,
              validate: { checkCountry: handleCheckCountry }
            }
          }}
          selectorProps={{
            defaultValue: defaults?.country
          }}
        />
      </Field>
      <Field name={inputs.state} label="State" className={stateClass}>
        <ControlledSelect
          name={inputs.state}
          options={buildSelectOptions(states)}
          map={option => handleOptionState(option.value, states)}
          formProps={{
            name: inputs.state,
            control,
            rules: {
              required: hasStates,
              validate: {
                checkState: state => handleCheckState(state, countrySelection)
              }
            }
          }}
          selectorProps={{
            defaultValue: defaults?.state
          }}
        />
      </Field>
    </>
  )
}

// Helpers /////////////////////////////////////////////////////////////////////

const handleCheckCountry = ({
  country
}: CountrySelection): string | undefined => {
  return (
    (country?.marketplace_restriction &&
      country?.marketplace_restriction_reason) ||
    undefined
  )
}

const handleCheckState = (
  state: State,
  countrySelection: CountrySelection
): string | boolean => {
  return (
    (countrySelection?.needsRegionRefinement &&
      state?.marketplace_restriction &&
      state?.marketplace_restriction_reason) ||
    true
  )
}

export const useStatesEnabledByCountry = (
  countrySelection?: CountrySelection
): Map<number, State> | undefined => {
  const shouldReturnStates =
    !!countrySelection?.country && countrySelection?.needsRegionRefinement
  const states = useStates(countrySelection?.country, {
    enabled: shouldReturnStates
  })
  return !shouldReturnStates ? undefined : states
}

// Export /////////////////////////////////////////////////////////////////////

export default RegionFormField
