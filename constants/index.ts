import { Rarity } from '@/api/resources/shared/rarity'
import { Icons } from '@/components/Icon'
import { Promotion } from '@/contexts/auth/types'
import { isMpEnabled } from '@/util'
import { DateFormatter, dateToMoment } from '@/util/time'
import { formattedPacificDate } from '@/util/time/pt'
import { HrefLinkDefinition } from '@/types/links'

const MONSTER_PROMO_START = '2023-10-05 07:00:00' // UTC
const MONSTER_PROMO_END = '2023-12-06 07:59:59' // UTC

export const PACK_PURCHASE_FEE = 0.03

export const DROPPP_MONSTERS_ID = 93

export const getDropppMonstersPromotion = (
  startDate = MONSTER_PROMO_START,
  endDate = MONSTER_PROMO_END
): Promotion => {
  // create promotional info
  const start = dateToMoment(startDate)
  const end = dateToMoment(endDate)
  const now = dateToMoment()
  const pending = now.isBefore(start)
  const expired = now.isAfter(end)
  const active = !(pending || expired)

  return {
    active,
    pending,
    expired,
    start,
    end,
    marketplaceFee: '2%',
    startDisplayDate: formattedPacificDate(
      startDate,
      DateFormatter.LongMonthShortDay
    ),
    startDisplayYear: start.format('YYYY'),
    endDisplayDate: formattedPacificDate(
      endDate,
      DateFormatter.LongMonthShortDay
    ),
    endDisplayYear: end.format('YYYY')
  }
}

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/Dropppio',
  discord: 'https://droppp.io/discord',
  instagram: 'https://www.instagram.com/droppp.io',
  youtube: 'https://www.youtube.com/channel/UC7HuIxd8Mzw4q2-9Typ4UUA'
}

export const OG_TAGS = {
  home: {
    title: 'Home of the Best Pop Culture Digital Collectibles',
    description:
      'Collect your favorite digital collectibles and become eligible to redeem matching physical collectibles! Start now with simple and secure purchase methods.',
    keywords:
      'droppp, drop, funko, nft, nft marketplace, digital collectibles, collectibles, pop culture, wax, digital pop',
    og: {
      image: 'home-og-droppp'
    }
  },
  getStarted: {
    title: 'Get Started',
    description:
      'Getting started with Droppp is easy. We’ve set up a step-by-step guide to get you up and running in no time!',
    keywords:
      'droppp, marketplace, account, getting started, digital collectibles, nft, funko, help, how it works',
    og: {
      image: 'get-started-og-droppp'
    }
  },
  drops: {
    title: 'Discover New Pop Culture Digital Collectibles',
    description:
      'View the latest pop culture digital collectible drops. Collect your favorites and become eligible to redeem matching physical collectibles!',
    keywords:
      'droppp, drop, funko, nft, nft marketplace, digital collectibles, collectibles, pop culture, wax, digital pop',
    og: {
      image: 'drops-og-droppp'
    }
  },
  support: {
    title: 'Support',
    description:
      'Need support? Find helpful resources or contact Droppp support here.',
    keywords:
      'droppp, support, faq, help, resources, contact, funko, nft, nft marketplace, digital collectibles',
    og: {
      image: 'support-og-droppp'
    }
  },
  faq: {
    title: 'FAQ',
    description:
      'Not quite sure how Droppp works? Find answers to common questions here.',
    keywords:
      'droppp, faq, help, resources, contact, funko, nft, nft marketplace, digital collectibles',
    og: {
      image: 'faq-og-droppp'
    }
  },
  partner: {
    title: 'Partner with us',
    description:
      'Looking to partner with Droppp? We offer an end-to-end, turnkey digital collectibles delivery experience from digital production to physical item delivery.',
    keywords:
      'droppp, partner, contact, funko, nft, help, company, turnkey, digital collectibles, delivery',
    og: {
      image: 'partners-og-droppp'
    }
  },
  marketplace: {
    title: 'Droppp Marketplace - Shop Digital Collectibles',
    description:
      'Buy, list, and collect your favorite digital collectibles all in one place on Droppp Marketplace!',
    keywords:
      'droppp, marketplace, funko, buy, sell, shop, listing, digital collectibles, collection, NFTs',
    og: {
      image: 'marketplace-og-image'
    },
    showDropppTitleText: false
  },
  consumer: {
    title: 'Consumer Rights Request'
  },
  subscriptionConfirm: {
    title: 'Confirm Your Subscription'
  },
  unsubscribe: {
    title: 'Unsubscribe'
  }
}

export const WAX_URL = 'https://on.wax.io/wax-io/'

export const NAV_TOP_LINKS = [
  {
    label: 'Drops',
    path: '/drops'
  },
  {
    label: 'Marketplace',
    path: '/marketplace'
  },
  {
    label: 'Support',
    path: '/support'
  }
]

export const NAV_DESKTOP_LINKS = [
  {
    label: 'Inventory',
    path: '/inventory',
    icon: 'nav-item-inventory'
  },
  {
    label: 'Collection Tracker',
    path: '/collection-tracker',
    icon: 'nav-item-collection-tracker'
  },
  {
    label: 'Redemptions',
    path: '/redemptions',
    icon: 'nav-item-redemption',
    showRedemptions: true
  }
]

export const NAV_MENU_ITEMS: HrefLinkDefinition[] = [
  {
    label: 'Inventory',
    path: '/inventory'
  },
  {
    label: 'Listings',
    path: '/inventory',
    params: new URLSearchParams({ show_only_listings: 'true' })
  },
  {
    label: 'Collection Tracker',
    path: '/collection-tracker'
  },
  {
    label: 'Redemptions',
    path: '/redemptions'
  },
  {
    label: 'Activity',
    path: '/activity'
  },
  {
    label: 'Wallet',
    path: '/wallet'
  },
  {
    label: 'Account',
    path: '/account'
  }
]

export const FOOTER_LINKS = {
  drops: {
    label: 'Drops',
    href: '/drops'
  },
  marketplace: {
    label: 'Marketplace',
    href: '/marketplace',
    isEnabled: isMpEnabled(),
    showsBetaBadge: true
  },
  faq: {
    label: 'FAQ',
    href: '/faq'
  },
  support: {
    label: 'Support',
    href: '/support'
  },
  inventory: {
    label: 'Inventory',
    href: '/inventory'
  },
  collections: {
    label: 'Collection Tracker',
    href: '/collection-tracker'
  },
  redemptions: {
    label: 'Redemptions',
    href: '/redemptions'
  },
  activity: {
    label: 'Activity',
    href: '/activity'
  },
  partner: {
    label: 'Partner with Droppp',
    href: '/partner'
  },
  terms: {
    label: 'Terms of Service',
    href: '/terms'
  },
  privacy: {
    label: 'Privacy Policy',
    href: '/privacy'
  },
  california: {
    label: 'California Notice at Collection',
    href: '/privacy/#customers-residing-us'
  }
}

export const EMPTY_LIST_MAP = {
  noAddress: {
    label: 'Inventory Empty',
    description:
      'Items will appear in your inventory when you participate in your first drop or transfer Droppp-originated NFTs from another WAX account.',
    image: 'inventory-dark'
  },
  All: {
    label: 'Inventory Empty',
    description:
      'Digital collectibles that are bought or transferred into your account will show up here.',
    image: 'inventory-dark'
  },
  Items: {
    label: 'Items',
    description:
      'Items will appear in your inventory when you participate in your first drop or transfer Droppp-originated NFTs from another WAX account.',
    image: 'inventory-dark'
  },
  Packs: {
    label: 'Packs',
    description:
      'Packs will appear in your inventory after participating in a drop or purchasing on the secondary market and transferring from another WAX account.',
    image: 'inventory-dark'
  },
  activity: {
    label: 'Activity',
    description:
      'Account activity will appear when you purchase, redeem, and transfer items out of Droppp.',
    image: 'activity-dark'
  },
  noResults: {
    label: 'No Results Found',
    description: 'Try removing some of the active filters.',
    image: 'inventory-dark'
  },
  noListings: {
    label: 'No Active Listings',
    description: 'You have no items listed on the marketplace at this time.',
    image: 'inventory-dark'
  },
  noResultsProfile: {
    label: 'No Results found',
    description: 'Try changing your view or remove active filters',
    image: 'inventory-dark'
  },
  emptyProfile: {
    label: 'Nothing to see here',
    description:
      'When items are added into your inventory, they will also show up in your user profile.',
    image: 'inventory-dark'
  },
  emptyOtherProfile: {
    label: 'Nothing to see here',
    description: 'This user does not have any assets.',
    image: 'inventory-dark'
  }
}

export type EMPTY_LIST_OPTION = keyof typeof EMPTY_LIST_MAP

const MINT_SORT_OPTIONS: SortOption[] = [
  {
    label: 'Mint (Low - High)',
    icon: 'hash',
    value: 'mint asc'
  },
  {
    label: 'Mint (High - Low)',
    icon: 'hash',
    value: 'mint desc'
  }
]

const NAME_SORT_OPTIONS: SortOption[] = [
  {
    label: 'Name (A - Z)',
    icon: 'sort-name',
    value: 'name asc'
  },
  {
    label: 'Name (Z - A)',
    icon: 'sort-name',
    value: 'name desc'
  }
]

const TIME_CREATED_SORT_OPTIONS: SortOption[] = [
  {
    label: 'Most Recent',
    icon: 'calendar',
    value: 'time_created desc'
  },
  {
    label: 'Oldest',
    icon: 'calendar',
    value: 'time_created asc'
  }
]

const LISTING_PRICE_SORT_OPTIONS: SortOption[] = [
  {
    label: 'Price (Low - High)',
    icon: 'price',
    value: 'listing_price asc'
  },
  {
    label: 'Price (High - Low)',
    icon: 'price',
    value: 'listing_price desc'
  }
]

const LISTING_DATE_SORT_OPTIONS: SortOption[] = [
  {
    label: 'List Date (New - Old)',
    icon: 'calendar',
    value: 'list_date desc'
  },
  {
    label: 'List Date (Old - New)',
    icon: 'calendar',
    value: 'list_date asc'
  }
]

export const MINT_LISTING_SORT_OPTIONS: SortOption[] = [
  ...TIME_CREATED_SORT_OPTIONS,
  ...LISTING_PRICE_SORT_OPTIONS,
  ...MINT_SORT_OPTIONS
]

export const SALES_HISTORY_SORT_OPTIONS: SortOption[] =
  MINT_LISTING_SORT_OPTIONS

export const INVENTORY_SORT_OPTIONS: SortOption[] = [
  ...MINT_SORT_OPTIONS,
  ...NAME_SORT_OPTIONS,
  {
    label: 'Rarity (Most - Least)',
    icon: 'sort-rarity',
    value: 'rarity desc'
  },
  {
    label: 'Rarity (Least - Most)',
    icon: 'sort-rarity',
    value: 'rarity asc'
  },
  {
    label: 'Most Recent',
    icon: 'calendar',
    value: 'received desc'
  },
  {
    label: 'Oldest',
    icon: 'calendar',
    value: 'received asc'
  }
]

export const LISTING_SORT_OPTIONS: SortOption[] = [
  ...LISTING_DATE_SORT_OPTIONS,
  {
    label: 'Price (Low - High)',
    icon: 'price',
    value: 'price asc'
  },
  {
    label: 'Price (High - Low)',
    icon: 'price',
    value: 'price desc'
  },
  ...MINT_SORT_OPTIONS,
  {
    label: 'Rarity (Most - Least)',
    icon: 'sort-rarity',
    value: 'rarity desc'
  },
  {
    label: 'Rarity (Least - Most)',
    icon: 'sort-rarity',
    value: 'rarity asc'
  },
  ...NAME_SORT_OPTIONS
]

export const ACTIVITY_FILTER_OPTIONS: SortOption[] = [
  {
    label: 'All Types',
    icon: 'activity-type',
    value: '0'
  },
  /**
   * 1: purchase
   * 6: purchaseaccount
   * 12: mktpurchase
   */
  {
    label: 'Purchase',
    icon: 'activity-purchase',
    value: '1, 6, 12'
  },
  {
    label: 'Sale',
    icon: 'activity-sale',
    value: '11'
  },
  {
    label: 'Transfer',
    icon: 'activity-transfer',
    value: '4'
  },
  {
    label: 'Deposit',
    icon: 'activity-deposit',
    value: '9'
  },
  /**
   * 3: transfer
   * 10: withdrawwallet
   */
  {
    label: 'Withdraw',
    icon: 'activity-withdraw',
    value: '3, 10'
  },
  {
    label: 'Redemption',
    icon: 'activity-redemption',
    value: '5'
  },
  {
    label: 'Promotion',
    icon: 'activity-promotion',
    value: '8'
  }
]

export const ACTIVITY_TYPE_OPTIONS: SortOption[] = [
  {
    label: 'All Types',
    icon: 'activity-type',
    value: '0'
  },
  {
    label: 'Purchase',
    icon: 'activity-purchase',
    value: '1'
  },
  {
    label: 'Address Purchase',
    icon: 'activity-purchase',
    value: '6'
  },
  {
    label: 'Marketplace Purchase',
    icon: 'activity-purchase',
    value: '12'
  },
  {
    label: 'Sale',
    icon: 'activity-sale',
    value: '11'
  },
  {
    label: 'Transfer',
    icon: 'activity-transfer',
    value: '4'
  },
  {
    label: 'Deposit',
    icon: 'activity-deposit',
    value: '9'
  },
  {
    label: 'Crypto Transfer',
    icon: 'activity-deposit',
    value: '3'
  },
  {
    label: 'Withdraw',
    icon: 'activity-deposit',
    value: '10'
  },
  {
    label: 'Redemption',
    icon: 'activity-redemption',
    value: '5'
  },
  {
    label: 'Promotion',
    icon: 'activity-promotion',
    value: '8'
  }
]

export const ACTIVITY_SORT_OPTIONS: SortOption[] = [
  {
    label: 'Type (A - Z)',
    icon: 'sort-name',
    value: 'type_id asc'
  },
  {
    label: 'Type (Z - A)',
    icon: 'sort-name',
    value: 'type_id desc'
  },
  {
    label: 'Info (A - Z)',
    icon: 'sort-name',
    value: 'info asc'
  },
  {
    label: 'Info (Z - A)',
    icon: 'sort-name',
    value: 'info desc'
  },
  {
    label: 'Count (Low - High)',
    icon: 'hash',
    value: 'info_count asc'
  },
  {
    label: 'Count (High - Low)',
    icon: 'hash',
    value: 'info_count desc'
  },
  ...TIME_CREATED_SORT_OPTIONS
]

export const ACTIVITY_TYPE_MAP = {
  purchase: {
    id: 1,
    label: 'Purchase',
    icon: 'activity-purchase',
    unit: 'Pack'
  },
  // open: {
  //   id: 2,
  //   label: 'Open',
  //   icon: 'activity-purchase'
  // },
  transfer: {
    id: 3,
    label: 'Crypto Transfer',
    icon: 'activity-transfer',
    unit: 'WAXP'
  },
  transferbatch: {
    id: 4,
    label: 'Transfer',
    icon: 'activity-transfer',
    unit: 'Item'
  },
  redeem: {
    id: 5,
    label: 'Redemption',
    icon: 'activity-redemption',
    unit: 'Redeemable'
  },
  purchaseaccount: {
    id: 6,
    label: 'Address Purchase',
    icon: 'activity-purchase'
  },
  createaccount: {
    id: 7,
    label: 'Account Creation',
    icon: 'activity-purchase'
  },
  onboardpromo: {
    id: 8,
    label: 'Promotion',
    icon: 'activity-promotion',
    unit: 'Item'
  },
  fundwallet: {
    id: 9,
    label: 'Deposit',
    icon: 'activity-deposit',
    unit: 'USDC'
  },
  withdrawwallet: {
    id: 10,
    label: 'Withdrawal',
    icon: 'activity-withdraw',
    unit: 'USDC'
  },
  mktsale: {
    id: 11,
    label: 'Sale',
    icon: 'activity-sale',
    unit: 'USDC'
  },
  mktpurchase: {
    id: 12,
    label: 'Purchase',
    icon: 'activity-purchase',
    unit: 'USDC'
  }
}

export type SortOption = {
  label: string
  icon: Icons | string
  value: string
}

export const DROP_SORT_OPTIONS: SortOption[] = [
  {
    label: 'Rarity (Most - Least)',
    icon: 'sort-rarity',
    value: 'rarity desc'
  },
  {
    label: 'Rarity (Least - Most)',
    icon: 'sort-rarity',
    value: 'rarity asc'
  }
]

export const PFP_SORT_OPTIONS: SortOption[] = [
  {
    label: 'Price (Low - High)',
    icon: 'price',
    value: 'price asc'
  },
  {
    label: 'Price (High - Low)',
    icon: 'price',
    value: 'price desc'
  },
  ...NAME_SORT_OPTIONS
  // TODO: waiting for BE ready
  // {
  //   label: 'Most Recent',
  //   icon: 'sort-date',
  //   value: 'received desc'
  // },
  // {
  //   label: 'Oldest',
  //   icon: 'sort-date',
  //   value: 'received asc'
  // }
]

export enum MEDIA_SIZE {
  original = 'ORIGINAL',
  tiny = 'TINY',
  small = 'SMALL',
  default = 'DEFAULT',
  large = 'LARGE'
}

export type MEDIA_DETAILS = {
  type: string
  url: string
  width: string
  height: string
}

export const MEDIA_SIZES: Record<MEDIA_SIZE, MEDIA_DETAILS> = {
  ORIGINAL: {
    type: 'size0_type',
    url: 'size0_url',
    width: 'size0_width',
    height: 'size0_height'
  },
  TINY: {
    type: 'size1_type',
    url: 'size1_url',
    width: 'size1_width',
    height: 'size1_height'
  },
  SMALL: {
    type: 'size2_type',
    url: 'size2_url',
    width: 'size2_width',
    height: 'size2_height'
  },
  DEFAULT: {
    type: 'size3_type',
    url: 'size3_url',
    width: 'size3_width',
    height: 'size3_height'
  },
  LARGE: {
    type: 'size4_type',
    url: 'size4_url',
    width: 'size4_width',
    height: 'size4_height'
  }
}

export const RARITY_SORT = [
  'Common',
  'Uncommon',
  'Rare',
  'Epic',
  'Ultra',
  'Legendary',
  'Grail',
  'Mythic',
  '1 of 1',
  'Redeemable',
  'Royalty',
  'Series',
  'Unique Webbian'
]

export const RARITIES_GROUP: {
  collectibles: Rarity[]
  redeemables: Rarity[]
  royalty: Rarity[]
} = {
  collectibles: [
    '1 of 1',
    'Mythic',
    'Grail',
    'Legendary',
    'Ultra',
    'Royalty',
    'Series',
    'Epic',
    'Rare',
    'Uncommon',
    'Common'
  ],
  redeemables: ['Ultra', 'Legendary', 'Grail', 'Mythic'],
  royalty: ['Common', 'Uncommon', 'Rare', 'Epic']
}

export const ErrorModalMap = {
  'country-restriction': 'unsupported-region',
  ip_changed: 'moving-around',
  max_sessions: 'take-a-breather'
}

export const addressRegex = /^[a-z1-5]{1,9}$/
export const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const EULA_URL = 'https://digital.funko.com/eula'

export const HEADER_HEIGHT = {
  WEB: 72,
  MOBILE: 64
}

export const HEADER_HEIGHT_WEB = `${HEADER_HEIGHT.WEB}px` // 72px
export const HEADER_HEIGHT_MOBILE = `${HEADER_HEIGHT.MOBILE}px` // 64px

export const SECONDARY_NAV_HEIGHT = 72
export const SECONDARY_NAV_HEIGHT_PX = '72px'
export const SECONDARY_NAV_HEIGHT_MOBILE = 64
export const SECONDARY_NAV_HEIGHT_MOBILE_PX = '64px'

export const BREAKPOINTS = {
  sm: 428,
  md: 768,
  lg: 926,
  xl: 1400,
  listViewModalSm: 570
}

export const WB_AFFILIAATE_URL =
  'https://www.warnermediaprivacy.com/policycenter/b2c/affiliateslist/#affiliates'
export const WB_PRIVACY_URL =
  'https://www.warnermediaprivacy.com/policycenter/b2c/WME/'

export const INVENTORY_FILTER_TRANSITION_DURATION = 500
export const DETAIL_PANE_TRANSITION_DURATION_MS = 250

export const REDEMPTION_LOGOS = {
  // DC TEEN TITANS GO! X FUNKO SERIES 1 (collection_id=93)
  93: {
    path: '105-AC2D47BA-49FE-4287-AA25-4711B983681A',
    imageId: 'dc-white-logo'
  },
  // DC DK X FUNKO SERIES 1 (collection_id=105)
  105: {
    path: '126-BE993D17-3BDD-4FDE-BB90-3160CE6150B7',
    imageId: 'dc-white-logo'
  }
}

export const ACTION_REFETCH_INTERVAL = 10000
export const WAX_PURCHASE_PRICE = 4.99

export const REDEMPTION_TIER_SORT = [
  'Mythic',
  'Grail',
  'Legendary',
  'Royalty',
  'Ultra'
]
