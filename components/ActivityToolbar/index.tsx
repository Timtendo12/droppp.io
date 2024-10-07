import React, { useState } from 'react'
import { ACTIVITY_SORT_OPTIONS, ACTIVITY_FILTER_OPTIONS } from '@/constants'
import useBreakpoints from '@/hooks/useBreakpoints'
import { InputSearch, SortFilterDropdown } from './..'

interface IActivityToolbar {
  onChange: (filters: Record<string, string>) => void
}

const sanitizeSettings = (
  settings: Record<string, string>,
  property: string,
  value: string
): Record<string, string> => {
  const result = { ...settings }
  if (value === '0') {
    delete result[property]
  } else {
    result[property] = value
  }
  return result
}

const ActivityToolbar = ({ onChange }: IActivityToolbar) => {
  const [filters, setFilters] = useState<Record<string, string>>({})
  const { isMobile } = useBreakpoints()

  const { search, type_id, sort } = filters

  const handleChangeSearch = (search: string) => {
    const newSettings = { ...filters, search }
    handleChangeSettings(newSettings)
  }

  const handleChangeType = (type_id: string) => {
    handleChangeSettings(sanitizeSettings(filters, 'type_id', type_id))
  }

  const handleChangeSort = (sort: string) => {
    handleChangeSettings(sanitizeSettings(filters, 'sort', sort))
  }

  const handleChangeSettings = (newSettings: Record<string, string>) => {
    setFilters(newSettings)
    onChange(newSettings)
  }

  return (
    <div className="flex items-center mt-2">
      <InputSearch
        fullWidth={isMobile}
        value={search}
        placeholder="Search"
        onChange={handleChangeSearch}
      />
      <div className="relative flex ml-auto">
        <SortFilterDropdown
          title="Type"
          triggerConfig={{
            icon: 'activity-type'
          }}
          value={type_id}
          defaultOption={ACTIVITY_FILTER_OPTIONS[0]}
          options={ACTIVITY_FILTER_OPTIONS}
          onChange={handleChangeType}
        />
        <SortFilterDropdown
          value={sort}
          defaultOption={ACTIVITY_SORT_OPTIONS[6]}
          options={ACTIVITY_SORT_OPTIONS}
          onChange={handleChangeSort}
        />
      </div>
    </div>
  )
}

export default ActivityToolbar
