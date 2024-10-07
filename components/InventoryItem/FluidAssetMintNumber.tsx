import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { AssetType } from '@/api/resources/shared/asset'
import { Rarity } from '@/api/resources/shared/rarity'
import { RARITY_TYPES } from '@/enum'
import { numberWithCommas } from '@/util/numberHelpers'

interface Props {
  className?: string
  mint_num?: AssetType['mint_num']
  mint_count?: AssetType['mint_count']
  rarity?: Rarity
  shouldRevealMintCount?: boolean
  isSmallLayout?: boolean
}

const FluidAssetMintNumber = ({
  className = '',
  mint_num,
  mint_count,
  rarity,
  shouldRevealMintCount = false,
  isSmallLayout = false
}: Props) => {
  if (mint_num === undefined) return null

  return (
    <div
      className={classNames(
        'absolute border-1 border-defaultBorder flex items-center rounded-full font-bold bg-gray-900/60',
        className
      )}
      style={{
        height: `${isSmallLayout ? 'max(24px, 3.5em)' : 'max(24px, 4em)'}`,
        top: `${isSmallLayout ? '1.5em' : '3em'}`,
        left: `${isSmallLayout ? '1.5em' : '3em'}`,
        padding: `${isSmallLayout ? '0 1em' : '0 1.375em'}`
      }}
    >
      {mint_num && (
        <p
          className="inline-flex leading-none"
          style={{
            fontSize: `${isSmallLayout ? '1.5em' : 'max(12px, 1.75em)'}`
          }}
        >
          #{numberWithCommas(mint_num)}
          {!disableMintCountReveal(rarity) && (
            <AnimatePresence initial={false}>
              {shouldRevealMintCount && (
                <motion.span
                  layout
                  className="text-gray-300 font-medium"
                  transition={{ ease: 'easeInOut', duration: 0.2 }}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                >
                  &nbsp;/&nbsp;{numberWithCommas(mint_count)}
                </motion.span>
              )}
            </AnimatePresence>
          )}
        </p>
      )}
    </div>
  )
}

const disableMintCountReveal = (rarity: Rarity) =>
  rarity === RARITY_TYPES['Unique Webbian']

export default FluidAssetMintNumber
