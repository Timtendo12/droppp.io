import { isString } from 'lodash'
import { FieldErrors, FieldValues } from 'react-hook-form'
import { Country } from '@/api/resources/countries/get/schema'
import { State } from '@/api/resources/states/get/schema'

////////////////////////////////////////////////////////////////////////////////
// Enums & Types

export enum RegionType {
  Country = 'country',
  State = 'state'
}

export enum RegionRestrictionType { // Keys map to API responses (so they're lowercase)
  sanctioned = 'sanctioned',
  unsupported = 'unsupported'
}

enum DefaultText {
  Name = 'your location',
  Type = 'region',
  Title = 'Unsupported Region'
}

export type RegionRestrictionError = {
  type: RegionRestrictionType
  title: string
  message: string
}

type RegionInfo = {
  name: string
  type: RegionType
}

////////////////////////////////////////////////////////////////////////////////
// Helper Function

const regionRestrictionErrorFormatter = (
  errors: FieldErrors<FieldValues>,
  country?: Country,
  state?: State
): RegionRestrictionError | undefined => {
  if (!country) return undefined

  const [regionType, regionName, message] =
    errors.state?.message && state
      ? [RegionType.State, state.name, errors.state?.message]
      : [RegionType.Country, country.name, errors.country?.message]

  const regionRestrictionType: RegionRestrictionType =
    RegionRestrictionType[message as string]

  // If unable to create region restriction type from msg exit & return undefined because no error found.
  if (!regionRestrictionType && !isString(message)) return undefined

  const region = {
    name: regionName || DefaultText.Name,
    type: regionType || DefaultText.Type
  } as RegionInfo

  const errorContext = ErrorMessages[regionRestrictionType]

  return {
    type: regionRestrictionType,
    title: ErrorMessages.title,
    message: errorContext
      ? errorContext(region)
      : ErrorMessages[RegionRestrictionType.unsupported](region)
  }
}

////////////////////////////////////////////////////////////////////////////////
// Content

const ErrorMessages = {
  // Identity Verification /////////////////////////////////////////////////////
  title: 'You Cannot Proceed With Identity Verification',
  [RegionRestrictionType.unsupported]: (region: RegionInfo) =>
    `Due to current regulations in ${region.name}, you will not able to perform identity verification. Until the regulations change, you will not be able to buy and sell on the Droppp Marketplace. An announcement will be made as new regions are supported.`,
  [RegionRestrictionType.sanctioned]: (region: RegionInfo) =>
    `Unfortunately ${region.name} is not a country that we support on Droppp.`
}

////////////////////////////////////////////////////////////////////////////////
// Export: Default

export default regionRestrictionErrorFormatter
