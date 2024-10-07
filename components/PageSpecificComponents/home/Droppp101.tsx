import useBreakpoints from '@/hooks/useBreakpoints'
import { ButtonLink } from '@/components/Button'
import FluidContainer from '@/components/FluidContainer'
import HeroImage from '@/components/HeroImage'
import classNames from 'classnames'
import { useWindowWidth } from '@/contexts/windowDimensions'
import { SetUpProgress } from '@/hooks/useSetUpProgress'

const imgPath = 'pages/home/'

interface Props {
  setUpProgress: SetUpProgress
  className?: string
}

const subcopyWidth = (windowWidth: number): number => {
  if (windowWidth > 996) {
    return 46
  } else if (windowWidth > 872) {
    return 66
  }
  return 100
}

const Droppp101 = ({ className }: Props) => {
  const { isMedium } = useBreakpoints(['md'])
  const windowWidth = useWindowWidth()

  const heroImageProps = {
    path: imgPath,
    id: 'whale4-1',
    alt: 'Monster teaching a student at a chalkboard',
    sizing: { height: { mini: 364, full: 1638 }, ratio: 2.8, maxWidth: 1600 },
    // Custom Options: to container, image offset & sizing
    doubleRatio: true,
    className: 'md:absolute md:bottom-0 md:z-[-1]',
    offset: `translate-x-[-40%] min-[420px]:translate-x-[-8%] md:translate-x-[14%] max-md:mt-[-60px] `
  }

  return (
    <div className={classNames('overflow-hidden', className)}>
      <section className="md:container relative">
        <FluidContainer
          targetWidth={1200}
          className="inset-0 mx-3 pt-0 md:pt-8 md:pb-8 md:min-h-[500px] lg:min-h-[600px] flex flex-col items-center text-center md:justify-center md:text-left md:items-start"
        >
          <>
            <h2 className="h2 lg:h1 max-sm:mb-2 mb-2 !leading-none md:mt-0">
              Continuing Ed
            </h2>
            <div
              className="max-sm:!w-full max-sm:max-w-lg"
              style={{
                width: isMedium
                  ? `calc(var(--fluidUnit) * ${subcopyWidth(windowWidth)})`
                  : ''
              }}
            >
              <p className="body md:body-lg mb-4">
                Graduate to the next level by completing the getting started
                guide, or study up and learn how our drops work so you can
                participate without missing a beat.
              </p>
            </div>
            <div
              className={classNames('inline-flex gap-2', {
                'flex-col items-start': windowWidth < 1074,
                'items-center': windowWidth <= 768
              })}
            >
              <ButtonLink
                theme="white"
                size="lg"
                className="w-max"
                href="/get-started"
              >
                View Guide
              </ButtonLink>
              <ButtonLink
                theme="gray-transparent"
                size="lg"
                className="w-max"
                href="/faq"
              >
                View FAQ
              </ButtonLink>
            </div>
          </>
        </FluidContainer>
        <HeroImage {...heroImageProps} />
      </section>
    </div>
  )
}

export default Droppp101
