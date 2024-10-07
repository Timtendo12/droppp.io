import classNames from 'classnames'
import Loading from '.'

const ListLoading = ({ className = '', message = 'Refreshing' }) => {
  return (
    <div
      className={classNames(
        'flex flex-col items-center justify-center text-center text-gray-300',
        className
      )}
    >
      <div className="relative h-3 w-3 mb-1">
        <Loading size="medium" />
      </div>
      <p className="body-sm ">{message}...</p>
    </div>
  )
}

export default ListLoading
