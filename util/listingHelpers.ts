import { formatUSDC } from './currencyHelpers'
import { roundToTwoDecimals } from './numberHelpers'

const MINIMUM_FEE = 0.01

export const calculateListingTotal = (
  value: number,
  marketplaceFeeAmount: number,
  blockchainFeeAmount: number,
  collectionFeeAmount: number
) => {
  const marketFeeTotal = value * (marketplaceFeeAmount / 100)
  const blockchainFeeTotal = value * (blockchainFeeAmount / 100)
  const collectionFeeTotal = value * (collectionFeeAmount / 100)
  const combinedFees = roundToTwoDecimals(
    marketFeeTotal + blockchainFeeTotal + collectionFeeTotal
  )

  const fee = Math.max(MINIMUM_FEE, combinedFees)
  const total = roundToTwoDecimals(value - fee) || 0

  return formatUSDC(total, 2, 2)
}
