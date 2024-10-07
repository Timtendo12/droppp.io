import { z } from 'zod'

export const mediaNameEnum = z.enum(['img', 'backimg', 'video'])
export const mediaTypeEnum = z.enum(['p', 'v'])

export const sizeZeroMedia = z.object({
  name: mediaNameEnum.optional(),
  size0_url: z.string(),
  size0_width: z.number().optional(),
  size0_height: z.number().optional(),
  size0_type: mediaTypeEnum
})

export const mediaItemSchema = z
  .object({
    size1_url: z.string(),
    size2_url: z.string(),
    size3_url: z.string(),
    size4_url: z.string(),
    size1_width: z.number().optional(),
    size2_width: z.number().optional(),
    size3_width: z.number().optional(),
    size4_width: z.number().optional(),
    size1_height: z.number().optional(),
    size2_height: z.number().optional(),
    size3_height: z.number().optional(),
    size4_height: z.number().optional(),
    size1_type: mediaTypeEnum,
    size2_type: mediaTypeEnum,
    size3_type: mediaTypeEnum,
    size4_type: mediaTypeEnum
  })
  .merge(sizeZeroMedia)

export type MediaItem = z.infer<typeof mediaItemSchema>
export type SizeZeroMedia = z.infer<typeof sizeZeroMedia>
