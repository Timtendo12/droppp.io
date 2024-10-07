import moment from 'moment'

const DropBladeDateSubContent = ({ isSmallLayout, time_launch }) => {
  const getReleasedDate = date => {
    return `${moment(date).format('MMM D, Y')}`
  }
  return (
    <>
      {!isSmallLayout && <span>Released on </span>}

      {getReleasedDate(time_launch)}
    </>
  )
}

export default DropBladeDateSubContent
