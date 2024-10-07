import { useWindowWidth } from '@/contexts/windowDimensions'
import useBreakpoints from '@/hooks/useBreakpoints'
import CloudinaryImage from '@/components/CloudinaryImage'
import FluidContainer from '@/components/FluidContainer'
import { FluidText } from '@/components/FluidText'

const imgPath = 'pages/marketplace/'

const ShopDroppp = () => {
  const { isMedium } = useBreakpoints()
  const windowWidth = useWindowWidth()

  let heroImg: { src: string; width: number; height: number }

  const transformations = {
    background: 'rgb:090909',
    quality: 80,
    resize: { width: isMedium ? 3000 : 1500 }
  }

  if (!isMedium) {
    heroImg = {
      src: 'market-mobile',
      width: 1170,
      height: 918
    }
  } else {
    heroImg = { src: 'dp-home-revised', width: 7013, height: 2673 }
  }

  return (
    <div className="overflow-hidden">
      <section className="md:max-w-[1400px] md:w-full md:mx-auto">
        <div className="md:aspect-[1200/513] flex min-h-0 md:max-h-[513px]">
          <FluidContainer
            targetWidth={1200}
            className="md:flex  relative w-full"
          >
            <>
              <div
                className="max-sm:max-h-[300px] max-md:max-h-[500px] min-h-0 flex-1 relative aspect-[4/3] md:aspect-[16/9] lg:aspect-[180/153] w-full max-md:mb-4"
                style={{
                  marginRight: !isMedium
                    ? 'initial'
                    : 'calc(var(--fluidUnit) * -28)'
                }}
              >
                <CloudinaryImage
                  imageId={heroImg.src}
                  path={imgPath}
                  alt="Lady Monster shopping"
                  objectFit={isMedium ? 'contain' : 'cover'}
                  objectPosition={isMedium ? 'right bottom' : 'center bottom'}
                  layout="fill"
                  transformations={transformations}
                />
              </div>
              <div
                className="container flex flex-col z-10 md:inset-0 md:absolute md:justify-center md:w-full"
                style={{
                  marginLeft: windowWidth >= 1644 ? '50%' : 'auto',
                  transform: windowWidth >= 1644 ? 'translateX(-51%)' : 'none'
                }}
              >
                <FluidText
                  tag="h1"
                  targetSize={64}
                  min={48}
                  max={64}
                  className="h2 md:h1 max-sm:mb-2 mb-f2 !leading-none md:mt-0"
                >
                  Shop.
                  <br />
                  Droppp.
                </FluidText>
                <div
                  className="max-sm:!w-full max-sm:max-w-lg max-w-[443px]"
                  style={{
                    width: isMedium ? 'calc(var(--fluidUnit) * 62)' : 'initial'
                  }}
                >
                  <FluidText
                    targetSize={18}
                    min={16}
                    max={18}
                    tag="p"
                    className="body-lg mb-f4 text-gray-300"
                  >
                    Explore the marketplace, fill your collection, and list your
                    excess inventory.
                  </FluidText>
                </div>
              </div>
            </>
          </FluidContainer>
        </div>
      </section>
    </div>
  )
}

export default ShopDroppp
