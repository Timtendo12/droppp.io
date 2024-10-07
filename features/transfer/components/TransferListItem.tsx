import React from 'react'
import PreviewMedia from '@/components/PreviewMedia'
import classNames from 'classnames'
import { MEDIA_SIZES } from '@/constants'
import { MediaItem } from '@/api/resources/shared/media'

interface Props {
  className?: string
  item: {
    id: number
    media: MediaItem
    label: string
    items: {
      id: string | number
      mint_num: string | number
    }[]
    isPfp?: boolean
  }
  isEditing?: boolean
  rightColumnChildren?: React.ReactNode
}

export default function TransferListItem({
  className,
  item,
  isEditing = false,
  rightColumnChildren = null
}: Props) {
  const { id, media, label, items, isPfp } = item
  return (
    <li
      key={id}
      className={classNames(
        'flex pb-3 gap-1 [&:not(:last-child)]:border-b border-defaultBorder',
        className
      )}
    >
      <div className="flex-1 flex ">
        <div className="w-5 h-5 mr-2 flex-shrink-0">
          <PreviewMedia
            className={classNames(
              'object-contain object-center max-w-full max-h-full',
              { ['rounded-lg overflow-hidden']: isPfp }
            )}
            size={MEDIA_SIZES.TINY}
            media={media}
          />
        </div>
        <div className="w-full">
          <h3 className="body-sm pb-half">{label}</h3>
          <ul
            className={classNames('flex flex-wrap gap-half w-full', {
              'my-1': isEditing
            })}
          >
            {/* List of duplicate asset templates */}
            {items.map(({ id, mint_num }) => (
              <div
                key={id}
                className={classNames(
                  'body-sm text-gray-300 flex justify-between items-center',
                  {
                    ["after:content-[',_'] last:after:content-['']"]: !isEditing
                  }
                )}
              >
                <small>#{mint_num}</small>
              </div>
            ))}
          </ul>
        </div>
      </div>
      {rightColumnChildren}
    </li>
  )
}
