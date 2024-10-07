import { RegisterOptions, Validate } from 'react-hook-form'

export const requiredField = (
  message = 'This field is required'
): RegisterOptions<{ [x: string]: string | number }, string> => {
  return { required: message }
}

type CustomValidationResult = Record<
  string,
  Validate<
    string | number,
    {
      [x: string]: string | number
    }
  >
>

export const isMinOrGreater = (
  min: number,
  message: string
): CustomValidationResult => {
  return {
    isAboveMinimum: val => Number(val) >= min || message
  }
}

export const isMaxOrLower = (
  max: number,
  message: string
): CustomValidationResult => {
  return {
    isBelowMaximum: val => Number(val) <= max || message
  }
}

export const isWithinRange = (
  min: number,
  max: number,
  message: string
): CustomValidationResult => {
  return {
    isBelowMaximum: val => {
      const input = Number(val)
      return (input <= max && input >= min) || message
    }
  }
}
