import React from 'react'
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions
} from 'react-hook-form'
import PackSelector, { PackSelectorProps } from '@/components/PackSelector'
import { DropOrderAsset } from '@/api/resources/drop/order/assets/get/schema'

type Props = {
  children?: React.ReactNode
  control: Control<FieldValues>
  rules: RegisterOptions<FieldValues>
  layout?: PackSelectorProps['layout']
  pack: DropOrderAsset
}

export default function ControlledPackSelector({
  children,
  control,
  pack,
  rules,
  layout = 'small'
}: Props) {
  return (
    <Controller
      defaultValue={0}
      control={control}
      name={pack.id.toString()}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <>
          <PackSelector
            value={value}
            key={pack.id}
            asset={pack}
            onChange={onChange}
            layout={layout}
          >
            {children}
          </PackSelector>
        </>
      )}
    />
  )
}
