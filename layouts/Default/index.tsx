import classnames from 'classnames'
import React, { ReactNode } from 'react'
import Header, { Props as HeaderProps } from '@/components/Header'
import Footer, { Props as FooterProps } from '@/components/Footer'
import Seo, { ISeo } from '@/components/Seo'
import {
  SECONDARY_NAV_HEIGHT_PX,
  SECONDARY_NAV_HEIGHT_MOBILE_PX
} from '@/constants'
import useBreakpoints from '@/hooks/useBreakpoints'
import { Loading } from '@/components'

export type HeaderConfiguration = {
  offset?: {
    default: number
    md: number
  }
  removeNavigationSpacing?: boolean
} & HeaderProps

const DefaultHeaderConfiguration = {
  offset: { default: 32, md: 64 },
  removeNavigationSpacing: false,
  translucent: true
}

export type FooterConfiguration = {
  removeDefaultOffset?: boolean
  hasBorder?: boolean
} & FooterProps

const DefaultFooterConfiguration: FooterConfiguration = {
  removeDefaultOffset: false,
  hasBorder: false
}

export interface Props {
  children: ReactNode
  mainElementClassName?: string
  isLoading?: boolean
  seo: ISeo
  header?: ReactNode | false
  headerConfiguration?: HeaderConfiguration
  footerConfiguration?: FooterConfiguration | false
  rootLevelChildren?: ReactNode
}

const DefaultLayout = ({
  children,
  mainElementClassName,
  isLoading,
  seo,
  header,
  headerConfiguration = DefaultHeaderConfiguration,
  footerConfiguration = DefaultFooterConfiguration,
  rootLevelChildren
}: Props) => {
  const { isMobile } = useBreakpoints()
  headerConfiguration = {
    ...DefaultHeaderConfiguration,
    ...headerConfiguration
  }

  footerConfiguration = footerConfiguration && {
    ...DefaultFooterConfiguration,
    ...footerConfiguration
  }

  header = header === undefined ? <Header {...headerConfiguration} /> : header

  return (
    <div
      className={`flex flex-1 flex-col${rootLevelChildren ? ' relative' : ''}`}
    >
      <Seo {...seo} />
      {rootLevelChildren}
      {header}
      <main
        className={classnames(
          'flex-1 flex flex-col',
          {
            relative: isLoading,
            'pb-16':
              footerConfiguration && !footerConfiguration.removeDefaultOffset,
            [`pt-[var(--headerTotalOffset)]`]:
              header &&
              headerConfiguration &&
              !headerConfiguration.removeNavigationSpacing
          },
          mainElementClassName
        )}
        style={{
          '--secondaryNavHeight': isMobile
            ? SECONDARY_NAV_HEIGHT_MOBILE_PX
            : SECONDARY_NAV_HEIGHT_PX,
          '--headerTotalOffset': `calc(var(--headerHeight) + ${
            isMobile ? 'var(--headerDefaultOffset)' : 'var(--headerMdOffset)'
          })`,
          '--headerDefaultOffset':
            (headerConfiguration.offset?.default || 0) + 'px',
          '--headerMdOffset': (headerConfiguration.offset?.md || 0) + 'px'
        }}
      >
        {isLoading ? <Loading /> : children}
      </main>
      {footerConfiguration && <Footer {...footerConfiguration} />}
    </div>
  )
}

export default DefaultLayout
