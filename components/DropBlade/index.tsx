import Card from '@/components/Card'
import Link from 'next/link'
import CloudinaryImage from '@/components/CloudinaryImage'
import classNames from 'classnames'
import Badge from '@/components/Badge'
import Icon from '@/components/Icon'
import { DROP_PAGE_TARGET } from '@/constants/drops'
import { ReactNode } from 'react'
import DropBladeDateSubContent from './DropBladeDateSubContent'
import { dropPageTargetUrl } from '@/util/dropHelpers'
import ExclusiveProductBadge from '../ProductCard/ExclusiveProductBadge'

export type DropBladeData = {
  id: number
  url: string
  mockName: string
  cardBg: string
  cardBgSmall: string
  cardLogo: string
  type: string
  cloudinaryFolder: string
  exclusive: boolean
  time_launch: string
}
interface IProps {
  className?: string
  dropPageTarget?: DROP_PAGE_TARGET
  drop: DropBladeData
  isSmallLayout: boolean
  subContentSlot?: ReactNode
}

export const DropBlade = ({
  className = '',
  dropPageTarget = DROP_PAGE_TARGET.overview,
  drop,
  isSmallLayout,
  subContentSlot = (
    <DropBladeDateSubContent
      isSmallLayout={isSmallLayout}
      time_launch={drop.time_launch}
    />
  )
}: IProps) => {
  const {
    url,
    mockName,
    cardBg,
    cardBgSmall,
    cardLogo,
    type,
    cloudinaryFolder,
    exclusive
  } = drop
  const imgPath = `drops/${cloudinaryFolder}/`

  const image =
    isSmallLayout && cardBgSmall
      ? {
          src: cardBgSmall,
          alt: 'Drop Card'
        }
      : {
          src: cardBg,
          alt: 'Drop Card'
        }

  const logo = {
    src: cardLogo,
    path: imgPath,
    alt: 'Drop Logo'
  }

  return (
    <Link
      href={dropPageTargetUrl(dropPageTarget, url)}
      className="aspect-[338/450] flex card--hover "
    >
      <Card
        theme="secondary"
        className={classNames('flex-1', className)}
        isSmallLayout={isSmallLayout}
        imageComponent={
          <CloudinaryImage
            imageId={image.src}
            path={imgPath}
            layout="fill"
            objectFit="cover"
            alt={image.alt}
          />
        }
        logo={logo}
      >
        <div
          className={`flex flex-col justify-center ${
            isSmallLayout ? 'gap-[1em]' : 'gap-[1.25em]'
          }`}
          style={{ margin: isSmallLayout ? '0 1.5em' : '0 3em' }}
        >
          {exclusive ? (
            <div className="flex items-center gap-[1em]">
              <Badge
                label={type}
                className="!border-white self-start"
                size={isSmallLayout ? 'fluid-sm' : 'fluid-lg'}
              />
              <ExclusiveProductBadge
                isVisible={true}
                isSmallLayout={isSmallLayout}
              />
            </div>
          ) : (
            <Badge
              label={type}
              className="!border-white self-start"
              size={isSmallLayout ? 'fluid-sm' : 'fluid-lg'}
            />
          )}
          <div className="flex flex-col justify-center gap-[1em]">
            <p
              className={classNames(
                'h5 w-full transform-gpu line-clamp-2 text-pretty'
              )}
              style={{
                fontSize: isSmallLayout ? '1.5em' : '2.25em',
                lineHeight: isSmallLayout ? '1.20em' : '1.10em'
              }}
              dangerouslySetInnerHTML={{ __html: mockName }}
            />

            <div
              className="text-gray-300 uppercase transform-gpu"
              style={{
                fontSize: isSmallLayout ? '1.5em' : '2em',
                lineHeight: '1em'
              }}
            >
              {subContentSlot}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default DropBlade
