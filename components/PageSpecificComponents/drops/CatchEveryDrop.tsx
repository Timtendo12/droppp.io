import FluidContainer from '@/components/FluidContainer'
import { FluidText } from '@/components/FluidText'
import { SOCIAL_LINKS } from '@/constants'
import CloudinaryImage from '@/components/CloudinaryImage'
import CircleIconLink from '@/components/CircleIconLink'
import useBreakpoints from '@/hooks/useBreakpoints'

const transformations = { background: 'rgb:090909' }

const CatchEveryDrop = () => {
  const { isMedium } = useBreakpoints()
  const heroImg = isMedium
    ? { src: 'boombox_uu3msl', width: 697, height: 500 }
    : {
        src: 'boombox_uu3msl',
        width: 540,
        height: 388
      }

  return (
    <section>
      <FluidContainer
        targetWidth={1200}
        className="container max-w-[1200px] mx-auto flex-col text-center flex items-center my-8 relative px-3 aspect-[540/388] md:aspect-[1200/500] md:flex-row md:text-left"
      >
        <>
          <div className="md:max-w-[45%]">
            <h2 className="h2 lg:h1 mb-2">Stay Tuned</h2>
            <FluidText tag="p" targetSize={18} min={16} max={18}>
              Join the conversation on Discord and follow us on X and Instagram
              to receive announcements, news, and alerts on upcoming drops and
              redemptions.
            </FluidText>
            <div className="flex gap-2 justify-center md:justify-start mt-4 md:mt-f3">
              <CircleIconLink name="discord" url={SOCIAL_LINKS.discord} />
              <CircleIconLink name="twitter" url={SOCIAL_LINKS.twitter} />
              <CircleIconLink name="instagram" url={SOCIAL_LINKS.instagram} />
            </div>
          </div>
          <div className="w-full mx-auto -z-10">
            <CloudinaryImage
              imageId={heroImg.src}
              path="pages/drops/"
              alt="Boombox"
              layout={isMedium ? 'fill' : 'responsive'}
              objectFit="contain"
              objectPosition={isMedium ? 'center right' : '0'}
              width={!isMedium && heroImg.width}
              height={!isMedium && heroImg.height}
              transformations={transformations}
            />
          </div>
        </>
      </FluidContainer>
    </section>
  )
}

export default CatchEveryDrop
