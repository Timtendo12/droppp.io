import classNames from 'classnames'
import React, { CSSProperties, ReactNode } from 'react'
import { cssFormattedSpacing } from '@/util/tailwindHelpers'
import CloudinaryImage from './CloudinaryImage'

interface IImage {
  src: string
  alt: string
  path: string
}

export interface ICard extends React.ComponentPropsWithoutRef<'div'> {
  className?: string
  children: ReactNode
  imageComponent: ReactNode
  isSmallLayout: boolean
  logo?: IImage
  theme?: 'secondary' | 'default'
  style?: CSSProperties
}

const Card = ({
  className = '',
  imageComponent,
  isSmallLayout,
  logo,
  children,
  theme = 'default',
  ...rest
}: ICard) => {
  const borderRadius = isSmallLayout
    ? `calc(var(--extrinsicScale) * ${cssFormattedSpacing(4)})`
    : '4em'
  return (
    <div
      className={classNames(
        className,
        'overflow-hidden flex flex-col border-1 border-defaultBorder'
      )}
      style={{ borderRadius: borderRadius }}
      {...rest}
    >
      <>
        <div
          className={classNames('relative flex', {
            'aspect-[200/159]': isSmallLayout,
            'aspect-[338/304]': !isSmallLayout
          })}
        >
          {imageComponent && imageComponent}
          {logo && (
            <div
              className="rounded-full absolute"
              style={{
                boxShadow: '0px .25em 3em rgba(9, 9, 9, 0.24)',
                height: isSmallLayout ? '4em' : '7em',
                width: isSmallLayout ? '4em' : '7em',
                bottom: isSmallLayout ? '.768em' : '2em',
                right: isSmallLayout ? '.925em' : '2em'
              }}
            >
              <CloudinaryImage
                path={logo.path}
                imageId={logo.src}
                layout="fill"
                objectFit="cover"
                alt={logo.alt}
              />
            </div>
          )}
        </div>
        <div
          className={`flex-1 flex flex-col justify-center ${getCardContentClasses(
            theme
          )}`}
        >
          {children}
        </div>
      </>
    </div>
  )
}

export default Card

const getCardContentClasses = (theme: ICard['theme']) => {
  let result = ''

  switch (theme) {
    case 'secondary':
      return 'bg-gray-850'

    default:
      return ''
  }

  return result
}
