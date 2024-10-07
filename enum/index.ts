export const AUTH_TYPES = {
  LOGIN: 'login',
  SIGNUP: 'signup'
}

export const SIGNUP_TYPES = {
  APPLE: 'apple',
  GOOGLE: 'google',
  EMAIL: 'email'
}

export const ACTIVITY_TYPES = {
  ACCOUNT_CREATION: 'createaccount',
  PURCHASE: 'purchase',
  ACCOUNT_PURCHASE: 'purchaseaccount',
  TRANSFER_BATCH: 'transferbatch',
  REDEEM: 'redeem',
  PROMO_CLAIM: 'onboardpromo',
  TRANSFER_WAX: 'transfer',
  SALE: 'mktsale',
  MARKETPLACE_PURCHASE: 'mktpurchase',
  DEPOSIT: 'fundwallet',
  WITHDRAWAL: 'withdrawwallet'
}

export const MEDIA_TYPES = {
  VIDEO: 'v',
  IMAGE: 'p'
}

export const CARD_TYPES = {
  DEFAULT: 0,
  FREE: 1,
  CUSTOM: 2
}

export const STRIPE_CARD_TYPES = {
  CC: 'dropppPay',
  APPLE: 'applePay',
  GOOGLE: 'googlePay'
} as const

export const RARITY_STYLES_MAP = {
  Common: 'common',
  Uncommon: 'uncommon',
  Grail: 'grail',
  Legendary: 'legendary',
  Rare: 'rare',
  Epic: 'epic',
  Series: 'series',
  Royalty: 'royalty',
  Redeemable: 'redeemable',
  '1 of 1': 'oneOfOne',
  'Unique Webbian': 'uniqueWebbian'
}

export const RARITY_TYPES = {
  Common: 'Common',
  Uncommon: 'Uncommon',
  Mythic: 'Mythic',
  Grail: 'Grail',
  Legendary: 'Legendary',
  Rare: 'Rare',
  Epic: 'Epic',
  Ultra: 'Ultra',
  Series: 'Series',
  Royalty: 'Royalty',
  Redeemable: 'Redeemable',
  '1 of 1': '1 of 1',
  'Unique Webbian': 'Unique Webbian'
} as const

export const DIAMOND_RARITY_TYPES = [
  RARITY_TYPES.Mythic,
  RARITY_TYPES.Grail,
  RARITY_TYPES.Legendary,
  RARITY_TYPES.Ultra,
  RARITY_TYPES.Redeemable
]

export const RARITY_HALLELUJAH_TYPES = [
  RARITY_TYPES.Grail,
  RARITY_TYPES.Mythic,
  RARITY_TYPES.Ultra,
  RARITY_TYPES['1 of 1'],
  RARITY_TYPES.Legendary
]

export const RARITY_REDEEMABLE_TYPES = [
  RARITY_TYPES.Common,
  RARITY_TYPES.Uncommon,
  RARITY_TYPES.Rare,
  RARITY_TYPES.Epic,
  ...DIAMOND_RARITY_TYPES
]

export const RARITY_NON_REDEEMABLE_TYPES = [
  RARITY_TYPES['1 of 1'],
  RARITY_TYPES.Royalty,
  RARITY_TYPES.Series
]

export const NFT_TYPES = {
  ALL: 'All',
  ITEMS: 'Items',
  UNOPENED: 'Unopened'
} as const

export const DROP_TYPES = {
  MINI_AND_PROMO: 0,
  POST_REDEMPTION_DEADLINE: 1,
  POST_TOKEN: 2,
  PRE_TOKEN: 3
}

export const DROP_NO_LISTING_TYPES = {
  NO_LISTINGS: 0,
  NOT_FOR_SALE: 1,
  NOT_COLLECTED: 2,
  IN_CRATE: 3
}

export const NO_LISTING_MESSAGE_MAP = {
  [DROP_NO_LISTING_TYPES.NO_LISTINGS]: 'NO LISTINGS',
  [DROP_NO_LISTING_TYPES.NOT_FOR_SALE]: 'NOT FOR SALE',
  [DROP_NO_LISTING_TYPES.NOT_COLLECTED]: 'NOT COLLECTED',
  [DROP_NO_LISTING_TYPES.IN_CRATE]: 'IN CRATE'
}

export const DROP_HERO_TYPES = {
  STANDARD: 'standard',
  LANDING: 'layout'
}

export const ERROR_MESSAGES = {
  429: 'Too many requests',
  503: 'Service unavailable'
}

export const TRACKER_SECTION_IDS = {
  REDEMPTION_TOKENS: 1,
  PACKS: 2,
  COLLECTIBLES: 3,
  ROYALTY_SET: 4,
  REDEEMABLES: 5
}

export enum DropState {
  AnnounceLiteUltra = 'lite_ultra',
  AnnounceLiteMystery = 'lite_mystery',
  AnnounceFull = 'lite_pop',
  AnnounceFullCatalogEnabled = 'available',
  SaleContinued = 'sale_continued',
  SoldOut = 'sold_out',
  SaleEnded = 'ended'
}

export enum DynamicDropState {
  Announce = 1,
  PostPackSale = 2,
  PostTokenDrop = 3,
  PostRedemption = 4,
  PostShipping = 5
}
// export const BREAKPOINTS = {
//   MOBILE_PORTRAIT: 428,
//   MOBILE_LANDSCAPE: 926,
//   TABLET_PORTRAIT: 768,
//   TABLET_LANDSCAPE: 1024
// }
