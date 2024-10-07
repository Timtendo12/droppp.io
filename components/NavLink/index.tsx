import { classNames } from '@/util/tailwindHelpers'
import Link from 'next/link'
import styles from './styles.module.scss'
import Button from '@/components/Button'
import { ReactNode } from 'react'

interface INavLink {
  title?: string
  className?: string
  iconLink?: boolean
  children: ReactNode
  active?: boolean
  dropdownItem?: boolean
  href?: string
  onClick?: () => void
}

const NavLink = ({
  title = '',
  className = '',
  iconLink = false,
  children,
  active = false,
  dropdownItem = false,
  href = null,
  onClick = () => {}
}: INavLink) => {
  if (!href) {
    return (
      <Button
        className={classNames(className, styles.container, {
          [styles.dropdownItem]: dropdownItem
        })}
        theme="clean"
        onClick={onClick}
      >
        <div className={styles.content}>{children}</div>
      </Button>
    )
  }

  return (
    <Link
      href={href}
      className={classNames(className, styles.container, {
        [styles.active]: active,
        [styles.dropdownItem]: dropdownItem
      })}
      onClick={onClick}
      title={title}
    >
      <div
        className={classNames(styles.content, {
          'w-[38px] before:!bottom-0': iconLink
        })}
      >
        {children}
      </div>
    </Link>
  )
}

export default NavLink
