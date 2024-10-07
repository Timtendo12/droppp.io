import { HeroGradient } from '@/config/drops/schema'
import { OpenableType } from '../config/drops/schema'

export const DROP_THEME = {
  DARK: 'dark',
  LIGHT: 'light'
} as const

export const DROP_BLADE_GRADIENTS: {
  desktop: HeroGradient
  mobile: HeroGradient
} = {
  desktop: {
    stop1: '#090909',
    stop2: 'rgb(9 9 9 / 0)',
    opacity: '1',
    heightPercent: '84',
    blendMode: 'hard-light'
  },
  mobile: {
    stop1: '#090909',
    stop2: 'rgb(9 9 9 / 0)',
    opacity: '1',
    heightPercent: '84',
    blendMode: 'hard-light'
  }
}

export enum DROP_PAGE_TARGET {
  overview = 0,
  shop = 1,
  physicals = 2
}

export const DROP_EXCLUSIVE_TARGET = 'exclusive'

export const DROP_CARDS_FALLBACK_NUM: Record<OpenableType, number> = {
  standard: 5,
  premium: 15,
  mini: 3,
  promo: 1,
  pfp: 1,
  mega: 30,
  mythic: 30
}
