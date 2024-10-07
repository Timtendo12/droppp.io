import React from 'react'
import { DefaultLayout } from '@/layouts'
import FluidContainer from '@/components/FluidContainer'
import { FluidText } from '@/components/FluidText'
import { ButtonLink } from '@/components/Button'
import { OG_TAGS } from '@/constants'
import { buildOgImageUrl } from '@/util/cloudinaryHelpers'
import { SUPPORT_EMAIL } from '@/config'
import HeroImage from '@/components/HeroImage'

const imgPath = 'pages/support/'
const imgId = 'hero_zdh0o8'

const SupportPage = () => {
  const ogImage = buildOgImageUrl(`${imgPath}/${OG_TAGS.support.og.image}`)
  const meta = {
    ...OG_TAGS.support,
    og: { ...OG_TAGS.support.og, image: ogImage }
  }

  const heroImageProps = {
    path: imgPath,
    id: imgId,
    alt: 'Monster with many legs answering calls',
    sizing: { height: { mini: 400, full: 1505 }, ratio: 1.91, maxWidth: 1600 },
    // Custom Options: to container, image offset & sizing
    className: '-mt-10 md:-mt-6 overflow-hidden'
  }

  return (
    <DefaultLayout
      seo={meta}
      footerConfiguration={{
        removeDefaultOffset: true
      }}
    >
      <section className="container mb-2 md:flex-1 md:flex flex-col md:h-screen justify-center">
        <div className="z-1 text-center flex flex-col justify-center max-w-[1440px] mx-auto relative z-10">
          <FluidContainer
            targetWidth={632}
            className="max-w-[680px] container flex-0"
          >
            <>
              <FluidText
                targetSize={56}
                min={32}
                max={56}
                tag="h1"
                className="h1 uppercase mb-f2"
              >
                Need Something?
              </FluidText>
              <FluidText
                targetSize={18}
                min={16}
                max={18}
                tag="p"
                className="body-lg"
              >
                Our friendly order and technical support staff are ready and
                waiting. Shoot us a line or hop into Discord and get support
                from our amazing community of&nbsp;collectors.
              </FluidText>
            </>
          </FluidContainer>
          <div className="mx-auto mt-4 flex items-center justify-center flex-col w-full md:flex-row md:gap-3 container">
            <ButtonLink
              theme="rainbow"
              size="lg"
              className="w-[200px]"
              href={`mailto:${SUPPORT_EMAIL}`}
            >
              Contact Support
            </ButtonLink>
            <ButtonLink
              theme="white"
              size="lg"
              className="mt-3 md:mt-0 flex-0 min-w-[200px]"
              href="/faq"
            >
              FAQ
            </ButtonLink>
          </div>
        </div>
        <div className="-ml-2 -mr-2">
          <HeroImage {...heroImageProps} />
        </div>
      </section>
    </DefaultLayout>
  )
}
export default SupportPage
