import { z } from 'zod'
import { successResponseSchema } from '@/api/resources/shared/success'
import { listingProfileSchema } from '@/api/resources/shared/listingProfile'

const catalogItemSalesHistoryGetInputSchema = z.object({
  data_id: z.string(),
  template_id: z.number().optional(),
  sort: z.string().optional(),
  page: z.string().optional(),
  limit: z.number().optional()
})

const salesHistoryItemSchema = z.object({
  data_id: z.number(),
  mint_num: z.number(),
  mint_count: z.number(),
  seller_user_id: z.number(),
  buyer_user_id: z.number(),
  status: z.number(),
  chain_asset_id: z.number(),
  time_purchased: z.string(),
  listing_price: z.number(),
  is_mine: z.boolean(),
  buyer: listingProfileSchema
})

const catalogItemPagedSalesHistorySchema = z.object({
  count: z.number(),
  more: z.boolean(),
  data: z.array(salesHistoryItemSchema)
})

const catalogItemSalesHistorySchema = z.array(salesHistoryItemSchema)

export const catalogItemPagedSalesHistoryGetResponseSchema =
  successResponseSchema.merge(catalogItemPagedSalesHistorySchema)

const salesHistorySchema = z.object({
  data: catalogItemSalesHistorySchema
})

export type CatalogItemSalesHistory = z.infer<typeof salesHistorySchema>

export type SalesHistoryItem = z.infer<typeof salesHistoryItemSchema>

export const catalogItemSalesHistoryGetResponseSchema =
  successResponseSchema.merge(salesHistorySchema)

export type CatalogItemSalesHistoryGetResponse = z.infer<
  typeof catalogItemSalesHistoryGetResponseSchema
>

export type CatalogItemSalesHistoryGetInput = z.infer<
  typeof catalogItemSalesHistoryGetInputSchema
>

export type CatalogItemPagedSalesHistoryGetResponse = z.infer<
  typeof catalogItemPagedSalesHistoryGetResponseSchema
>
