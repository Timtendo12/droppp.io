import classnames from 'classnames'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useRef, ForwardedRef } from 'react'
import useBreakpoints from '@/hooks/useBreakpoints'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { NFT_TYPES } from '@/enum'
import { Button, Icon } from './..'
import { CircleIconButton } from '@/components/CircleIconLink'
import Popup from '@/components/Popup'
import classNames from 'classnames'
import { SortOption } from '@/constants'
import { MODAL_ID } from '@/constants/modalId'
import { showModal } from '@/components/Modals/ModalV2'
import { Icons } from '@/components/Icon'
import { findSortOption } from '@/util/sortOptionHelpers'

interface Props {
  className?: string
  title?: string
  value?: string | string[]
  defaultOption?: SortOption
  options: SortOption[]
  onChange: (value?: SortOption['value']) => void
  onTrigger?: (value?: SortOption['value']) => void
  triggerConfig?: {
    type?: 'icon' | 'button'
    icon?: Icons | string
    size?: 'sm' | 'lg' | 'md'
    optionDisplay?: 'popup' | 'modal'
    popupBgTheme?: 'light' | 'dark'
  }
}

const SortFilterDropdown = ({
  className = '',
  value,
  defaultOption,
  title = 'Sort By',
  triggerConfig = {
    popupBgTheme: 'dark'
  },
  options,
  onChange,
  onTrigger
}: Props) => {
  const [items, setItems] = useState(options)
  const { isMobile } = useBreakpoints()
  const containerRef = useRef()
  const { type } = useRouter().query

  const popupBgClass =
    triggerConfig.popupBgTheme === 'dark' ? 'bg-gray-850' : 'bg-gray-800'

  const shouldDisplayPopup =
    triggerConfig.optionDisplay === undefined
      ? !isMobile
      : triggerConfig.optionDisplay === 'popup'

  const currentOption =
    findSortOption(options, value?.toString()) || defaultOption

  useOnClickOutside([containerRef], () => handleSetOpen(false))

  useEffect(() => {
    if (type === NFT_TYPES.UNOPENED) {
      setItems(options.filter(option => option.icon !== 'rarity'))
      return
    }
    setItems(options)
  }, [type, options]) // must reset items if options change as well

  const handleSetOpen = val => {
    onTrigger && onTrigger(val)
  }

  const handleShowOptionsModal = () => {
    showModal(MODAL_ID.sortOptions, {
      title,
      options,
      defaultOption: currentOption,
      onSubmit: onChange
    })
  }

  const handleChange = value => {
    onChange(value)
    handleSetOpen(false)
  }

  const renderContent = close => {
    return (
      <div
        ref={containerRef}
        className={classNames('max-md:w-full min-w-[200px]')}
      >
        <div className={'p-[12px]'}>
          {items.map(({ label, icon, value }, index) => (
            <Button
              theme="clean"
              key={index}
              className={classnames(
                'flex w-full justify-between items-center h-[46px] px-[12px] mt-[2px] rounded-2xl cursor-pointer hover:bg-white/15',
                {
                  'bg-white/15': currentOption.value === value
                }
              )}
              onClick={() => {
                handleChange(value)
                close && close()
              }}
            >
              <div className="flex items-center mr-2">
                <Icon className="w-[20px] h-[20px] mr-2" name={icon} />
                <div className="body whitespace-nowrap">{label}</div>
              </div>
              <Icon
                className={classNames('invisible', {
                  ['!visible']: currentOption.value === value
                })}
                name="check"
              />
            </Button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={classNames('relative ml-2', className)}>
      {shouldDisplayPopup ? (
        <Popup
          event="click"
          size="lg"
          position="bottom right"
          className={classNames(
            '!w-auto !rounded-3xl mt-1 !p-0 !border-white/15 shadow-darkMenu',
            popupBgClass
          )}
          trigger={isOpen => (
            <SortTrigger
              isOpen={isOpen}
              type={triggerConfig.type}
              size={triggerConfig.size}
              selectedOption={currentOption}
            />
          )}
        >
          {close => renderContent(close)}
        </Popup>
      ) : (
        <SortTrigger
          selectedOption={currentOption}
          icon={triggerConfig.icon}
          type={triggerConfig.type}
          size={triggerConfig.size}
          onClick={handleShowOptionsModal}
        />
      )}
    </div>
  )
}

interface SortTriggerProps {
  selectedOption: SortOption
  icon?: Icons | string
  size?: 'sm' | 'lg' | 'md'
  type?: 'icon' | 'button'
  isOpen?: boolean
  onClick?: () => void
}

const SortTrigger = React.forwardRef(
  (
    {
      selectedOption,
      isOpen,
      onClick,
      icon = 'sort',
      size,
      type
    }: SortTriggerProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { isMobile } = useBreakpoints()

    let sizeClasses = ''
    const mediumSizeClasses = 'h-[40px] !rounded-[16px]'

    switch (size) {
      case 'sm':
        sizeClasses = 'h-[40px] !rounded-full'
        break
      case 'md':
        sizeClasses = 'h-[40px] !px-[12px] !rounded-[16px] !utility-sm'
        break
      default:
        sizeClasses = isMobile ? mediumSizeClasses : 'h-6 rounded-[18px]'
        break
    }

    const shouldShowButton =
      (type === undefined && !isMobile) || type === 'button'

    if (shouldShowButton) {
      return (
        <div
          ref={ref}
          onClick={onClick}
          className={classNames(
            'flex items-center bg-gray-700  cursor-pointer whitespace-nowrap select-none utility px-2 hover:bg-gray-600',
            sizeClasses,
            { 'bg-gray-600': isOpen }
          )}
        >
          <Icon name={selectedOption.icon} />
          <div className="ml-1">{selectedOption.label}</div>
        </div>
      )
    } else {
      return <CircleIconButton size="sm" name={icon} onClick={onClick} />
    }
  }
)

export default SortFilterDropdown
