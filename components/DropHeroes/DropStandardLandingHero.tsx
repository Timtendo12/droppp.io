import classNames from 'classnames'
import CircleIconLink from '@/components/CircleIconLink'
import CloudinaryImage from '@/components/CloudinaryImage'
import Button, { ScrollToButton } from '@/components/Button'
import FluidContainer from '@/components/FluidContainer'
import useBreakpoints from '@/hooks/useBreakpoints'
import {
  DROP_BLADE_GRADIENTS,
  DROP_EXCLUSIVE_TARGET,
  DROP_THEME
} from '@/constants/drops'
import DropHeroLogos from './DropHeroLogos'
import DropCardFan2D from '@/components/PageSpecificComponents/drops/DropCardFan2D'
import NiceModal from '@ebay/nice-modal-react'
import { MODAL_ID } from '@/constants/modalId'
import DropCardFan3D from '@/components/PageSpecificComponents/drops/DropCardFan3D'
import SocialShareMenu from '@/components/SocialShareMenu'
import { formattedPacificDate } from '@/util/time/pt'
import { useRouter } from 'next/router'
import { MergedDrop } from '@/config/drops/schema'
import SeriesBadge from '@/components/SeriesBadge'
import DropHeroGradient from './DropHeroGradient'
import { CLOUDINARY_DEFAULT_IMAGE_QUALITY } from '@/constants/cloudinary'
import NotifyMeAction from '@/components/Actions/NotifyMeAction'
import { sendGTMEvent } from '@next/third-parties/google'
import { useDropContext } from '@/features/drop/DropContextProvider'
import { redeemableRarityString } from '@/util/rarityHelpers'
import { DateFormatter } from '@/util/time'
import { DropQueueButton } from '@/features/drop/overview/DropQueueButton'
import { dropAvailabilityString } from '../DropAvailability'
import { DropStats } from '../MarketingStats'

interface Props {
  drop: MergedDrop
}

const DropStandardLandingHero = ({ drop }: Props) => {
  const { isMobile, isMedium, isLarge } = useBreakpoints(['mobile', 'md', 'lg'])
  const { isPostRedemption, isPostSnapshot } = useDropContext()

  const {
    cloudinaryFolder,
    cardsFan,
    heroBg,
    type,
    mockName,
    heroGradient = DROP_BLADE_GRADIENTS,
    heroLogo,
    heroLogo2,
    theme,
    figures,
    heroBgQuality = CLOUDINARY_DEFAULT_IMAGE_QUALITY
  } = drop

  const isLightTheme = theme === DROP_THEME.LIGHT
  const imgPath = `drops/${cloudinaryFolder}/`

  const wrapperClasses = ''

  // @TODO - Do we still need this??? - Josh Dobson
  // const wrapperClasses = isPostRedemption
  //   ? 'absolute top-0 max-[935px]:min-h-[728px] min-h-[828px] max-h-[828px] w-full'
  //   : drop.exclusive
  //   ? 'absolute top-0 min-h-[953px] max-h-[953px] w-full'
  //   : 'absolute top-0 min-h-[828px] max-h-[828px] w-full'

  const exclusiveLinkClassName = isLightTheme
    ? 'utility-lg uppercase'
    : 'text-white hover:underline utility-lg uppercase'

  const description = isPostSnapshot
    ? 'Collect Digital Pop!™ Redemption Tokens to redeem them for exclusive physical collectibles designed specifically for this drop.'
    : 'Collect Digital Pop!™ and progress toward landing physical collectibles designed exclusively for this drop.'

  // @TODO - clean up this logic - Josh Dobson
  let figureHeight = isMedium ? 561 : 330
  let figureOffset = 0

  if (figures?.overview?.dimensions) {
    const { overview } = figures
    if (overview.dimensions.height) {
      if (typeof overview.dimensions.height !== 'number') {
        figureHeight = isMedium
          ? overview.dimensions.height.lg
          : overview.dimensions.height.sm
      } else {
        figureHeight = overview.dimensions.height
      }
    }
    if (overview.dimensions.offset) {
      if (typeof overview.dimensions.offset !== 'number') {
        figureOffset = isMedium
          ? overview.dimensions.offset.lg
          : overview.dimensions.offset.sm
      } else {
        figureOffset = overview.dimensions.offset
      }
    }
  }

  return (
    <div
      className="overflow-hidden"
      style={{
        '--figureHeight': `${figureHeight + figureOffset}px`,
        '--figureOffset': `${figureOffset}px`
      }}
    >
      <FluidContainer
        targetWidth={1440}
        className="relative"
        style={{
          paddingTop: 'var(--headerHeight)'
        }}
      >
        <div className={wrapperClasses}>
          {!isLightTheme && (
            <DropHeroGradient
              gradient={isMobile ? heroGradient.mobile : heroGradient.desktop}
            />
          )}
          <CloudinaryImage
            priority={true}
            path={imgPath}
            imageId={heroBg}
            layout="fill"
            objectFit="cover"
            alt="Drop Background"
            transformations={{ quality: heroBgQuality }}
            className="-z-10"
          />
        </div>
        <div
          className={classNames('max-w-[1600px] mx-auto relative mb-4', {
            'text-gray-900': isLightTheme
          })}
        >
          <FluidContainer
            targetWidth={832}
            className="relative flex flex-col items-center justify-center text-center mx-auto px-3 max-w-[928px] "
          >
            <>
              <DropHeroLogos
                imgPath={imgPath}
                logo1={heroLogo}
                logo2={heroLogo2}
                exclusive={drop.exclusive}
                theme={theme}
              />
              <SeriesBadge fluid label={type} className="mb-f2" />
              <h2
                className={classNames('h2 md:h1 mb-2', {
                  'md:!h2': drop.exclusive
                })}
              >
                <span dangerouslySetInnerHTML={{ __html: mockName }} />
              </h2>
              <p className="body md:body-lg mb-3 max-w-[832px] md:px-4">
                <HeroDescription drop={drop} />
              </p>
            </>
          </FluidContainer>
          <DropButtons drop={drop} />
          {drop.exclusive && (
            <div className="flex flex-col items-center mt-3 text-gray-900 hover:text-gray-900/[.72]">
              <ScrollToButton
                targetId={DROP_EXCLUSIVE_TARGET}
                className={exclusiveLinkClassName}
              >
                what are Droppp exclusives?
              </ScrollToButton>
            </div>
          )}
        </div>
        {!isPostRedemption && (
          <DropCardFan3D
            dropId={drop.id}
            drop={drop}
            className="translate-y-[calc(50%-calc(var(--figureOffset)/4))] -mt-[calc(var(--figureHeight)/2)]"
          />
        )}
        {isPostRedemption && cardsFan && <DropCardFan2D drop={drop} />}
      </FluidContainer>
      {isPostRedemption && cardsFan && (
        <>
          <div className="aspect-[8/2.5] lg:aspect-[5/1] max-w-[600px] lg:max-w-[1600px] mx-auto" />
          <FluidContainer
            targetWidth={isLarge ? 1600 : 800}
            className="max-w-[1600px] mx-auto lg:px-0 px-2"
          >
            <>
              <div className="text-center mx-auto lg:max-w-[75em] max-w-[672px] mt-[4em] lg:-mt-[10em]">
                <div>
                  <h2
                    style={{
                      fontSize: isLarge ? 'min(6em, 48px)' : undefined
                    }}
                    className="h3 mb-1"
                  >
                    Collect Them All
                  </h2>
                  <p className="body md:body-lg text-gray-300">
                    Even though this collection’s redemption period has come and
                    gone, you can still collect these limited digital
                    collector’s items.
                  </p>
                  <DropStats className="px-0" drop={drop} type="promo" />
                </div>
              </div>
            </>
          </FluidContainer>
        </>
      )}
      {!isPostRedemption && (
        // mt is half height of carousel mt-[calc(var(--figureHeight)/2+80px)]
        <div className="pt-6 mt-[calc(var(--figureHeight)/2-calc(var(--figureOffset)/4))]">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="h3 md:h2 mb-1 md:mb-2">
              Collect Digital,<br></br>Land a Physical
            </h2>
            <p className="body md:body-lg text-gray-300">{description}</p>
          </div>
          <DropStats drop={drop} />
        </div>
      )}
    </div>
  )
}

export default DropStandardLandingHero

export interface DynamicDropStateProps {
  drop: MergedDrop
}

const HeroDescription = ({ drop }: DynamicDropStateProps): JSX.Element => {
  const {
    time_launch,
    isPostSale,
    isPostSnapshot,
    isPostRedemption,
    redeem_end_date,
    redeem_start_date
  } = useDropContext()

  const availableDate = dropAvailabilityString(time_launch)

  let description = drop.mainCopy + ` ${availableDate} `

  if (isPostSale)
    description = `Shop the Droppp Marketplace for digital collectibles. Collect a ${redeemableRarityString(
      drop
    )} before ${formattedPacificDate(
      redeem_start_date
    )} to claim your exclusive Pop! vinyl figures.`

  if (isPostSnapshot)
    description = `Redemption Tokens are now available! Collect yours to redeem for the physical counterpart. Redeem by ${formattedPacificDate(
      redeem_end_date,
      DateFormatter.LongHoursMinutes,
      true
    )} before they expire!`

  if (isPostRedemption)
    description =
      'The redemption period for this collection has already ended, and the redemption tokens are no longer redeemable for Pop! vinyl figures.'

  return <span dangerouslySetInnerHTML={{ __html: description }} />
}

const DropButtons = ({ drop }: DynamicDropStateProps) => {
  const {
    isLaunched,
    isPostSale,
    isWithin8HoursBeforeQueue,
    isQueueOpen,
    time_launch
  } = useDropContext()

  const isLightTheme = drop.theme === DROP_THEME.LIGHT
  const bgAndTextClasses = isLightTheme ? 'bg-gray-700/70 text-white' : ''

  const contextualMenuConfig = {
    className: bgAndTextClasses,

    itemClassName: isLightTheme ? 'border-white' : '',
    buttonClassName: isLightTheme ? 'hover:text-gray-900' : ''
  }

  const disabledTheme = isLightTheme ? 'black' : 'secondary'
  const buttonTheme = isLightTheme ? 'black' : 'white'
  const secondaryButtonTheme = isLightTheme ? 'gray-transparent' : 'secondary'

  const shouldShowSocialLinks = !isLaunched

  const { push } = useRouter()
  if (drop.state == 'lite_ultra') {
    return null
  }

  const handleHowItWorks = (source: string) => {
    NiceModal.show(MODAL_ID.howItWorks, { catalogItem: drop })

    sendGTMEvent({
      event: 'view_how_it_works',
      hiw_source: source
    })
  }

  const renderDynamicButtons = () => {
    if (isPostSale)
      return (
        <Button
          disabledTheme={disabledTheme}
          theme={buttonTheme}
          size="lg"
          onClick={() => {
            if (drop.drop_marketplace_disabled_primary) {
              NiceModal.show(MODAL_ID.openingSoon, {
                opensAt: time_launch
              })
            } else {
              push(`${drop.url}/shop`)
            }
          }}
        >
          Shop Collection
        </Button>
      )

    return isQueueOpen || isWithin8HoursBeforeQueue ? (
      <DropQueueButton
        dropId={drop.id}
        theme={buttonTheme}
        disabledTheme={disabledTheme}
      />
    ) : (
      <NotifyMeAction dropId={drop.id} buttonTheme={buttonTheme} />
    )
  }

  return (
    <div className="relative flex flex-col items-center justify-center text-center mx-auto px-2 max-w-[832px]">
      <div className="flex flex-col md:flex-row items-center gap-2">
        {renderDynamicButtons()}
        <Button
          size="lg"
          theme={secondaryButtonTheme}
          onClick={() => handleHowItWorks('hiw_overview_hero')}
        >
          How It Works
        </Button>
        {shouldShowSocialLinks && (
          <div className="flex justify-center gap-2">
            <CircleIconLink
              name="discord"
              url={drop.discordUrl}
              className={bgAndTextClasses}
            />
            <SocialShareMenu
              circleIconButtonClassName={bgAndTextClasses}
              contextualMenuConfig={contextualMenuConfig}
            />
          </div>
        )}
      </div>
    </div>
  )
}
