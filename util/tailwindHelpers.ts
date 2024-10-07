import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfigSource from '../tailwind.config'
import { TextAlignment } from '@/types/tailwind'
import { twMerge } from 'tailwind-merge'
import { default as _classNames } from 'classnames'

export const { theme: designSystem } = resolveConfig(tailwindConfigSource)

export const textAlignmentClass = (value: TextAlignment) => {
  switch (value) {
    case 'right': {
      return 'text-right'
    }
    case 'left': {
      return 'text-left'
    }
    default:
      return 'text-center'
  }
}

export const cssFormattedSpacing = (unit: number): string | undefined => {
  const spacing = designSystem?.spacing[unit]
  if (!spacing) return undefined
  return spacing
}

export const spacing = (unit: number): number | undefined =>
  parseInt(cssFormattedSpacing(unit))

export const classNames = (...args: _classNames.ArgumentArray): string =>
  // Run each argument through the original classnames parser to generate the
  // string representation of each. Then pass all strings to twMerge to
  // filter out conflicting classes.
  twMerge(args.map(c => _classNames(c)))
