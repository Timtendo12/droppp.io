export const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(value)

export function formatCurrency(
  price: number,
  showSymbol = true,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
  notation: Intl.NumberFormatOptions['notation'] = 'standard',
  hideDecimalsWhenZero = false
) {
  let result = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits,
    maximumFractionDigits,
    notation: notation
  }).format(price)

  if (hideDecimalsWhenZero) {
    const parts = result.split('.')
    result = parts[1] === '00' ? parts[0] : result
  }

  // removes the $
  if (!showSymbol) {
    result = result.replace('$', '').trim()
  }
  return result
}

export function formatUSDC(
  price: number = 0,
  minimumFractionDigits = 2,
  maximumFractionDigits = 8,
  notation: Intl.NumberFormatOptions['notation'] = 'standard'
) {
  return formatCurrency(
    price,
    false,
    minimumFractionDigits,
    maximumFractionDigits,
    notation
  )
}

export const dollarsToCents = (amount: number) => {
  return Math.round(100 * amount)
}

export function formatWAXP(price) {
  return new Intl.NumberFormat('en-US', {
    minimumSignificantDigits: 8
  }).format(price)
}

export const getPriceStringFromCents = (value, hideDecimalsWhenZero = false) =>
  formatCurrency(value / 100, true, 2, 2, 'standard', hideDecimalsWhenZero)
