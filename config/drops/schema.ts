import { z } from 'zod'
import {
  catalogOpenableItemSchema,
  catalogSchema,
  catalogStatsSchema
} from '@/api/resources/catalog/get/schema'
import { rarityEnum } from '@/api/resources/shared/rarity'
import { cloudinaryAssetDefinitionSchema } from '@/components/CloudinaryAsset/schema'
import { DataType } from 'csstype'
import { catalogItemStatsSchema } from '@/api/resources/catalog/item/get/schema'

export const openableTypeEnum = z.enum([
  'standard',
  'premium',
  'mythic',
  'mini',
  'promo',
  'pfp',
  'mega'
])

export const aboutSectionSchema = z.object({
  title: z.string(),
  copy: z.string(),
  url: z.string(),
  finePrint: z.string(),
  finePrintUrl: z.string()
})

export const dropStateEnum = z.enum([
  'lite_ultra',
  'lite_mystery',
  'lite_pop',
  'available',
  'sale_continued',
  'sold_out',
  'ended'
])

export const assetIDSchema = z.object({
  prod: z.number(),
  dev: z.number()
})

export const heroLogoSchema = z.object({
  id: z.string(),
  height: z.number(),
  width: z.number()
})

export const popSectionImgSchema = z.object({
  id: z.string(),
  height: z.number(),
  width: z.number()
})

export const heroGradientSchema = z.object({
  stop1: z.string(),
  stop2: z.string(),
  opacity: z.string(),
  heightPercent: z.string(),
  blendMode: z.custom<DataType.BlendMode>()
})

export const ogSchema = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.string().optional(),
  image: z.string().optional()
})

export const metaSchema = z.object({
  title: z.string(),
  description: z.string(),
  og: ogSchema,
  keywords: z.string().optional(),
  image: z.string().optional()
})

export const oneOfOneSchema = z.object({
  carouselSlides: z.array(z.array(z.string())),
  title: z.string(),
  copy1: z.string(),
  copy2: z.string()
})

export const statsSchema = z.object({
  redemptions: z.string(),
  grails: z.string(),
  legendaries: z.string(),
  royalties: z.string()
})

export const cardsFanSchema = z.object({
  cards: z.array(z.string())
})

export const openableElementSchema = z.object({
  img: z.string(),
  name: z.string(),
  price: z.number(),
  numMinted: z.string(),
  atomichub_url: z.string(),
  type: openableTypeEnum
})

export const mergedOpenableElementSchema = openableElementSchema.merge(
  catalogOpenableItemSchema.omit({
    total: true,
    media: true
  })
)

export const sliderSchema = z.object({
  img: z.string(),
  title: z.string(),
  joined: z.string(),
  stats: statsSchema
})

export const mergedOpenablesSchema = z.object({
  media: z.object({
    id: z.string(),
    type: z.string()
  }),
  territoryRestrictions: z.string(),
  items: z.array(mergedOpenableElementSchema)
})

export const dropConfigOpenablesSchema = z.object({
  media: z.object({
    id: z.string(),
    type: z.string()
  }),
  territoryRestrictions: z.string(),
  items: z.array(openableElementSchema)
})

export const popFeature = z.enum([
  'glowInTheDark',
  'uniqueSize',
  'rare',
  'guarantee'
])

export const popSchema = z.object({
  name: z.string(),
  style: z.string(),
  type: rarityEnum,
  available: z.string(),
  chance: z.string().optional().nullable(),
  bg: z.string(),
  video: z.string(),
  smallImg: z.string(),
  largeImg: z.string(),
  features: z.array(popFeature).optional()
})

export type PopSchema = z.infer<typeof popSchema>

export const dropConfigSchema = z.object({
  id: z.number(),
  cloudinaryFolder: z.string(),
  dropType: z.string(),
  asset_id: assetIDSchema.nullable(),
  type: z.string(),
  mockName: z.string(),
  meta: metaSchema,
  dropHeaderSubtitle: z.string(),
  urlName: z.string(),
  url: z.string(),
  time_announce: z.string().optional(),
  time_launch: z.string().optional(),
  redeem_start_date: z.string().optional().nullable(),
  redeem_end_date: z.string().optional().nullable(),
  estimated_ship_target: z.string().optional().nullable(),
  heroGradient: z
    .object({
      desktop: heroGradientSchema,
      mobile: heroGradientSchema
    })
    .optional(),
  heroBg: z.string(),
  heroBgQuality: z.number().min(0).max(100).optional(),
  postDropHeroBg: z.string().optional(),
  figures: z
    .object({
      quality: z.number().min(0).max(100).optional(),
      blade: cloudinaryAssetDefinitionSchema,
      overview: cloudinaryAssetDefinitionSchema.optional()
    })
    .optional(),
  heroFigures: z.string().optional(),
  heroFiguresMobile: z.string().optional(),
  heroLogo: heroLogoSchema,
  heroLogoAlt: heroLogoSchema.optional(),
  heroLogo2: heroLogoSchema.optional(),
  cardBg: z.string(),
  cardBgSmall: z.string().optional().nullable(),
  cardLogo: z.string(),
  popSectionImg: popSectionImgSchema,
  state: dropStateEnum,
  duration_in_seconds: z.number(),
  legal: z.string(),
  restrictions: z.string(),
  mainCopy: z.string(),
  externalCollectionUrl: z.string().nullable(),
  by: z.string(),
  twitterUrl: z.string(),
  discordUrl: z.string(),
  atomichub_url: z.string(),
  cardsFan: cardsFanSchema.optional(),
  openables: dropConfigOpenablesSchema,
  dropHeroComponent: z.string(),
  dropLandingHeroComponent: z.string(),
  dropContentComponent: z.string(),
  aboutSection: aboutSectionSchema.optional(),
  slider: z.array(sliderSchema).optional(),
  oneofone: oneOfOneSchema.optional(),
  showRestricted: z.boolean().optional(),
  buttonClass: z.string().optional(),
  description: z.string().optional(),
  shouldSkipBuild: z.boolean().optional(),
  isPfp: z.boolean().optional(),
  exclusive: z.boolean().optional(),
  theme: z.enum(['light', 'dark']).optional(),
  physicalCollectibles: z
    .object({
      physicalCollectiblesName: z.string(),
      pops: z.array(popSchema)
    })
    .optional(),
  hasPhysicals: z.boolean(),
  additionalRarities: z.array(rarityEnum).optional()
})

const dropStatsSchema = catalogItemStatsSchema.merge(catalogStatsSchema)

const mergedDropSchema = dropConfigSchema
  .merge(catalogSchema.omit({ openable: true }))
  .merge(z.object({ openables: mergedOpenablesSchema }))
  .merge(z.object({ stats: dropStatsSchema }))

export type HeroGradient = z.infer<typeof heroGradientSchema>
export type MergedDrop = z.infer<typeof mergedDropSchema>
export type MergedPackElement = z.infer<typeof mergedOpenablesSchema>
export type DropConfig = z.infer<typeof dropConfigSchema>
export type OpenableType = z.infer<typeof openableTypeEnum>
export type Openable = z.infer<typeof openableElementSchema>
export type MergedOpenable = z.infer<typeof mergedOpenableElementSchema>
export type Meta = z.infer<typeof metaSchema>
export type DropState = z.infer<typeof dropStateEnum>
export type PopFeature = z.infer<typeof popFeature>
