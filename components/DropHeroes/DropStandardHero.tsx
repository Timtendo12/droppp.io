import React from 'react'
import FluidContainer from '@/components/FluidContainer'
import dynamic from 'next/dynamic'
import Button, { ButtonLink } from '@/components/Button'
import Countdown from '@/contexts/countdown'
import SeriesBadge from '@/components/SeriesBadge'
import { CountdownContext } from '@/contexts/countdown'
import CloudinaryImage from '@/components/CloudinaryImage'
import DropAvailability from '@/components/DropAvailability'
import {
  calcTimeRemaining,
  eightHoursPrior,
  initialPackSaleEndedWithinSevenDays,
  queueOpen
} from '@/util/timeHelpers'
import { SOCIAL_LINKS } from '@/constants'
import CircleIconLink from '@/components/CircleIconLink'
import { DropState } from '@/enum'
import useBreakpoints from '@/hooks/useBreakpoints'
import { DROP_BLADE_GRADIENTS, DROP_THEME } from '@/constants/drops'
import DropHeroLogos from './DropHeroLogos'
import classNames from 'classnames'
import CloudinaryAsset from '@/components/CloudinaryAsset'
import DropHeroGradient from './DropHeroGradient'
import { formattedPacificDate } from '@/util/time/pt'
import { DateFormatter } from '@/util/time'
import { MergedDrop } from '@/config/drops/schema'
import { CLOUDINARY_DEFAULT_IMAGE_QUALITY } from '@/constants/cloudinary'
import NotifyMeAction from '@/components/Actions/NotifyMeAction'

const CountdownTimeDisplay = dynamic(() => import('../CountdownTimeDisplay'), {
  ssr: false
})

interface Props {
  drop: MergedDrop
}

const DropStandardHero = ({ drop }: Props) => {
  const { isMobile, isMedium } = useBreakpoints()

  const {
    cloudinaryFolder,
    heroBg,
    type,
    mockName,
    mainCopy,
    figures: { quality = 75, blade },
    time_launch,
    duration_in_seconds,
    id,
    heroGradient = DROP_BLADE_GRADIENTS,
    discordUrl,
    heroLogo,
    heroLogo2,
    theme,
    heroBgQuality = CLOUDINARY_DEFAULT_IMAGE_QUALITY
  } = drop

  // DEFAULT VALUES
  // @TODO: Clean up these default values -  Josh Dobson
  let figureWidth = 1032
  let figureHeight = 750
  let maxFigureWidth = 515
  let minFigureWidth = 0

  if (blade.dimensions) {
    if (blade.dimensions.minWidth) {
      if (typeof blade.dimensions.minWidth !== 'number') {
        minFigureWidth = isMedium
          ? blade.dimensions.minWidth.lg
          : blade.dimensions.minWidth.sm
      } else {
        minFigureWidth = blade.dimensions.minWidth
      }
    }

    if (blade.dimensions.maxWidth) {
      if (typeof blade.dimensions.maxWidth !== 'number') {
        maxFigureWidth = isMedium
          ? blade.dimensions.maxWidth.lg
          : blade.dimensions.maxWidth.sm
      } else {
        maxFigureWidth = blade.dimensions.maxWidth
      }
    }

    if (blade.dimensions.width) {
      if (typeof blade.dimensions.width !== 'number') {
        figureWidth = isMedium
          ? blade.dimensions.width.lg
          : blade.dimensions.width.sm
      } else {
        figureWidth = blade.dimensions.width
      }
    }

    if (blade.dimensions.height) {
      if (typeof blade.dimensions.height !== 'number') {
        figureHeight = isMedium
          ? blade.dimensions.height.lg
          : blade.dimensions.height.sm
      } else {
        figureHeight = blade.dimensions.height
      }
    }
  }

  const cloudinaryAssetPath = `drops/${cloudinaryFolder}/`
  const isLightTheme = theme === DROP_THEME.LIGHT
  const bgAndTextClassess = isLightTheme ? 'bg-gray-700/70 text-white' : ''
  const buttonTheme = isLightTheme ? 'black' : 'white'

  return (
    <Countdown
      key={id}
      interval={1}
      time_launch={time_launch}
      duration_in_seconds={duration_in_seconds}
    >
      <div
        className="relative overflow-hidden"
        style={{ paddingTop: 'var(--headerHeight)' }}
      >
        {!isLightTheme && (
          <DropHeroGradient
            gradient={isMobile ? heroGradient.mobile : heroGradient.desktop}
          />
        )}
        <CloudinaryImage
          path={cloudinaryAssetPath}
          imageId={heroBg}
          layout="fill"
          objectFit="cover"
          alt="Drop Background"
          transformations={{ quality: heroBgQuality }}
          className="-z-10"
        />
        <div
          className={classNames('max-w-[1600px] mx-auto relative', {
            'text-gray-900': isLightTheme
          })}
        >
          <FluidContainer
            targetWidth={832}
            className="relative flex flex-col items-center justify-center text-center pt-8 mx-auto px-3 max-w-[928px]"
          >
            <>
              <DropHeroLogos
                imgPath={cloudinaryAssetPath}
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
                <span
                  className="inline"
                  dangerouslySetInnerHTML={{ __html: mainCopy }}
                />{' '}
                <AvailDate time_launch={time_launch} drop={drop} />
              </p>
              {drop.state == 'lite_ultra' && (
                <>
                  <div className="w-full flex flex-wrap justify-center items-center gap-2">
                    <NotifyMeAction
                      dropId={drop.id}
                      buttonTheme={buttonTheme}
                    />
                    <div className="flex gap-2">
                      <CircleIconLink
                        name="discord"
                        url={discordUrl}
                        className={bgAndTextClassess}
                      />
                      <CircleIconLink
                        name="twitter"
                        url={SOCIAL_LINKS.twitter}
                        className={bgAndTextClassess}
                      />
                      <CircleIconLink
                        name="instagram"
                        url={SOCIAL_LINKS.instagram}
                        className={bgAndTextClassess}
                      />
                    </div>
                  </div>
                </>
              )}
            </>
          </FluidContainer>
          <DropButtons drop={drop} />
          {/* <div className="relative aspect-[65/32] md:aspect-[103/75] max-w-[515px] mx-auto w-full mt-4 overflow-hidden outline"> */}

          <div
            style={{ maxWidth: `${maxFigureWidth}px` }}
            className="mx-auto mt-4"
          >
            <div
              className="relative left-1/2 -translate-x-1/2"
              style={{
                aspectRatio: `${figureWidth}/${figureHeight}`,
                minWidth: `${minFigureWidth}px`
              }}
            >
              <CloudinaryAsset
                cloudinaryFolder={cloudinaryAssetPath}
                asset={blade}
                className="absolute top-0 bottom-[-2px] right-0 left-0 min-w-[100%] min-h-[100%] max-w-[100%] max-h-[100%] m-auto object-contain object-bottom"
                transformations={{
                  quality: quality,
                  resize: { width: figureWidth }
                }}
              />
            </div>
          </div>
          {/* Adding a bottom-[-2px] is necessary because at certain browser widths a 1px line shows up below the video */}
        </div>
      </div>
    </Countdown>
  )
}

export default DropStandardHero

export type DropButtonsProps = {
  drop: MergedDrop
}

export const DropButtons = ({ drop }: DropButtonsProps) => {
  const isLightTheme = drop.theme === DROP_THEME.LIGHT
  const disabledTheme = isLightTheme ? 'black' : 'secondary'
  const buttonTheme = isLightTheme ? 'black' : 'white'
  const secondaryButtonTheme = isLightTheme ? 'gray-transparent' : 'secondary'

  if ([DropState.AnnounceLiteUltra].includes(drop.state as DropState)) {
    return null
  }

  if (
    [DropState.SaleEnded, DropState.SoldOut].includes(
      drop.state as DropState
    ) &&
    initialPackSaleEndedWithinSevenDays(drop.time_launch)
  ) {
    return (
      <div className="relative flex flex-col items-center justify-center text-center mt-f8 mx-auto px-2 max-w-[832px]">
        <div className="flex max-sm:flex-col max-sm:items-center gap-2">
          <ButtonLink theme={buttonTheme} size="lg" href={drop.url}>
            View Collection
          </ButtonLink>
          <ButtonLink
            size="lg"
            theme={secondaryButtonTheme}
            href={`${drop.url}/shop`}
          >
            Shop Now
          </ButtonLink>
        </div>
      </div>
    )
  }

  const remaining = calcTimeRemaining(drop.time_launch)

  if (eightHoursPrior(remaining)) {
    return (
      <div className="relative flex flex-col items-center justify-center text-center mt-f8 mx-auto px-2 max-w-[832px]">
        <div className="flex max-sm:flex-col max-sm:items-center gap-2">
          {drop.state !== DropState.SaleContinued ? (
            <CountdownContext.Consumer>
              {value => (
                <CountdownTimeDisplay
                  drop={drop}
                  timeRemainingInSeconds={Number(value)}
                >
                  {(time, disabled) => {
                    const learnMoreButtonTheme =
                      time === 'Join Queue'
                        ? isLightTheme
                          ? 'gray-transparent'
                          : 'secondary'
                        : isLightTheme
                        ? 'black'
                        : 'white'

                    return (
                      <>
                        <ButtonLink
                          disabled={disabled}
                          disabledTheme={disabledTheme}
                          theme={buttonTheme}
                          size="lg"
                          className="tabular-nums"
                          href={`/reserve-drop/?drop_id=${drop.id}`}
                        >
                          {time}
                        </ButtonLink>
                        <ButtonLink
                          size="lg"
                          theme={learnMoreButtonTheme}
                          href={drop.url}
                        >
                          Learn More
                        </ButtonLink>
                      </>
                    )
                  }}
                </CountdownTimeDisplay>
              )}
            </CountdownContext.Consumer>
          ) : (
            <>
              <Button
                disabledTheme={disabledTheme}
                theme={buttonTheme}
                size="lg"
                onClick={() =>
                  (location.href = '/reserve-drop/?drop_id=' + drop.id)
                }
              >
                Buy Now
              </Button>
              <ButtonLink
                size="lg"
                theme={secondaryButtonTheme}
                href={drop.url}
              >
                Learn More
              </ButtonLink>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex flex-col items-center justify-center text-center mt-f8 mx-auto px-2 max-w-[832px]">
      <div className="flex max-sm:flex-col max-sm:items-center gap-2">
        <NotifyMeAction dropId={drop.id} buttonTheme={buttonTheme} />
        <ButtonLink size="lg" theme={buttonTheme} href={drop.url}>
          Learn More
        </ButtonLink>
      </div>
    </div>
  )
}

export type AvailDateProps = {
  time_launch: string
  drop: MergedDrop
}

export const AvailDate = ({ time_launch, drop }: AvailDateProps) => {
  // Let's be very specific about the drop states where we don't want an availability date shown.
  switch (drop.state) {
    case DropState.SaleContinued:
      return null
    default:
      break
  }

  const remaining = calcTimeRemaining(time_launch)

  if (!queueOpen(remaining)) {
    return (
      <CountdownContext.Consumer>
        {value => {
          if (!queueOpen(Number(value))) {
            return (
              <span className="inline">
                <DropAvailability drop={drop} time_remaining={value}>
                  {message => message}
                </DropAvailability>
              </span>
            )
          } else {
            return null
          }
        }}
      </CountdownContext.Consumer>
    )
  } else if (
    [DropState.SaleEnded, DropState.SoldOut].includes(
      drop.state as DropState
    ) &&
    initialPackSaleEndedWithinSevenDays(time_launch)
  ) {
    return (
      <span className="whitespace-nowrap">
        Collect by{' '}
        {formattedPacificDate(
          drop.redeem_start_date,
          DateFormatter.LongHoursMinutes,
          true
        )}
      </span>
    )
  } else {
    return null
  }
}
