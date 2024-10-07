import CloudinaryImage from '@/components/CloudinaryImage'
import FluidContainer from '@/components/FluidContainer'
import { SOCIAL_LINKS } from '@/constants'
import CircleIconLink from '@/components/CircleIconLink'
import useBreakpoints from '@/hooks/useBreakpoints'

const transformations = { background: 'rgb:090909' }

const StayTuned = () => {
  const { isMedium } = useBreakpoints()
  const heroImg = isMedium
    ? { src: 'hero_pk1cid', width: 1862, height: 1230 }
    : {
        src: 'hero-mobile',
        width: 390,
        height: 313
      }

  return (
    <section style={{ paddingTop: 'var(--headerHeight)' }}>
      <div className="max-w-[1280px] w-full mx-auto">
        <div className="relative mb-16 aspect-[69/79] md:aspect-[1200/593] w-full flex flex-col justify-center text-center md:text-left md:items-start">
          <div className="order-last">
            <CloudinaryImage
              imageId={heroImg.src}
              path="pages/drops/"
              alt="Droppp monster holding a boombox"
              layout={isMedium ? 'fill' : 'responsive'}
              objectFit="contain"
              objectPosition={isMedium ? '130% 0' : '0'}
              width={heroImg.width}
              height={heroImg.height}
              transformations={transformations}
              className="-z-10"
            />
          </div>
          <div className="relative z-10 container w-full">
            <FluidContainer
              targetWidth={724}
              className="max-w-[694px] md:max-w-[65%] xl:max-w-[724px] px-3 pt-f8 md:pt-0 mb-3"
            >
              <>
                <h2 className="h2 lg:h1 mb-2">Stay Tuned</h2>
                <p className="body md:body-lg">
                  More drops are on the way. Join the conversation on Discord
                  and follow us on X and Instagram to receive announcements,
                  news, and alerts on upcoming drops and redemptions.
                </p>
              </>
            </FluidContainer>
            <div className="px-3 flex gap-3 max-md:justify-center">
              <CircleIconLink name="discord" url={SOCIAL_LINKS.discord} />
              <CircleIconLink
                name="twitter"
                url={SOCIAL_LINKS.twitter}
                className="mt-f4"
              />
              <CircleIconLink
                name="instagram"
                url={SOCIAL_LINKS.instagram}
                className="mt-f4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StayTuned
