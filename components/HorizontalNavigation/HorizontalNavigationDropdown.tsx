import classNames from 'classnames'
import Link from 'next/link'
import { PropsWithChildren, useState } from 'react'
import { NavigationActiveUnderline } from '@/components/NavigationActiveUnderline'
import Button from '@/components/Button'
import Icon from '@/components/Icon'
import {
  RealizedActionLink,
  RealizedHrefLink,
  isActionLinkDefinition,
  isHrefLinkDefinition
} from '@/types/links'
import { TabViewItem } from '@/components/TabView'

export type DropDownConfig = {
  triggerAlignment?: 'left' | 'right'
  hasFullWidthOptions?: boolean
  hideActiveLabel?: boolean
}

const DEFAULT_CONFIG: DropDownConfig = {
  triggerAlignment: 'left',
  hasFullWidthOptions: true,
  hideActiveLabel: false
}

interface HorizontalNavigationDropdownProps<T> {
  hideDropdownLabel?: boolean
  items: T[]
  activeItem: T
  config: DropDownConfig | undefined
}

function HorizontalNavigationDropdown<
  T extends RealizedHrefLink | RealizedActionLink | TabViewItem
>({ items, activeItem, config }: HorizontalNavigationDropdownProps<T>) {
  const { hasFullWidthOptions, triggerAlignment, hideActiveLabel } = {
    ...DEFAULT_CONFIG,
    ...config
  }
  const [isOpen, setIsOpen] = useState(false)

  const onMenuToggle = () => {
    setIsOpen(!isOpen)
  }

  const onItemClick = () => {
    setIsOpen(false)
  }

  const getItemClassName = active => {
    return classNames(
      'p-[12px] w-full text-left flex justify-between body',
      active ? 'rounded-[18px] bg-gray-700' : ''
    )
  }

  return (
    <div className="w-full flex relative">
      <Button
        theme="clean"
        className={classNames('flex-1 flex items-center', {
          ['absolute inset-0 w-full container-padding']: hasFullWidthOptions
        })}
        onClick={onMenuToggle}
      >
        <div
          className={classNames('flex flex-1', {
            ['max-md:!justify-between']: !hideActiveLabel,
            ['justify-end']: triggerAlignment === 'right',
            ['justify-start']: triggerAlignment === 'left'
          })}
        >
          {!hideActiveLabel && (
            <div>
              <p className="text-base font-bold whitespace-nowrap">
                {activeItem.label}
              </p>

              <NavigationActiveUnderline active={true} className="" />
            </div>
          )}
          <HorizontalNavigationIcon rotate={isOpen} />
        </div>
      </Button>

      {/* NEED TO SPLIT THIS INTO LINKS AND BUTTONS AS WELL */}
      {isOpen && (
        <nav
          className={classNames(
            'py-1 absolute bottom-[1px] translate-y-full right-0 md:w-auto md:top-8 md:right-3 md:rounded-3xl z-[1000] border-y border-defaultBorder',
            `${
              hasFullWidthOptions
                ? 'w-full bg-black md:rounded-3xl'
                : 'bg-gray-850 rounded-3xl'
            }`
          )}
        >
          <ul>
            {items.map(item => {
              if (isHrefLinkDefinition(item)) {
                const { path, label, active } = item
                return (
                  <DropdownItemWrapper onItemClick={onItemClick} key={path}>
                    <Link
                      href={path}
                      title={label}
                      className={getItemClassName(active)}
                    >
                      {label}
                      <DropdownActiveIndicator isActive={active} />
                    </Link>
                  </DropdownItemWrapper>
                )
              } else if (isActionLinkDefinition(item)) {
                const { id, label, active, onClick } = item
                return (
                  <DropdownItemWrapper key={id}>
                    <Button
                      theme="clean"
                      onClick={() => {
                        onItemClick()
                        onClick(item)
                      }}
                      className={getItemClassName(active)}
                    >
                      {label}
                      <DropdownActiveIndicator isActive={active} />
                    </Button>
                  </DropdownItemWrapper>
                )
              }
            })}
          </ul>
        </nav>
      )}
    </div>
  )
}

interface DropdownItemWrapperProps extends PropsWithChildren {
  onItemClick?: () => void
}

const DropdownItemWrapper = ({
  children,
  onItemClick
}: DropdownItemWrapperProps) => {
  return (
    <li
      onClick={onItemClick}
      className="mx-2 my-1 flex flex-row justify-between"
    >
      {children}
    </li>
  )
}

const DropdownActiveIndicator = ({ isActive }) => {
  if (!isActive) return null
  return (
    <Icon name="checkMark" size={11} color={'white'} className="my-auto ml-2" />
  )
}

export default HorizontalNavigationDropdown

export const HorizontalNavigationIcon = ({
  rotate,
  className
}: {
  rotate?: boolean
  className?: string
}) => {
  return (
    <div
      className={classNames('block -mr-[5px] transition', className, {
        'rotate-180': rotate
      })}
    >
      <Icon name="chevron" size={24} />
    </div>
  )
}
