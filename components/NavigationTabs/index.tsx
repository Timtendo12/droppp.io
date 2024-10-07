// components
import {
  ActionLinkDefinition,
  HrefLinkDefinition,
  LinkDefinition
} from '@/types/links'
import HorizontalNavigation from '@/components/HorizontalNavigation'
import QuantityBadge from '@/components/QuantityBadge'
import { numberWithCommas } from '@/util/numberHelpers'
import classNames from 'classnames'
import { BREAKPOINTS } from '@/constants'
import { ReactNode } from 'react'
import QuantityValueBadge from '../PageSpecificComponents/inventory/QuantityValueBadge'
import { useRouter } from 'next/router'

export type NavigationTabsConfiguration<L extends LinkDefinition> = {
  className?: string
  title: string
  subtitle?: string | ReactNode
  subtitleIconSlot?: ReactNode
  count?: number
  value?: number
  links?: L[]
  activeItem?: L
  ref?: React.Ref<HTMLDivElement>
}

interface Props<L extends LinkDefinition>
  extends NavigationTabsConfiguration<L> {}

const NavigationTabs = <L extends ActionLinkDefinition | HrefLinkDefinition>({
  className,
  title,
  subtitle,
  subtitleIconSlot,
  count,
  value,
  ref,
  links = []
}: Props<L>) => {
  const {
    query: { show_only_listings }
  } = useRouter()
  return (
    <div
      className={classNames(
        className,
        'h-[var(--secondaryNavHeight)] flex justify-between items-center flex-1 min-w-0'
      )}
      ref={ref}
    >
      {title && (
        <div className="flex-1 flex flex-col justify-center uppercase min-w-0 mr-3 gap-[6px]">
          <div className="flex gap-1 items-center">
            <NavigationTabsSubtitle>
              <span dangerouslySetInnerHTML={{ __html: subtitle.toString() }} />
            </NavigationTabsSubtitle>
            {subtitleIconSlot && (
              <div className="relative flex-shrink-0 w-[20px] h-[14px] [&>*]:absolute [&>*]:top-1/2 [&>*]:left-1/2 [&>*]:-translate-x-1/2 [&>*]:-translate-y-1/2">
                {subtitleIconSlot}
              </div>
            )}
          </div>
          <div className="flex items-center">
            <NavigationTabsTitle className="sm:whitespace-nowrap text-sm min-[550px]:text-lg leading-tight font-black truncate">
              {title}
            </NavigationTabsTitle>
            {typeof count !== 'undefined' &&
              (typeof value !== 'undefined' && !show_only_listings ? (
                <QuantityValueBadge
                  className="ml-1"
                  quantity={count}
                  value={value}
                />
              ) : (
                <QuantityBadge
                  value={numberWithCommas(count)}
                  className="ml-1"
                />
              ))}
          </div>
        </div>
      )}

      {!!links.length && (
        <HorizontalNavigation
          dropDownConfig={{
            hideActiveLabel: true,
            triggerAlignment: 'right',
            hasFullWidthOptions: true
          }}
          forceCollapseAtViewportWidth={BREAKPOINTS.md}
          className="max-md:!absolute max-md:inset-0 max-md:z-10 max-md:flex"
          items={links}
        />
      )}
    </div>
  )
}

export default NavigationTabs

interface TitleProps {
  className?: string
  children: React.ReactNode
}

export const NavigationTabsTitle = ({ children, className }: TitleProps) => {
  return (
    <h2
      className={classNames(
        'sm:whitespace-nowrap text-sm min-[550px]:text-lg leading-tight font-black truncate uppercase',
        className
      )}
    >
      {children}
    </h2>
  )
}

export const NavigationTabsSubtitle = ({ children, className }: TitleProps) => {
  return (
    <h3
      className={classNames(
        'h8 leading-none text-gray-300 truncate',
        className
      )}
    >
      {children}
    </h3>
  )
}
