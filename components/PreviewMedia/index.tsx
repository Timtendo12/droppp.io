import classnames from 'classnames'
import React from 'react'
import { CacheBustedAsset } from '..'
import styles from './styles.module.scss'

const PreviewMedia = ({ className = '', size, media, alt = '', ...props }) => {
  const type = media[size.type]
  const url = media[size.url]

  return (
    <CacheBustedAsset
      disableBust
      className={classnames(className, styles.thumbnail)}
      type={type}
      src={url}
      alt={alt}
      {...props}
    />
  )
}

export default PreviewMedia
