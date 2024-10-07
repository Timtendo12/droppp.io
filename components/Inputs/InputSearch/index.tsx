import classnames from 'classnames'
import { debounce } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Icon } from '@/components'

interface IInputSearch {
  fullWidth?: boolean
  value: string
  placeholder: string
  onChange: (value: string) => void
  filter?: (value: string, previous: string) => string
}

const InputSearch = ({
  fullWidth,
  value,
  placeholder,
  onChange,
  filter
}: IInputSearch) => {
  const [searchTxt, setSearchTxt] = useState(value)

  useEffect(() => {
    setSearchTxt(value)
  }, [value])

  const handleChange = ({ target }) => {
    const value = filter ? filter(target.value, searchTxt) : target.value
    setSearchTxt(value)
    handleInputChange(value)
  }

  const handleInputChange = useCallback(
    debounce(async strSearch => {
      onChange(strSearch)
    }, 1000),
    [onChange]
  )

  const clearInput = () => {
    setSearchTxt('')
    onChange('')
  }

  return (
    <div
      className={classnames(
        'flex items-center flex-1 min-w-[160px] px-2 border border-gray-700 bg-transparent rounded-2xl h-6',
        {
          'max-w-none': fullWidth
        }
      )}
    >
      <Icon name="search" className="mr-1 flex-shrink-0" />
      <input
        className="w-full h-full border-none outline-none bg-transparent body placeholder-gray-300"
        value={searchTxt || ''}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {!!searchTxt && (
        <Button theme="clean" onClick={clearInput}>
          <Icon name="cross" />
        </Button>
      )}
    </div>
  )
}

export default InputSearch
