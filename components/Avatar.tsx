import classNames from 'classnames'
import Image from 'next/image'

interface Props {
  src: string
  alt: string
  className?: string
}

// @TODO - flush this out more and re-use it in other places in the code base - Josh - 10/26/23
// consider a wrapper to handle which AvatarMedia src to give the Image component

const Avatar = ({ src, alt, className = '' }: Props) => {
  return (
    <div
      className={classNames(
        'rounded-md overflow-hidden aspect-1 relative',
        className
      )}
    >
      <Image fill src={src} alt={alt} className="object-contain" />
    </div>
  )
}

export default Avatar
