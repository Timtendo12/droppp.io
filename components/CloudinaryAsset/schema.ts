import { z } from 'zod'

const imageSourceSchema = z.string().or(
  z.object({
    sm: z.string(),
    lg: z.string()
  })
)

const assetDimensions = z.number().or(
  z.object({
    sm: z.number(),
    lg: z.number()
  })
)

const cloudinaryAssetDimensions = z.object({
  // This we may want to extend into the drops schema - Josh Dobson
  maxWidth: assetDimensions.optional(),
  offset: assetDimensions.optional(),
  minWidth: assetDimensions.optional(),
  //
  width: assetDimensions.optional(),
  height: assetDimensions.optional()
})

export const cloudinaryImageSourceSchema = z.object({
  type: z.literal('image'),
  source: imageSourceSchema,
  alt: z.string(),
  dimensions: cloudinaryAssetDimensions.optional()
})

export const transparentVideoSourceSchema = z.object({
  type: z.literal('transparent-video'),
  safari: z.string(),
  webm: z.string(),
  alt: z.string(),
  fallbackImage: imageSourceSchema,
  dimensions: cloudinaryAssetDimensions.optional()
})

export const cloudinaryAssetDefinitionSchema = z.discriminatedUnion('type', [
  cloudinaryImageSourceSchema,
  transparentVideoSourceSchema
])

export type CloudinaryAssetDefinition = z.infer<
  typeof cloudinaryAssetDefinitionSchema
>
