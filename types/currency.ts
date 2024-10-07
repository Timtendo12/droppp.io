import { z } from 'zod'

export const currencyFormat = z.enum(['usdc', 'usd'])

export type CurrencyFormat = z.infer<typeof currencyFormat>
