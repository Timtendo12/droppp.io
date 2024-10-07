import { z } from 'zod'
import { networkTypeSchema } from '@/api/resources/shared/crypto'

export const walletWithdrawalInputSchema = z.object({
  amount: z.number(),
  address: z.string(),
  chain: networkTypeSchema,
  code: z.string().optional(),
  currency: z.string().optional()
})

const walletHistorySchema = z.object({
  user_id: z.number(),
  user_wallet_id: z.number(),
  transaction_type: z.number(),
  tx_id: z.string(),
  amount: z.number(),
  marketplace_fee: z.number(),
  method: z.number(),
  status: z.number(),
  crypto_address: z.string(),
  circle_ref_id: z.string(),
  id: z.number()
})

const withdrawTransferSchema = z.object({
  transferId: z.string(),
  source: z.string(),
  dest: z.string(),
  fromWalletId: z.string(),
  toWalletId: z.string(),
  amount: z.number(),
  currency: z.string(),
  status: z.string()
})

const blockchainTransferSchema = z.object({
  transferId: z.string(),
  source: z.string(),
  dest: z.string(),
  chain: z.string(),
  fromWalletId: z.string(),
  amount: z.number(),
  currency: z.string(),
  status: z.string(),
  transactionHash: z.string().optional(),
  address: z.string()
})

export const walletWithdrawalSchema = z.object({
  walletHistory: walletHistorySchema.optional(),
  withdraw_transfer: withdrawTransferSchema.optional(),
  blockchain_transfer: blockchainTransferSchema.optional()
})

export const walletWithdrawalMfaStatusSchema = z.object({
  mfa_required: z.boolean().optional()
})

export const walletWithdrawalResponseSchema = walletWithdrawalSchema.extend({
  data: walletWithdrawalMfaStatusSchema.optional(),
  status: z.string().optional()
})

export type WalletHistory = z.infer<typeof walletHistorySchema>
export type WithdrawTransfer = z.infer<typeof withdrawTransferSchema>
export type BlockchainTransfer = z.infer<typeof blockchainTransferSchema>
export type WalletWithdrawal = z.infer<typeof walletWithdrawalSchema>

export type WalletWithdrawalMfaStatus = z.infer<
  typeof walletWithdrawalMfaStatusSchema
>
export type WalletWithdrawalResponse = z.infer<
  typeof walletWithdrawalResponseSchema
>

export type WalletWithdrawalInput = z.infer<typeof walletWithdrawalInputSchema>
