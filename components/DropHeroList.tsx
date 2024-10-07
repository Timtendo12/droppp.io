import React from 'react'
import { Drop } from '@/types/drop'
import { sortDropsByLaunchDate } from '@/util/dropHelpers'

type Props = {
  drops: Drop[]
  children: (drop: Drop, index: number) => JSX.Element
}

export default function DropHeroList({ drops, children }: Props) {
  const sortedDrops = sortDropsByLaunchDate(drops)

  return (
    <>
      {sortedDrops.map((drop, index) => {
        return children(drop, index)
      })}
    </>
  )
}
