const pluralizer = require('pluralize')
import { emailRegex } from '@/constants'
import { match } from '@/util/regexHelpers'

export const appendPlusAfterMaxValue = (val: number, max: number): string => {
  return val <= max ? `${val}` : `${max}+`
}

export function validateEmail(email) {
  return emailRegex.test(email)
}

export function pluralize(value: string, count: number) {
  return pluralizer(value, count)
}

export const extractValuesInDelimitedString = (
  values: string,
  delimiter: string = ','
): string[] => {
  const regex = new RegExp(`(?:[^${delimiter}]+(?:s+[^${delimiter}]+)*)+`, 'g')
  const matches = match(values, regex)
  return matches.map(match => match[0].trim())
}
