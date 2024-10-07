import classNames from 'classnames'
import CloudinaryImage, { defaultBackground } from '@/components/CloudinaryImage'
import FluidContainer from '@/components/FluidContainer'
import useBreakpoints from '@/hooks/useBreakpoints'

type ImageHeight = {
  mini: number
  full: number
}

type ImageSize = {
  height: ImageHeight
  ratio: number
  maxWidth: number
}

type HeroImageProps = {
  id: string
  alt: string
  path: string
  sizing: ImageSize
  offset?: string
  className?: string
  doubleRatio?: boolean
  transformations?: Record<string, string>
}

const HeroImage = ({
  id,
  alt,
  path,
  sizing,
  offset = '',
  className = '',
  doubleRatio = false,
  transformations = defaultBackground
}: HeroImageProps) => {
  // Setup ///////////////////////////////////////////////////////////////////////

  const { isMedium } = useBreakpoints()

  const { maxWidth, ratio, height } = sizing

  const type = isMedium ? 'responsive' : 'fixed'
  const size = isMedium
    ? { width: height.full * ratio, height: height.full }
    : { width: height.mini * ratio, height: height.mini }

  // Styles ///////////////////////////////////////////////////////////////////////

  // Container & ImageWrapper
  const $size = 'aspect-[var(--hero-size)] w-full flex-row'
  const $dbRt = doubleRatio ? 'md:!aspect-[2]' : ''
  // Container & Image
  const $minH = 'min-h-[var(--hero-minH)]'
  // Container
  const $maxC = 'max-w-[var(--hero-maxW)] md:min-h-max'
  // Image
  const $mdImg =
    'md:aspect-[var(--hero-size)] md:min-w-full' +
    (doubleRatio ? ' md:min-h-full' : '')
  // Dynamic Sizing Variables
  const $vars = {
    '--hero-size': `${ratio}`,
    '--hero-minH': `${height.mini}px`,
    '--hero-maxW': `${maxWidth}px`
  }

  // Classes ///////////////////////////////////////////////////////////////////////

  const $container = classNames(`
    ${$size} ${$dbRt} ${$minH} ${$maxC}
    items-end mx-auto
    ${className}
  `)
  const $imgWrap = classNames(`
    ${$size} ${$dbRt} ${offset}
    relative -z-10
  `)
  const $img = classNames(`
    ${$minH} ${$mdImg}
    absolute -translate-x-1/2 left-1/2 md:bottom-0
  `)

  // Render ///////////////////////////////////////////////////////////////////////

  return (
    <FluidContainer targetWidth={maxWidth} className={$container} style={$vars}>
      <div className={$imgWrap}>
        <div className={$img}>
          <CloudinaryImage
            imageId={id}
            path={path}
            layout={type}
            width={size.width}
            height={size.height}
            transformations={transformations}
            alt={alt}
          />
        </div>
      </div>
    </FluidContainer>
  )
}

export default HeroImage
