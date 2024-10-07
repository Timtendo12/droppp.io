import { classNames } from '@/util/tailwindHelpers'
import Image from 'next/legacy/image'
import React from 'react'
import styles from './styles.module.scss'
import { CollectionsItemType } from '@/api/resources/user/tracker/drops/get/schema'

interface Props {
  collection: CollectionsItemType
  size?: 'default' | 'large'
  className?: string
  isActive?: boolean
}

const CollectionThumb = ({
  collection,
  size = 'default',
  className,
  isActive = true
}: Props) => {
  const { fallback, redeem_img, redeem_media_size3_url } = collection
  const isLarge = size === 'large'
  const containerClass = isLarge
    ? 'w-[150px] h-[150px] rounded-[48px]'
    : 'w-7 h-7 rounded-2xl'
  return (
    <div
      className={classNames(
        'relative overflow-hidden bg-white/15',
        containerClass,
        className,
        {
          'bg-[var(--hoverColor)]': !fallback && (isLarge || isActive)
        }
      )}
    >
      <Image
        className={!fallback ? styles.img : ''}
        src={isLarge ? redeem_img : redeem_media_size3_url}
        alt="Collection Figure"
        layout="fill"
        objectFit="contain"
      />
    </div>
  )
}

export default CollectionThumb
