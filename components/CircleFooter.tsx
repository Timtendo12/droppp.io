import classNames from 'classnames'
import Icon from './Icon'

interface CircleFooterProps {
  className?: string
}

export default function CircleFooter({ className }: CircleFooterProps) {
  return (
    <div
      className={classNames(
        'flex flex-1 justify-center items-center gap-[4px]',
        className
      )}
    >
      <div className="body-xs text-gray-300">Powered by</div>
      <div className="w-[43px] h-[11px]">
        <Icon name="circleLogo3x" />
      </div>
    </div>
  )
}
