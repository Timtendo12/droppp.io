import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { VIEW_MODAL_SCROLLVIEW_ID } from '.'

export const ViewModalScrollBorder = ({ className = '' }) => {
  const [hasScrolled, setHasScrolled] = useState(false)

  const handleScrollEvent = (event: Event) => {
    const target = event.target as HTMLElement
    const scrollTop = target.scrollTop
    if (scrollTop > 0) {
      setHasScrolled(true)
    } else {
      setHasScrolled(false)
    }
  }

  useEffect(() => {
    const element = document.getElementById(VIEW_MODAL_SCROLLVIEW_ID)
    element.addEventListener('scroll', handleScrollEvent)
    return () => element.removeEventListener('scroll', handleScrollEvent)
  }, [])

  return (
    <div
      className={classNames(
        'border-b-1 border-transparent transition-colors duration-300',
        { '!border-defaultBorder': hasScrolled },
        className
      )}
    />
  )
}
