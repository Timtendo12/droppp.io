import React from 'react'
import { FixedSizeArray } from '@/util/types'
import CloudinaryVideo from '@/components/CloudinaryAnimatedVideo'
import styles from './styles.module.scss'
import { MergedDrop } from '@/config/drops/schema'
import { classNames } from '@/util/tailwindHelpers'

interface Props {
  className?: string
  drop: MergedDrop
}

const DropCardFan2D = ({ drop, className }: Props) => {
  const imgPath = `drops/${drop.cloudinaryFolder}/`
  const cards = drop.cardsFan.cards as unknown as FixedSizeArray<7, string>

  return (
    <section
      className={classNames(
        // @TODO - clean up sharing of aspect and max width with here and the landing hero
        'relative aspect-[8/2.5] lg:aspect-[5/1] max-w-[600px] lg:max-w-[1600px] mx-auto mt-6',
        className
      )}
    >
      <div className="absolute inset-0 aspect-[8/5] lg:aspect-[5/2] max-w-[600px] lg:max-w-[1600px] mx-auto">
        {cards.map((src, key) => (
          <CloudinaryVideo
            resizeByWidth={400}
            key={key}
            videoId={src}
            className={styles.cardFan_cards_card}
            path={imgPath}
          />
        ))}
      </div>
    </section>
  )
}

export default DropCardFan2D
