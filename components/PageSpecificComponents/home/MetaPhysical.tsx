import classNames from 'classnames'
import { ButtonLink } from '@/components/Button'
import FluidContainer from '@/components/FluidContainer'
import { FluidText } from '@/components/FluidText'
import HeroImage from '@/components/HeroImage'
import useBreakpoints from '@/hooks/useBreakpoints'
import { useWindowWidth } from '@/contexts/windowDimensions'

const imgPath = 'pages/home/'

interface Props {
  className?: string
}

const MetaPhysical = ({ className }: Props) => {
  const { isMedium } = useBreakpoints(['md'])
  const windowWidth = useWindowWidth()
  const heroImageProps = {
    path: imgPath,
    id: 'hero1_l0epsr',
    alt: 'Monster teaching a student at a chalkboard',
    sizing: { height: { mini: 364, full: 1298 }, ratio: 2.69, maxWidth: 1800 },
    // Custom Options: to container, image offset & sizing
    doubleRatio: true,
    className: '-mt-8 md:mt-0',
    offset: `translate-x-[-10%] min-[420px]:translate-x-[-5%] md:translate-x-[20%]`
  }

  return (
    <div className={classNames('overflow-hidden', className)}>
      <section className="md:container relative">
        <FluidContainer
          targetWidth={1200}
          className={`inset-0 mx-4 flex flex-col items-center text-center md:absolute md:justify-center md:text-left md:items-start`}
        >
          <>
            <h2 className="h2 lg:h1 mb-2 !leading-none md:mt-0">
              Meta.
              <br />
              Physical.
            </h2>
            <div
              className="max-sm:!w-full max-sm:max-w-lg"
              style={{
                width: isMedium ? 'calc(var(--fluidUnit) * 52)' : 'initial'
              }}
            >
              <FluidText
                targetSize={18}
                min={16}
                tag="p"
                className={classNames('body-lg mb-f4', {
                  'line-clamp-2': windowWidth > 768 && windowWidth < 1074
                })}
              >
                Join the digital collecting phenomenon and begin collecting the
                world’s most beloved pop culture collectibles, digitally
                and&nbsp;physically.
              </FluidText>
            </div>
            <div
              className={classNames('inline-flex gap-2', {
                'flex-col items-start': windowWidth < 1074,
                'items-center': windowWidth <= 768
              })}
            >
              <ButtonLink
                theme="white"
                size={'lg'}
                className="w-max"
                href="/auth"
              >
                Create Account
              </ButtonLink>
              <ButtonLink
                theme="gray-transparent"
                size={'lg'}
                className="w-max"
                href="/get-started"
              >
                Guide Me
              </ButtonLink>
            </div>
          </>
        </FluidContainer>
        <HeroImage {...heroImageProps} />
      </section>
    </div>
  )
}

export default MetaPhysical
