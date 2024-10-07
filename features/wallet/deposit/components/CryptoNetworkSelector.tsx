import React, { useMemo } from 'react'
import RadioList, { RadioTypes } from '@/components/RadioList'
import Icon, { ICONS_CRYPTO_NETWORKS } from '@/components/Icon'
import { IStatusBadgeProps, StatusBadge } from '@/components/StatusBadge'
import { NetworkType } from '@/api/resources/shared/crypto'
import { Control, Controller } from 'react-hook-form'
import classNames from 'classnames'

export type CryptoNetworkSelectorOption = {
  value: NetworkType
  title: string
  disabled?: boolean
  icon: keyof typeof ICONS_CRYPTO_NETWORKS
  badge?: {
    label: string
    theme: IStatusBadgeProps['status']
  }
  description: string
  info?: string
}

type Props = {
  className?: string
  onChange: (value: NetworkType) => void
  value: NetworkType | undefined
  options: CryptoNetworkSelectorOption[]
}

export default function CryptoNetworkSelector({
  className,
  options,
  onChange,
  value
}: Props) {
  const networkOptions: RadioTypes[] = useMemo(
    () =>
      options.map(
        ({ value, disabled, badge, title, icon, description, info }) => {
          const badgeTheme = disabled ? undefined : badge?.theme
          return {
            value,
            disabled,
            title: (
              <>
                <Icon name={icon} className="h-[20px] w-[20px]" />
                <span
                  className={classNames('h7', { 'text-gray-400': disabled })}
                >
                  {title}
                </span>
                {badge && (
                  <StatusBadge status={badgeTheme} className="ml-1">
                    {badge.label}
                  </StatusBadge>
                )}
              </>
            ),
            label: (
              <div className="flex flex-col gap-1">
                <p>{description}</p>
                {info && <p className="text-alert body-xs">{info}</p>}
              </div>
            )
          }
        }
      ),
    [options]
  )
  return (
    <RadioList
      className={className}
      onChange={onChange}
      value={value}
      options={networkOptions}
      config={{
        styleClasses: {
          label: 'body-sm !text-sm mt-[3px]',
          optionWrapper: '!py-2'
        }
      }}
    />
  )
}

interface ControlledCryptoNetworkSelectorProps {
  className?: string
  onChange?: (value: NetworkType) => void
  name: string
  // @TODO - FIX any type - Josh Dobson - 1/18/24
  control: Control<any>
  required?: boolean
  options: CryptoNetworkSelectorOption[]
}

export function ControlledCryptoNetworkSelector({
  className,
  options,
  onChange,
  name,
  control,
  required
}: ControlledCryptoNetworkSelectorProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field: { onChange: controllerOnChange, value } }) => (
        <CryptoNetworkSelector
          className={className}
          onChange={val => {
            onChange?.(val)
            controllerOnChange(val)
          }}
          value={value}
          options={options}
        />
      )}
    />
  )
}
