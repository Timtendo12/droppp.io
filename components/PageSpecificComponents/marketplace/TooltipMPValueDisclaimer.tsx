import Icon from '@/components/Icon'
import Popup from '@/components/Popup'
import { useWindowWidth } from '@/contexts/windowDimensions'
import useBreakpoints from '@/hooks/useBreakpoints'
import classNames from 'classnames'
import { ReactNode, useEffect, useRef } from 'react'
import { PopupActions } from 'reactjs-popup/dist/types'

const PADDING = 8

interface TooltipMPValueDisclaimerProps {
  triggerClassname?: string
  label: string | ReactNode
  positionToBottom?: boolean
}

const TooltipMPValueDisclaimer = ({
  triggerClassname,
  label,
  positionToBottom
}: TooltipMPValueDisclaimerProps) => {
  const ref = useRef<PopupActions>()
  const { isMobile } = useBreakpoints()
  const windowWidth = useWindowWidth()
  const width = isMobile ? windowWidth - PADDING * 4 : 345

  const handleScroll = () => {
    if (window.scrollY > 0 && ref?.current) {
      ref?.current?.close()
    }
  }

  useEffect(() => {
    handleScroll()

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Popup
      ref={ref}
      event={['hover', 'click']}
      width={width}
      position={isMobile ? 'bottom left' : 'right top'}
      offsetX={isMobile ? 0 : -PADDING * 4}
      offsetY={isMobile ? PADDING : PADDING * 3}
      className={classNames('mp-value-disclaimer-tooltip flex gap-1 body-sm', {
        positionToBottom
      })}
      trigger={() => (
        <div
          className={classNames(
            'flex gap-[4px] items-center',
            triggerClassname
          )}
        >
          {label}
          <div className="relative max-md:before:absolute max-md:before:-inset-2">
            <Icon
              className="text-gray-300 shrink-0"
              name="helpFilledLarge"
              size={14}
            />
          </div>
        </div>
      )}
    >
      <div>
        <Icon name="informationalFilled" />
      </div>
      Estimated Inventory Value is based on Droppp Marketplace data and is for
      illustrative purposes only. There is no assurance that the value of your
      collection will match the figures presented. This estimate can be delayed
      up to 15 minutes.
    </Popup>
  )
}

export default TooltipMPValueDisclaimer
