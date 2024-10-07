import {
  DefaultRegionValues,
  StateSelection,
  CountrySelection
} from '@/components/RegionFormField'
import { Country } from '@/api/resources/countries/get/schema'
import { State } from '@/api/resources/states/get/schema'
import { RegionInfo } from '@/storage/interface'
import { identifiableArrayToMap, valueInMap } from './mapHelpers'
import { getCountries } from '@/api/resources/countries/get'
import { getStates } from '@/api/resources/states/get'

// Builds a region object from the country and state selections
export const setupRegionData = (
  country: CountrySelection,
  state: StateSelection
): RegionInfo => {
  return {
    country: country?.value,
    state: country.needsRegionRefinement && state?.value ? state.value : null
  }
}

// Grabs the country from the map of countries and returns a CountrySelection object
export const handleOptionCountry = (
  optionValue: Number,
  countries: Map<number, Country>
): CountrySelection => {
  const country = valueInMap(optionValue, countries)
  return country
    ? {
        country: country,
        needsRegionRefinement: countryRequiresRegionRefinement(country),
        value: country.id
      }
    : null
}

// Grabs the state from the map of states and returns a StateSelection object
export const handleOptionState = (
  optionValue: number,
  states: Map<number, State>
): StateSelection => {
  const state = valueInMap(optionValue, states)
  return state ? { value: optionValue, ...state } : null
}

// Used to build a region object from the region info stored in Local Storage
export const getRegionValues = async (
  regionInfo: RegionInfo
): Promise<DefaultRegionValues> => {
  const regionVals: DefaultRegionValues = { country: undefined }
  regionVals.country = await getCountries()
    .then(({ countries }) =>
      handleOptionCountry(
        regionInfo?.country,
        identifiableArrayToMap(countries)
      )
    )
    .catch(e => handlePromiseError(e))
  if (regionVals.country?.needsRegionRefinement) {
    regionVals.state = await getStates(regionVals.country.country.id)
      .then(({ states }) =>
        handleOptionState(regionInfo?.state, identifiableArrayToMap(states))
      )
      .catch(e => handlePromiseError(e))
  }
  return { ...regionVals }
}

// Checks if a country needs region refinement (ie. asking for a state in a country). ONLY USA REQUIRES THIS.
export const countryRequiresRegionRefinement = (country?: Country): boolean =>
  country?.id == 1

const handlePromiseError = (error: Error) => {
  // eslint-disable-next-line no-console
  console.error(error)
  return null
}
