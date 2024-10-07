import BrandSeparator from '@/components/BrandSeparator'
import CloudinaryImage from '@/components/CloudinaryImage'
import Icon from '@/components/Icon'
import { DROP_THEME } from '@/constants/drops'
import { Drop } from '@/types/drop'

type LogoType = {
  id?: string
  width?: number
  height?: number
}

type BladeLogoProps = {
  logo: LogoType
  mediaPath: string
}

const BladeLogo = ({ logo, mediaPath }: BladeLogoProps) => {
  return (
    <CloudinaryImage
      imageId={logo.id}
      path={mediaPath}
      layout="intrinsic"
      height={logo.height / 2}
      width={logo.width / 2}
    />
  )
}

type DropHeroLogoProps = {
  imgPath: string
  logo1: LogoType
  logo2: LogoType
  exclusive: boolean
  theme: Drop['theme']
}

const DropHeroLogos = ({
  imgPath,
  logo1,
  logo2,
  exclusive,
  theme
}: DropHeroLogoProps) => {
  const isLightTheme = theme === DROP_THEME.LIGHT

  const renderLogos = () => {
    if (exclusive) {
      return (
        <>
          <div className="max-sm:w-full flex max-sm:justify-center items-center gap-2 max-sm:mb-3 mb-2">
            <Icon
              name="funkoLogo"
              className={isLightTheme ? 'text-gray-900' : ''}
            />
            <BrandSeparator theme={theme} />
            <Icon
              name={
                isLightTheme
                  ? 'exclusiveBadgeTextBlack'
                  : 'exclusiveBadgeTextWhite'
              }
            />
          </div>
          <div className="max-sm:w-full flex max-sm:justify-center items-center gap-2 max-sm:mb-3 mb-3">
            {logo2 && (
              <>
                <BladeLogo logo={logo2} mediaPath={imgPath} />
                <BrandSeparator theme={theme} />
              </>
            )}
            <BladeLogo logo={logo1} mediaPath={imgPath} />
          </div>
        </>
      )
    } else {
      return (
        <div
          className="max-sm:w-full flex max-sm:justify-center items-center gap-2 max-sm:mb-3 mb-3"
          style={{
            maxHeight: '9em'
          }}
        >
          <Icon
            name="funkoLogo"
            className={isLightTheme ? 'text-gray-900' : ''}
          />
          <BrandSeparator theme={theme} />
          {logo2 && (
            <>
              <BladeLogo logo={logo2} mediaPath={imgPath} />
              <BrandSeparator theme={theme} />
            </>
          )}
          <BladeLogo logo={logo1} mediaPath={imgPath} />
        </div>
      )
    }
  }
  return renderLogos()
}

export default DropHeroLogos
