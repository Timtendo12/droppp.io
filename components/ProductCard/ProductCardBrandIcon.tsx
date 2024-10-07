import classNames from 'classnames'
import { ProductCardInterface } from '.'
import CloudinaryImage from '@/components/CloudinaryImage'

const SIZES = {
  lg: 'h-[7em] w-[7em] bottom-[2em] right-[2em]',
  md: 'h-[4em] w-[4em] bottom-[1.5em] right-[1.5em]',
  sm: 'h-[30px] w-[30px] bottom-1 right-1'
}
interface Props {
  className?: string
  image: ProductCardInterface['brandImage']
  size: 'lg' | 'md' | 'sm'
}

const ProductCardBrandIcon = ({ className, size, image }: Props) => {
  return (
    <div className={classNames('absolute', SIZES[size], className)}>
      <CloudinaryImage
        className="rounded-full"
        imageId={image.id}
        path={image.path}
        layout="fill"
      />
    </div>
  )
}

export default ProductCardBrandIcon
