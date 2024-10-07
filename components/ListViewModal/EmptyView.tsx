import classNames from 'classnames'
import Icon from '@/components/Icon'

export type Config = {
  title: string
  description: string
  icon: string
}

type Props = {
  className?: string
} & Config

const EmptyView = ({ title, description, icon, className = '' }: Props) => {
  return (
    <div
      className={classNames(
        'flex flex-col items-center justify-center text-center',
        className
      )}
    >
      <Icon name={icon} className="w-4 h-4 mb-[12px]" />
      <h2 className="h6 mb-1">{title}</h2>
      <p className="body-sm text-gray-300 ">{description}</p>
    </div>
  )
}

export default EmptyView
