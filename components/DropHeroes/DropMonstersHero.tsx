import React from 'react'
import FluidContainer from '@/components/FluidContainer'
import dynamic from 'next/dynamic'
import { FluidText } from '@/components/FluidText'
import Button, { ButtonLink } from '@/components/Button'
import Countdown from '@/contexts/countdown'
import SeriesBadge from '@/components/SeriesBadge'
import { CountdownContext } from '@/contexts/countdown'
import CloudinaryImage from '@/components/CloudinaryImage'
import Icon from '@/components/Icon'
import DropAvailability from '@/components/DropAvailability'
import {
  calcTimeRemaining,
  eightHoursPrior,
  queueOpen
} from '@/util/timeHelpers'
import { SOCIAL_LINKS } from '@/constants'
import CircleIconLink from '@/components/CircleIconLink'
import { DropState } from '@/enum'
import useBreakpoints from '@/hooks/useBreakpoints'
import { DROP_BLADE_GRADIENTS } from '@/constants/drops'
import { useWindowWidth } from '@/contexts/windowDimensions'

const CountdownTimeDisplay = dynamic(() => import('../CountdownTimeDisplay'), {
  ssr: false
})

interface Props {
  drop: any
}

const DropMonstersHero = ({ drop }: Props) => {
  const { isMobile } = useBreakpoints()
  const windowWidth = useWindowWidth()
  const {
    cloudinaryFolder,
    heroBg,
    type,
    mockName,
    mainCopy,
    heroFigures,
    heroFiguresMobile,
    time_launch,
    duration_in_seconds,
    id,
    heroGradient = DROP_BLADE_GRADIENTS,
    discordUrl,
    heroLogo
  } = drop

  const imgPath = `drops/${cloudinaryFolder}/`

  const getHeroGradient = gradient => {
    if (isMobile) {
      return (
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, ${gradient.mobile.stop1}, ${gradient.mobile.stop2})`,
            opacity: `${gradient.mobile.opacity}`,
            height: `${gradient.mobile.heightPercent}%`,
            mixBlendMode: gradient.mobile.blendMode
          }}
          className={`absolute top-0 left-0 right-0`}
        ></div>
      )
    } else {
      return (
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom, ${gradient.desktop.stop1}, ${gradient.desktop.stop2})`,
            opacity: `${gradient.desktop.opacity}`,
            height: `${gradient.desktop.heightPercent}%`,
            mixBlendMode: gradient.desktop.blendMode
          }}
          className={`absolute top-0 left-0 right-0`}
        ></div>
      )
    }
  }

  const figuresImg =
    windowWidth >= 768
      ? { src: heroFigures, width: 2878, height: 862 }
      : {
          src: heroFiguresMobile,
          width: 780,
          height: 588
        }

  return (
    <Countdown
      key={id}
      interval={1}
      time_launch={time_launch}
      duration_in_seconds={duration_in_seconds}
    >
      <div className="relative" style={{ paddingTop: 'var(--headerHeight)' }}>
        {getHeroGradient(heroGradient)}
        <CloudinaryImage
          path={imgPath}
          imageId={heroBg}
          layout="fill"
          objectFit="cover"
          alt="Drop Background"
          transformations={{ quality: 30 }}
          className="-z-10"
        />
        <div className="max-w-[1600px] mx-auto relative">
          <FluidContainer
            targetWidth={832}
            className="relative flex flex-col items-center justify-center text-center pt-8 mx-auto px-3 max-w-[880px]"
          >
            <>
              <div
                className="max-sm:w-full flex max-sm:justify-center items-center gap-2 max-sm:mb-3 mb-f2"
                style={{
                  maxHeight: 'calc(var(--fluidUnit) * 9',
                  minHeight: '56px'
                }}
              >
                <CloudinaryImage
                  imageId={heroLogo.id}
                  path={imgPath}
                  layout="fixed"
                  height={heroLogo.height / 2}
                  width={heroLogo.width / 2}
                />
              </div>
              <SeriesBadge fluid label={type} className="mb-f2" />
              <FluidText
                tag="h2"
                targetSize={48}
                min={32}
                max={48}
                className="h2 md:h1 mb-f2"
              >
                {mockName}
              </FluidText>
              <FluidText
                tag="p"
                targetSize={18}
                min={16}
                max={18}
                className="body-lg mb-f2"
              >
                {mainCopy}
              </FluidText>
              <AvailDate time_launch={time_launch} drop={drop} />
              {drop.state == 'lite_ultra' && (
                <div className="flex max-sm:justify-center gap-2">
                  <CircleIconLink name="discord" url={discordUrl} />
                  <CircleIconLink name="twitter" url={SOCIAL_LINKS.twitter} />
                  <CircleIconLink
                    name="instagram"
                    url={SOCIAL_LINKS.instagram}
                  />
                </div>
              )}
            </>
          </FluidContainer>
          <DropButtons drop={drop} />
          <div className="relative aspect-[65/49] md:aspect-[1439/431] max-w-[1600px] mx-auto w-full mt-4">
            <CloudinaryImage
              path={imgPath}
              imageId={figuresImg.src}
              layout="responsive"
              objectFit="contain"
              objectPosition="bottom"
              width={figuresImg.width}
              height={figuresImg.height}
              alt="Drop Figures"
            />
          </div>
        </div>
      </div>
    </Countdown>
  )
}

export default DropMonstersHero

const DropButtons = ({ drop }) => {
  if ([DropState.AnnounceLiteUltra].includes(drop.state)) {
    return null
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
                  {(time, disabled) => (
                    <>
                      <Button
                        disabled={disabled}
                        disabledTheme="secondary"
                        theme="white"
                        size="lg"
                        className="tabular-nums"
                        onClick={() =>
                          (location.href = '/reserve-drop/?drop_id=' + drop.id)
                        }
                      >
                        {time}
                      </Button>
                      <ButtonLink
                        size="lg"
                        theme={time === 'Join Queue' ? 'secondary' : 'white'}
                        href={drop.url}
                      >
                        Learn More
                      </ButtonLink>
                    </>
                  )}
                </CountdownTimeDisplay>
              )}
            </CountdownContext.Consumer>
          ) : (
            <>
              <Button
                disabledTheme="secondary"
                theme="white"
                size="lg"
                onClick={() =>
                  (location.href = '/reserve-drop/?drop_id=' + drop.id)
                }
              >
                Buy Now
              </Button>
              <ButtonLink size="lg" theme="secondary" href={drop.url}>
                Learn More
              </ButtonLink>
            </>
          )}
        </div>
      </div>
    )
  } else {
    return (
      <div className="relative flex flex-col items-center justify-center text-center mt-f8 mx-auto px-2 max-w-[832px]">
        <div className="flex max-sm:flex-col max-sm:items-center gap-2">
          <ButtonLink size="lg" theme="white" href={drop.url}>
            Learn More
          </ButtonLink>
        </div>
      </div>
    )
  }
}

const AvailDate = ({ time_launch, drop }) => {
  // Let's be very specific about the drop states where we don't want an availability date shown.
  switch (drop.state) {
    case DropState.SaleContinued:
    case DropState.SaleEnded:
    case DropState.SoldOut:
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
              <FluidText
                tag="div"
                targetSize={18}
                min={16}
                className="body-lg max-w-fit relative inline-flex flex-col items-center sm:block mb-f2"
              >
                <DropAvailability drop={drop} time_remaining={value}>
                  {message => message}
                </DropAvailability>
                <div className="-order-1 flex mb-1 mt-half sm:mb-0 sm:-mt-1 translate-y-[2px] ml-f1 w-[31px] h-[31px] border-1 border-white rounded-full sm:inline-flex items-center justify-center">
                  <Icon name="calendar" className="h-[17px] w-[17px]" />
                </div>
              </FluidText>
            )
          } else {
            return null
          }
        }}
      </CountdownContext.Consumer>
    )
  }

  return null
}
