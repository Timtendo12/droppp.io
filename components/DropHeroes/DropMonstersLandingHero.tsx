import moment from 'moment'
import dynamic from 'next/dynamic'
import { CountdownContext } from '@/contexts/countdown'
import {
  calcTimeRemaining,
  eightHoursPrior,
  queueOpen
} from '@/util/timeHelpers'
import CloudinaryImage from '@/components/CloudinaryImage'
import Button, { ButtonLink } from '@/components/Button'
import Icon from '@/components/Icon'
import DropAvailability from '@/components/DropAvailability'
import FluidContainer from '@/components/FluidContainer'
import { FluidText } from '@/components/FluidText'
import SeriesBadge from '@/components/SeriesBadge'
import { DropState } from '@/enum'
import useBreakpoints from '@/hooks/useBreakpoints'
import ScrollToPacksButton from './ScrollToPacksButton'
import MonsterPromoHeader from '@/components/MonsterPromoHeader'
import { DROP_BLADE_GRADIENTS } from '@/constants/drops'
import { isMpEnabled } from '@/util'
import NiceModal from '@ebay/nice-modal-react'
import { MODAL_ID } from '@/constants/modalId'
import { DropStats } from '../MarketingStats'

const CountdownTimeDisplay = dynamic(() => import('../CountdownTimeDisplay'), {
  ssr: false
})

interface Props {
  drop: any
}

const DropMonstersLandingHero = ({ drop }: Props) => {
  const { isMedium, isMobile } = useBreakpoints()
  const {
    cloudinaryFolder,
    heroBg,
    heroFigures,
    heroFiguresMobile,
    mockName,
    mainCopy,
    by,
    heroLogo,
    heroGradient = DROP_BLADE_GRADIENTS,
    type
  } = drop
  const imgPath = `drops/${cloudinaryFolder}/`
  const dropHasEnded = ['sold_out', 'ended'].includes(drop.state)

  const figuresImg = isMedium
    ? { src: heroFigures, width: 1520, height: 1146 }
    : {
        src: heroFiguresMobile,
        width: 780,
        height: 588
      }

  // needs to be refactored for drops / home
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

  return (
    <>
      {isMpEnabled() && <MonsterPromoHeader />}
      <section className="relative flex transform-gpu">
        <CloudinaryImage
          imageId={heroBg}
          path={imgPath}
          layout="fill"
          objectFit="cover"
          alt={`${mockName} - drop background`}
          className="-z-10"
        />
        {getHeroGradient(heroGradient)}

        <div className="container text-center relative">
          <FluidContainer targetWidth={1200}>
            {/* Copy */}
            <div className="pt-f11">
              <div className="flex flex-col items-center text-center gap-2">
                <div
                  className="max-sm:w-full flex max-sm:justify-center items-center gap-2"
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
                <SeriesBadge fluid label={type} className="inline-block" />
                <FluidText
                  tag="h1"
                  targetSize={56}
                  min={40}
                  className="h2 md:h1"
                >
                  <span dangerouslySetInnerHTML={{ __html: mockName }} />
                </FluidText>
                <FluidText tag="p" targetSize={18} min={16} className="body-lg">
                  {mainCopy}
                </FluidText>
                <FluidText tag="p" targetSize={18} min={16} className="body-lg">
                  By {by}
                  <Icon
                    name="guaranteeCheck"
                    className="inline-block ml-1 -mt-[3px]"
                  />
                </FluidText>
                <AvailDate drop={drop} dropHasEnded={dropHasEnded} />
              </div>
              <DropButtons drop={drop} dropHasEnded={dropHasEnded} />
            </div>
            <DropStats drop={drop} type="monster" />
            {/* Image */}
            <div className="relative aspect-[65/49] md:aspect-[1439/431] max-w-[1600px] mx-auto w-full mt-4">
              <CloudinaryImage
                path={imgPath}
                imageId={figuresImg.src}
                alt="Drop Figures"
                layout={isMedium ? 'fill' : 'responsive'}
                objectFit="contain"
                objectPosition={isMedium ? 'left bottom' : '0'}
                width={figuresImg.width / 2}
                height={figuresImg.height / 2}
              />
            </div>
          </FluidContainer>
        </div>
      </section>
    </>
  )
}

export default DropMonstersLandingHero

const AvailDate = ({ drop, dropHasEnded }) => {
  const remaining = calcTimeRemaining(drop.time_launch)

  // Don't show an availability date if the drop state is SaleContinued.
  if (drop.state === DropState.SaleContinued) {
    return null
  }

  if (!queueOpen(remaining)) {
    return (
      <CountdownContext.Consumer>
        {value => {
          if (!queueOpen(Number(value))) {
            return (
              <FluidText
                tag="p"
                targetSize={18}
                min={16}
                className="body-md max-w-fit relative inline-flex flex-col items-center sm:block"
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

  if (dropHasEnded) {
    return (
      <CountdownContext.Consumer>
        {() => (
          <p className="body lg:body-md max-w-fit relative inline-flex flex-col items-center sm:block">
            Released on {moment.utc(drop.time_launch).format('MMM D, YYYY')}
          </p>
        )}
      </CountdownContext.Consumer>
    )
  }

  return null
}

const DropButtons = ({ drop, dropHasEnded }) => {
  const handleShowMarketplaceOptions = () => {
    NiceModal.show(MODAL_ID.otherMarketplaceOptions, { asset: drop })
  }

  const renderButtons = () => {
    if (dropHasEnded) {
      return isMpEnabled() ? (
        <ButtonLink theme="white" size="lg" href={`${drop.url}/shop`}>
          Shop Collection
        </ButtonLink>
      ) : (
        <div className="flex flex-col items-center md:flex-row md:items-start gap-2">
          <Button
            theme="white"
            size="lg"
            onClick={handleShowMarketplaceOptions}
          >
            Marketplace Options
          </Button>
        </div>
      )
    }

    const remaining = calcTimeRemaining(drop.time_launch)

    return (
      <div className="flex max-sm:flex-col max-sm:items-center gap-2">
        {drop.state !== DropState.SaleContinued ? (
          <CountdownContext.Consumer>
            {value => (
              <CountdownTimeDisplay
                drop={drop}
                timeRemainingInSeconds={Number(value)}
              >
                {(time, disabled) => {
                  const buttonTheme =
                    time === 'Join Queue' ? 'white' : 'secondary'
                  const buttonLinkTheme =
                    time === 'Join Queue' ? 'secondary' : 'white'

                  const timeDisplay = !eightHoursPrior(remaining)
                    ? 'Join Queue'
                    : time
                  return (
                    <>
                      <Button
                        disabled={disabled}
                        disabledTheme="secondary"
                        theme={buttonTheme}
                        size="lg"
                        className="tabular-nums"
                        onClick={() =>
                          (location.href = '/reserve-drop/?drop_id=' + drop.id)
                        }
                      >
                        {timeDisplay}
                      </Button>
                      <ScrollToPacksButton theme={buttonLinkTheme}>
                        Learn More
                      </ScrollToPacksButton>
                    </>
                  )
                }}
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
    )
  }

  return (
    <div className="relative flex flex-col items-center justify-center text-center mx-auto max-w-[832px] mt-3">
      <div className="flex flex-col md:flex-row items-center gap-2">
        {renderButtons()}
      </div>
    </div>
  )
}
