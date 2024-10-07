import classNames from 'classnames'
import NextLink from 'next/link'
import { ReactNode } from 'react'

interface ILinkProps {
  className?: string
  href: string
  target?: string
  rel?: string
  children: ReactNode
}

const SectionLink = ({
  className = '',
  href,
  target,
  rel,
  children
}: ILinkProps) => {
  return (
    <div className={classNames(className, 'text-center')}>
      <NextLink
        href={href}
        target={target}
        rel={rel}
        className="section-link lg:utility-lg"
      >
        {children}
      </NextLink>
    </div>
  )
}

export default SectionLink
