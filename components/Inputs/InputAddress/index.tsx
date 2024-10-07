import classnames from 'classnames'
import React, { useState, useEffect, useRef } from 'react'
import { getFavoriteAddress } from '@/util/persistDataHelpers'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { Icon, Button, Input, Loading } from '@/components'
import styles from './styles.module.scss'

const InputAddress = ({
  withFavorites,
  value,
  placeholder,
  valid,
  loading,
  onChange
}) => {
  const [searchTxt, setSearchTxt] = useState(value)
  const [favorites, setFavorites] = useState([])
  const [filteredFavorites, setFilteredFavorites] = useState([])
  const [openDropdown, setOpenDropdown] = useState(false)
  const containerRef = useRef()
  const inputRef = useRef<HTMLInputElement>()

  useOnClickOutside([containerRef], () => setOpenDropdown(false))

  useEffect(() => {
    document.addEventListener('keydown', handleESCKey, false)
    if (withFavorites) {
      setFavorites(getFavoriteAddress())
      setFilteredFavorites(getFavoriteAddress())
    }

    return () => document.removeEventListener('keydown', handleESCKey, false)
  }, [])

  useEffect(() => {
    if (!loading && valid) {
      setOpenDropdown(false)
    }
  }, [loading, valid])

  useEffect(() => {
    const filteredFavorites = favorites.filter(favorite =>
      favorite.includes(searchTxt)
    )
    setFilteredFavorites(filteredFavorites)
  }, [searchTxt, favorites])

  const handleESCKey = e => {
    if (e.key === 'Escape') {
      setOpenDropdown(false)
    }
  }

  const handleChange = value => {
    const strSearch = value.toLowerCase()
    setSearchTxt(strSearch)
    onChange(strSearch)
  }

  const handleChangeFavorite = favorite => () => {
    setSearchTxt(favorite)
    onChange(favorite)
    setOpenDropdown(false)
  }

  const renderValidator = () => {
    if (loading) {
      return (
        <div
          className={classnames(styles.validation, {
            [styles.loading]: loading
          })}
        >
          <Loading size="small" />
        </div>
      )
    }

    if (valid === undefined) return null

    return (
      <div
        className={classnames(styles.validation, { [styles.invalid]: !valid })}
      >
        {valid ? 'Valid Account' : 'Invalid'}
        <Icon
          className={styles.validationIcon}
          name={valid ? 'confirmed' : 'cross-red'}
        />
      </div>
    )
  }

  const openFavoritesDropdown =
    withFavorites &&
    openDropdown &&
    filteredFavorites.length > 0 &&
    !filteredFavorites.find(add => add === searchTxt)

  return (
    <div ref={containerRef} className={styles.container}>
      <div
        className={classnames(styles.inputWrapper, {
          [styles.openDropdown]: openFavoritesDropdown
        })}
      >
        <Input
          ref={inputRef}
          value={value}
          placeholder={placeholder}
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          selectOnClick={false}
          onChange={handleChange}
          onFocus={() => setOpenDropdown(true)}
        />
        {value && renderValidator()}
      </div>
      {openFavoritesDropdown && (
        <div className={styles.favorites}>
          <div className="h7 text-gray-300 px-[12px] py-[4px]">Recent</div>
          {favorites.map(favorite => (
            <Button
              key={favorite}
              className="w-full px-[12px] py-1 hover:bg-gray-500 text-left rounded-xl"
              theme="clean"
              onClick={handleChangeFavorite(favorite)}
            >
              {favorite}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

export default InputAddress
