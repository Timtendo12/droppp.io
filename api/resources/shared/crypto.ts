import { z } from 'zod'

export const networkTypeSchema = z.enum(['ETH', 'POLY'])

export type NetworkType = z.infer<typeof networkTypeSchema>
