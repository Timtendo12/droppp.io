import classNames from 'classnames'
import React from 'react'

export interface ILiveUpdateIndicator {
  className?: string
  showLabel?: boolean
}

const LiveUpdateIndicator = ({
  className,
  showLabel = true
}: ILiveUpdateIndicator) => {
  return (
    <div className={classNames(className, 'flex')}>
      <div
        className={classNames('flex w-2 h-2 rounded-full bg-success/30', {
          'ml-2': showLabel,
          'mr-[4px]': !showLabel
        })}
      >
        <div className="w-1 h-1 rounded-full bg-success m-auto"></div>
      </div>
      {showLabel && (
        <div className="max-md:hidden body-xs text-success uppercase ml-1">
          Updating Live
        </div>
      )}
    </div>
  )
}

export default LiveUpdateIndicator
