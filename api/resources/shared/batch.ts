import { z } from 'zod'

export const batchSchema = z.object({
  batch_id: z.number().optional(),
  chain_status: z.number(),
  chain_tx: z.string(),
  count: z.number(),
  network_type: z.string(),
  tx_url: z.string(),
  from_account: z.string().optional(),
  to_account: z.string().optional()
})

export type BatchItem = z.infer<typeof batchSchema>
