import classNames from 'classnames'
import Link from 'next/link'

interface IFooterColumnLinks {
  className?: string
  items: {
    label: string
    href: URL['pathname']
    isEnabled?: boolean
  }[]
}

const FooterColumnLinks = ({ className, items }: IFooterColumnLinks) => {
  return (
    // negative margin to aid with alignment of increased hit area on links
    <ul className={classNames('max-sm:gap-1 flex flex-col -my-1', className)}>
      {items
        .filter(({ isEnabled }) => isEnabled !== false)
        .map(({ href, label }) => {
          return (
            <li key={href}>
              <Link
                href={href}
                className="inline-flex items-center py-1 font-bold text-base hover:text-gray-200"
              >
                {label}
              </Link>
            </li>
          )
        })}
    </ul>
  )
}

export default FooterColumnLinks
