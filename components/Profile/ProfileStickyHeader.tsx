import React, { useRef } from 'react'
import Image from 'next/legacy/image'
import useIsSticky from '@/hooks/useIsSticky'
import useHiddenHeader from '@/hooks/useHiddenHeader'
import { SECONDARY_NAV_HEIGHT_PX } from '@/constants'
import NavigationTabs from '@/components/NavigationTabs'
import { useRouter } from 'next/router'

interface IProps {
  account: string
  avatar: string
  count: number
}

export default function ProfileStickyHeader({
  account,
  avatar,
  count
}: IProps) {
  const router = useRouter()
  const { query } = router
  const { type = 'All' } = query
  const el = useRef<HTMLDivElement>()
  const isSticky = useIsSticky(el, {
    threshold: 0.999,
    rootMargin: `-${SECONDARY_NAV_HEIGHT_PX} 0px 0px 0px`
  })

  useHiddenHeader(isSticky)

  return (
    <div
      ref={el}
      className="sticky top-[-1px] flex px-2 md:px-4 h-[var(--headerHeight)] md:h-[73px] bg-black z-[22] border-b border-defaultBorder"
    >
      <div
        className={`flex-1 transition-all duration-500 flex items-center ${
          !isSticky ? 'opacity-0 -translate-x-1' : ''
        }`}
      >
        <div className="h-5 w-5 md:h-6 md:w-6 relative mr-[12px]">
          <Image
            className="rounded-xl"
            src={avatar}
            layout="fill"
            alt={`avatar for ${account}`}
          />
        </div>
        <NavigationTabs
          className="flex w-full items-center"
          title={type.toString()}
          subtitle={account}
          count={count}
        />
      </div>
    </div>
  )
}
