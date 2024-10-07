import classnames from 'classnames'
import React from 'react'
import { ReactSVG } from 'react-svg'
import SvgIcons from '@/constants/icons'
import { getBuildId } from '@/util/buildHelpers'
import styles from './styles.module.scss'

interface IIcon {
  forwardedRef?: any
  className?: string
  name: string
  color?: string
  size?: number
  onClick?: () => void
  ref?: React.Ref<HTMLElement>
}

const Icon = ({
  forwardedRef,
  className,
  name,
  size,
  color,
  onClick
}: IIcon) => {
  let SvgIcon = SvgIcons[name]
  const buildId = getBuildId()

  // check for a defined icon size
  if (size && SvgIcon) {
    SvgIcon = React.cloneElement(SvgIcon, { width: size, height: size })
  }

  if (SvgIcon) {
    return (
      <span
        className={classnames(styles.svgContainer, className)}
        onClick={onClick && onClick}
      >
        {SvgIcon}
      </span>
    )
  }

  if (!buildId) {
    return null
  }

  return (
    <ReactSVG
      ref={forwardedRef}
      className={classnames(styles.container, className)}
      beforeInjection={svg => {
        if (!color) return

        const rectElements = svg.querySelectorAll('rect')
        const gElements = svg.querySelectorAll('g')
        const pathElements = svg.querySelectorAll('path')
        const circleElements = svg.querySelectorAll('circle')

        rectElements.forEach(element => {
          element.setAttribute('stroke', color)
          element.setAttribute('opacity', '1')
        })

        gElements.forEach(element => {
          element.setAttribute('stroke', color)
          element.setAttribute('opacity', '1')
        })

        pathElements.forEach(element => {
          element.setAttribute('stroke', color)
          element.setAttribute('opacity', '1')

          if (name == 'sort-rarity' || name == 'activity-promotion') {
            element.setAttribute('fill', color)
            element.setAttribute('opacity', '1')
          }
        })

        circleElements.forEach(element => {
          element.setAttribute('stroke', color)
          element.setAttribute('opacity', '1')
        })
      }}
      src={`/images/icon-${name}.svg?build=${buildId}`}
      onClick={onClick && onClick}
    />
  )
}

const IconForwardRef = React.forwardRef(
  ({ forwardedRef, ...props }: IIcon, ref: React.Ref<HTMLElement>) => (
    <Icon forwardedRef={forwardedRef} {...props} ref={ref} />
  )
)

IconForwardRef.displayName = 'Icon'

export default IconForwardRef
