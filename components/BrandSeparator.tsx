import { Drop } from '@/types/drop'
import classnames from 'classnames'

interface Props {
  theme?: Drop['theme']
}

const BrandSeparator = ({ theme = 'dark' }: Props) => (
  <div
    className={classnames('w-[1px] h-4', {
      'bg-gray-900/[0.72]': theme === 'light',
      'bg-white/15': theme === 'dark'
    })}
  ></div>
)

export default BrandSeparator
