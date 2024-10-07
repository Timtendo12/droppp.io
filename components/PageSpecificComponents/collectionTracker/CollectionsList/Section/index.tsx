import React, { ReactNode } from 'react'
import Icon from '@/components/Icon'
import { useLayoutData } from '@/contexts/layout'
import Popup from '@/components/Popup'
import NotificationBadge from '@/components/NotificationBadge'

interface Props {
  icon: string
  label: string
  badge?: number
  content: ReactNode
  tooltipContent?: ReactNode
}

const Section = ({ icon, label, badge, content, tooltipContent }: Props) => {
  const { collapsedCollectionList } = useLayoutData() || {}

  if (collapsedCollectionList) {
    return (
      <div className="relative flex justify-center p-3 [&:not(:first-child)]:pt-0 last:border-b border-defaultBorder">
        <Popup
          event="click"
          position="right top"
          className="w-[326px] rounded-3xl p-4 ml-1"
          trigger={() => (
            <div className="relative flex items-center justify-center w-7 h-7 rounded-2xl bg-gray-800">
              <Icon name={icon} />
              {!!badge && (
                <NotificationBadge
                  value={badge}
                  className="absolute -top-half -right-half"
                />
              )}
            </div>
          )}
        >
          <div className="flex items-center utility-alt mb-3">
            <Icon name={icon} className="mr-1" />
            <span className="h6">{label}</span>
          </div>
          {tooltipContent || content}
        </Popup>
      </div>
    )
  }

  return (
    <div className="py-3 md:p-3 border-b border-defaultBorder">
      <div className="flex items-center utility-alt mb-[12px]">
        <Icon className="mr-1" name={icon} />
        <span className="h6">{label}</span>
      </div>
      {content}
    </div>
  )
}

export default Section
