import { useRouter } from 'next/router'
import React from 'react'
import { Radio, Checkbox } from '@/components'
import Section from './Section'
import { useAuth } from '@/contexts/auth'
import Select from '@/components/Select'
import { isCollectionTrackerTrackerView } from '@/constants/searchParams'

export const FilterOptions = () => {
  const router = useRouter()
  const { show_only_missing_items, exclude_listings, hide_lowest_prices } =
    router.query
  const { wallets, selectedWallet, setSelectedWallet } = useAuth()

  const mappedOptions = wallets?.map(option => ({
    ...option,
    value: option.address,
    label: option.address
  }))

  const handleChangeShowMissingItems = () => {
    if (show_only_missing_items) {
      delete router.query.show_only_missing_items
    } else {
      router.query.show_only_missing_items = 'true'
    }
    router.push(router, null, { scroll: false, shallow: true })
  }

  const handleChangeExcludeListedItems = () => {
    if (exclude_listings) {
      delete router.query.exclude_listings
    } else {
      router.query.exclude_listings = 'true'
    }

    router.push(router, null, { scroll: false, shallow: true })
  }

  const handleChangeShowLowestPrices = () => {
    if (hide_lowest_prices) {
      delete router.query.hide_lowest_prices
    } else {
      router.query.hide_lowest_prices = 'true'
    }
    router.push(router, null, { scroll: false, shallow: true })
  }

  const shouldShowMissingItemsFilter = isCollectionTrackerTrackerView(
    router.query
  )

  return (
    <div>
      {mappedOptions.length > 1 && (
        <Section
          icon="avatar"
          label="Accounts"
          content={
            <Select
              placeholder="Select"
              options={mappedOptions}
              value={mappedOptions.find(
                option => option.address === selectedWallet.address
              )}
              onChange={setSelectedWallet}
            />
          }
          tooltipContent={mappedOptions.map(option => (
            <Radio
              key={option.value}
              className="w-full"
              selected={option.value === selectedWallet.address}
              label={option.label}
              onChange={() => setSelectedWallet(option)}
            />
          ))}
        />
      )}
      <Section
        icon="filterView"
        label="View"
        badge={getViewFilterCount(router.query)}
        content={
          <>
            {shouldShowMissingItemsFilter && (
              <Checkbox
                label="Only Show Missing Items"
                square
                selected={!!show_only_missing_items}
                onChange={handleChangeShowMissingItems}
              />
            )}
            <Checkbox
              className="mt-1"
              label="Exclude Listed Items"
              square
              selected={!!exclude_listings}
              onChange={handleChangeExcludeListedItems}
            />
            <Checkbox
              className="mt-1"
              label="Hide Lowest Prices"
              square
              selected={!!hide_lowest_prices}
              onChange={handleChangeShowLowestPrices}
            />
          </>
        }
      />
    </div>
  )
}

const getViewFilterCount = query => {
  let count = 0

  const { show_only_missing_items, hide_lowest_prices } = query
  if (show_only_missing_items) {
    count++
  }
  if (hide_lowest_prices) {
    count++
  }
  return count
}
