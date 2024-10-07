import classNames from 'classnames'
import { ButtonLink } from '@/components/Button'
import CloudinaryImage from '@/components/CloudinaryImage'
import FluidContainer from '@/components/FluidContainer'
import useBreakpoints from '@/hooks/useBreakpoints'

const imgPath = 'pages/home/'

const MarketplaceBlade = () => {
  const { isMedium } = useBreakpoints(['md'])
  const bladeBg = isMedium ? 'mp-hero-desktop' : 'mp-hero-mobile'

  return (
    <section
      className={classNames(`relative overflow-hidden`, {
        'h-[672px]': !isMedium
      })}
    >
      <div
        style={{
          background: isMedium
            ? 'linear-gradient(94.96deg, rgba(9, 9, 9, 0.92) 34.6%, rgba(9, 9, 9, 0.33) 63.25%, rgba(9, 9, 9, 0) 102%)'
            : 'linear-gradient(158.52deg, rgba(9, 9, 9, 0.92) 37.58%, rgba(9, 9, 9, 0.33) 59.23%, rgba(9, 9, 9, 0) 88.49%)'
        }}
        className={`h-[100%] absolute top-0 left-0 right-0 mix-blend-hard-light`}
      ></div>
      <CloudinaryImage
        path={imgPath}
        imageId={bladeBg}
        layout="fill"
        objectFit="cover"
        alt="Marketplace Background"
        className="-z-10"
        transformations={{
          quality: 75,
          resize: { type: 'scale', width: 2500 }
        }}
      />
      <div className="container mx-auto relative">
        <FluidContainer
          targetWidth={1200}
          className="relative flex flex-col items-center justify-center text-center md:items-start md:text-left py-8 md:py-[19.5em]"
        >
          <>
            <div
              className="max-sm:!w-full max-sm:max-w-lg"
              style={{
                width: isMedium ? 'calc(var(--fluidUnit) * 52)' : 'auto'
              }}
            >
              <div className="utility-lg">Buy, sell & Collect</div>
              <h2 className="h2 lg:h1 my-2 !leading-none">
                Shop&nbsp;The Marketplace
              </h2>
              <p className="body md:body-lg mb-4">
                Complete your collection! Buy or sell your favorite digital
                collectibles on the Droppp Marketplace.
              </p>
            </div>
            <ButtonLink
              theme="rainbow"
              size="lg"
              className="w-max"
              href="/marketplace"
            >
              Explore Marketplace
            </ButtonLink>
          </>
        </FluidContainer>
      </div>
    </section>
  )
}

export default MarketplaceBlade
