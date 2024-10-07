import classNames from 'classnames'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import { FOOTER_LINKS, SOCIAL_LINKS, WAX_URL } from '@/constants'
import Icon from '@/components/Icon'
import FooterColumnLinks from './components/FooterColumnLinks'
import FooterSocialLink from './components/FooterSocialLink'
import { useWindowWidth } from '@/contexts/windowDimensions'
import Separator from '../Separator'

const FOOTER_LINKS_MOBILE = [
  [
    FOOTER_LINKS.drops,
    FOOTER_LINKS.marketplace,
    FOOTER_LINKS.faq,
    FOOTER_LINKS.support,
    FOOTER_LINKS.partner,
    FOOTER_LINKS.terms,
    FOOTER_LINKS.privacy,
    FOOTER_LINKS.california
  ],
  [
    FOOTER_LINKS.inventory,
    FOOTER_LINKS.collections,
    FOOTER_LINKS.redemptions,
    FOOTER_LINKS.activity
  ]
]

const FOOTER_LINKS_DESKTOP = [
  [
    FOOTER_LINKS.drops,
    FOOTER_LINKS.marketplace,
    FOOTER_LINKS.faq,
    FOOTER_LINKS.support
  ],
  [
    FOOTER_LINKS.inventory,
    FOOTER_LINKS.collections,
    FOOTER_LINKS.redemptions,
    FOOTER_LINKS.activity
  ],
  [
    FOOTER_LINKS.partner,
    FOOTER_LINKS.terms,
    FOOTER_LINKS.privacy,
    FOOTER_LINKS.california
  ]
]

export interface Props {
  children?: ReactNode
  dropLegal?: ReactNode
  className?: string
  hasBorder?: boolean
}

export default function Footer({
  children,
  dropLegal,
  className,
  hasBorder
}: Props) {
  const windowWidth = useWindowWidth()
  const mobileLinks = windowWidth < 600
  const links = mobileLinks ? FOOTER_LINKS_MOBILE : FOOTER_LINKS_DESKTOP
  const cpYear = new Date().getFullYear()

  return (
    <>
      {hasBorder && <Separator />}
      <footer
        className={classNames(
          'container bg-black pt-8 pb-3 md:pb-4 lg:py-12 flex flex-col lg:flex-row gap-4 lg:gap-8',
          className
        )}
      >
        <div className="flex-[2] grid grid-cols-2 min-[600px]:flex min-[600px]:justify-between max-md:flex-wrap gap-4 lg:gap-8">
          <Link href="/" className="flex-none max-md:w-full col-span-2">
            <Icon name="dpLogo" />
          </Link>
          {links.map((colLinks, i) => (
            <FooterColumnLinks
              key={i}
              items={colLinks}
              className="min-[600px]:max-w-[28%]"
            />
          ))}
        </div>

        <div className="flex-1">
          <div className="flex mb-2 gap-3">
            <FooterSocialLink icon="twitter" url={SOCIAL_LINKS.twitter} />
            <FooterSocialLink icon="instagram" url={SOCIAL_LINKS.instagram} />
            <FooterSocialLink icon="discord" url={SOCIAL_LINKS.discord} />
            <FooterSocialLink icon="youtube" url={SOCIAL_LINKS.youtube} />
          </div>
          {dropLegal}
          <p className="body-xs mb-3">
            All licensed product names and associated designs are trademarks and
            copyrighted properties of their respective owners. All other
            trademarks, registered trademarks, trade dress, and related elements
            and designs including DROPPP™, TOKENWAVE™ and DIGITAL POP! ™ are
            owned by Funko, LLC.  ©{cpYear} Funko, LLC. All Rights Reserved.
          </p>
          {children}
          <div className="body-xs flex items-center">
            <Icon name="wax-seal" className="mr-1" />
            <span>
              Built on{' '}
              <a
                href={WAX_URL}
                className="underline"
                target="_blank"
                rel="noreferrer"
              >
                WAX
              </a>
              —a certified carbon neutral blockchain.
            </span>
          </div>
        </div>
      </footer>
    </>
  )
}
