import classNames from 'classnames'
import {
  PAGES_CLOUDINARY_CT_CTA_IMAGE_ID,
  PAGES_CLOUDINARY_CT_CTA_MOBILE_IMAGE_ID,
  PAGES_CLOUDINARY_MARKETPLACE_FOLDER
} from '@/constants/cloudinary'
import { ButtonLink } from '@/components/Button'
import CloudinaryImage from '@/components/CloudinaryImage'
import Icon from '@/components/Icon'
import FluidContainer from '@/components/FluidContainer'
import useBreakpoints from '@/hooks/useBreakpoints'

type Props = {
  className?: string
}

const CollectionTrackerCTA = ({ className }: Props) => {
  const { isTablet } = useBreakpoints()

  const baseContainerClassName =
    'w-full rounded-[32px] relative flex flex-1 flex-col-reverse lg:flex-row items-center lg:aspect-[1184/323] lg:max-h-[323px]'
  return (
    <FluidContainer
      targetWidth={1184}
      className={classNames(baseContainerClassName, className)}
      style={{
        background:
          'linear-gradient(180deg, #171717 0%, rgba(23, 23, 23, 0) 100%)'
      }}
    >
      <div className="w-full justify-center flex flex-1 items-end aspect-[703/255] max-w-[703px] mt-4 px-3 lg:max-w-[425px] lg:aspect-[425/323] lg:mt-0 lg:px-0">
        <div className="relative aspect-[489/255] max-w-[489px] flex-1 z-10 self-end lg:flex lg:aspect-[425/295] lg:max-w-[425px] ">
          <CloudinaryImage
            imageId={
              isTablet
                ? PAGES_CLOUDINARY_CT_CTA_MOBILE_IMAGE_ID
                : PAGES_CLOUDINARY_CT_CTA_IMAGE_ID
            }
            path={PAGES_CLOUDINARY_MARKETPLACE_FOLDER}
            layout={'fill'}
            className={!isTablet ? 'rounded-bl-[32px]' : 'rounded-none'}
            transformations={{
              quality: 80,
              resize: { width: isTablet ? 978 : 850 }
            }}
          />
        </div>
      </div>
      <div
        className="flex flex-col gap-1 justify-center text-left w-full lg:w-auto"
        style={{
          paddingRight: isTablet ? '32px' : '3em',
          paddingLeft: isTablet ? '32px' : '8em',
          paddingTop: isTablet ? '32px' : '0'
        }}
      >
        <Icon
          name="collectionTracker"
          className="mb-1"
          style={{
            width: isTablet ? '32px' : '4em',
            height: isTablet ? '32px' : '4em'
          }}
        />
        <h3 className="h3" style={{ fontSize: isTablet ? '30px' : '4em' }}>
          Click. Collect. Complete.
        </h3>
        <p
          className="text-gray-300"
          style={{
            fontSize: isTablet ? '16px' : 'clamp(14px, 2.25em, 2.25em)'
          }}
        >
          Shop directly from the collection tracker to quickly find and purchase
          missing items.
        </p>
        <ButtonLink
          href="/collection-tracker"
          theme="white"
          className="mt-2 self-start z-20"
        >
          Go To Collection Tracker
        </ButtonLink>
      </div>
    </FluidContainer>
  )
}

export default CollectionTrackerCTA
