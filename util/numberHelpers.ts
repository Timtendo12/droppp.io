export const transformNumbersToRange = (value, min, max, newMin, newMax) => {
  return ((value - min) / (max - min)) * (newMax - newMin) + newMin
}

export const formatNumber = (
  value: number,
  minimumFractionDigits: number = 2
) => new Intl.NumberFormat('en-US', { minimumFractionDigits }).format(value)

export const formatNumberNearestThousand = (value: number) => {
  if (value > 1000) {
    return `${Math.round(value / 1000)}K`
  } else {
    return value
  }
}

export const transformNumberToCompact = (
  value: number,
  minimumFractionDigits: number = 0,
  maximumFractionDigits: number = 2
) =>
  new Intl.NumberFormat('en-US', {
    notation: 'compact',
    minimumFractionDigits,
    maximumFractionDigits
  }).format(value)

export function numberWithCommas(x) {
  const parts = x?.toString().split('.')
  if (!parts?.length) {
    return x
  }

  const numberPart = parts[0]
  const decimalPart = parts[1]

  return (
    numberPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
    (decimalPart ? `.${decimalPart}` : '')
  )
}

export var transformRange = (value, r1, r2) => {
  var scale = (r2.max - r2.min) / (r1.max - r1.min)
  return (value - r1.min) * scale + r2.min
}

export const clampNumber = (num, min, max) => Math.min(Math.max(num, min), max)

export const roundUp = (number: number, precision: number = 2): number => {
  const factor = Math.pow(10, precision)
  return Math.ceil(number * factor) / factor
}

export const roundToTwoDecimals = (value: number) => {
  return Number(`${Math.round(Number(`${value}e2`))}e-2`)
}

export const parseNumber = (numVal: unknown): number | null =>
  numVal && !Number.isNaN(Number(numVal)) ? Number(numVal) : null
