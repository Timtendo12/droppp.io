import classNames from 'classnames'
import Loading from './Loading'

export const InfiniteScrollLoader = ({ className = '' }) => {
  return (
    <div className={classNames('relative h-12 w-full', className)}>
      <Loading size="medium" />
    </div>
  )
}
