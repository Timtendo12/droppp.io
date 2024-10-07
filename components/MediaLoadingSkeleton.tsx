import classnames from 'classnames'
import { motion } from 'framer-motion'
import React from 'react'

interface IMediaLoadingSkeleton {
  className?: string
}

export const MediaLoadingSkeleton = ({ className }: IMediaLoadingSkeleton) => {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      className={classnames(
        'flex items-center justify-center gap-1',
        className
      )}
    >
      {Array(3)
        .fill(null)
        .map((_, i) => {
          return (
            <div
              key={i}
              className={`h-1 w-1 rounded-full bg-gray-200 animate-pulse`}
              style={{
                animationDelay: `${i * 250}ms`,
                animationDuration: '1s'
              }}
            />
          )
        })}
    </motion.div>
  )
}
