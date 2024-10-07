import { Fragment, ReactNode } from 'react'

type PropertyPanelItem = {
  label: ReactNode
  value: ReactNode
}

interface IPropertyPanelProps {
  items: PropertyPanelItem[]
  className?: string
}

const PropertyPanel = ({ items, className }: IPropertyPanelProps) => {
  return (
    <div className={className}>
      {items
        ?.filter(({ value }) => !!value)
        .map(({ label, value }, index) => (
          <Fragment key={index}>
            <div className="flex h-4 text-base items-center justify-between">
              <div className="text-left text-gray-300">{label}</div>
              <div className="text-right">{value}</div>
            </div>
          </Fragment>
        ))}
    </div>
  )
}

export default PropertyPanel
