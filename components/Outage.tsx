import React from 'react'
import CloudinaryImage from './CloudinaryImage'
import { DefaultLayout } from '@/layouts'
import useBreakpoints from '@/hooks/useBreakpoints'

const SEO = {
  title: 'Oops!',
  description: 'Oops!',
  keywords: ''
}

const Outage = () => {
  const { isMobile } = useBreakpoints()
  const objectPosition = isMobile ? '60% center' : '50% 50%'
  const objectFit = isMobile ? 'cover' : 'contain'

  return (
    <DefaultLayout
      seo={SEO}
      header={false}
      footerConfiguration={{ removeDefaultOffset: true }}
    >
      <section className="container md:flex-1 md:flex flex-col md:h-screen mt-8">
        <div className="flex-1 flex flex-col text-center items-center justify-center mx-2">
          <div className="h1 mb-2">Please stand by</div>
          <div className="body-lg max-w-[560px] mb-4">
            We encountered an issue. Please refresh your browser and try again.
          </div>
          <div className="aspect-[390/516] w-screen md:min-w-[800px] max-h-[599px] relative">
            <CloudinaryImage
              path="global/503/"
              imageId="503-error-desktop"
              layout="fill"
              objectFit={objectFit}
              objectPosition={objectPosition}
              transformations={{ background: 'rgb:090909' }}
            />
          </div>
        </div>
      </section>
    </DefaultLayout>
  )
}

export default Outage
