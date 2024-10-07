import Link from 'next/link'
import Icon from './Icon'
import Separator from './Separator'
import { classNames } from '@/util/tailwindHelpers'
import { DROP_EXCLUSIVE_TARGET } from '@/constants/drops'

interface DropExclusiveSectionProps {
  isContainer?: boolean
  showTopSeparator?: boolean
  showBottomSeparator?: boolean
  wrapperClasses?: string
  layoutClasses?: string
  iconInline?: boolean
  inlineIconWrapperClasses?: string
  iconClasses?: string
  titleClasses?: string
  descriptionClasses?: string
  linkClasses?: string
}

const DropExclusiveSection = ({
  isContainer = true,
  showTopSeparator = false,
  showBottomSeparator = false,
  wrapperClasses = '',
  layoutClasses = '',
  iconInline = false,
  inlineIconWrapperClasses = '',
  iconClasses = '',
  titleClasses = '',
  descriptionClasses = '',
  linkClasses = ''
}: DropExclusiveSectionProps) => {
  const baseLayoutClasses =
    'my-8 mx-auto text-center flex flex-col items-center justify-center max-w-[744px]'
  const baseDescriptionClasses = 'mb-2 text-gray-300 body-lg'

  return (
    <>
      <section
        id={DROP_EXCLUSIVE_TARGET}
        className={classNames(wrapperClasses, { container: isContainer })}
      >
        {showTopSeparator && <Separator />}
        <div className={classNames(baseLayoutClasses, layoutClasses)}>
          <TitleWithIcon
            title="Droppp Exclusive"
            inline={iconInline}
            wrapperClasses={inlineIconWrapperClasses}
            iconClasses={iconClasses}
            titleClasses={titleClasses}
          />
          <p className={classNames(baseDescriptionClasses, descriptionClasses)}>
            This collection is a Droppp Exclusive. These are the same Digital
            Pop! that you know and love, however you can only buy, sell and
            trade them on Droppp.
          </p>
          <Link
            href="/faq/?question=what-does-droppp-exclusive-mean"
            target="_blank"
            className={classNames(linkClasses, 'section-link')}
          >
            Learn More
          </Link>
        </div>
        {showBottomSeparator && <Separator />}
      </section>
    </>
  )
}

interface TitleWithIconProps {
  title: string
  inline?: boolean
  wrapperClasses?: string
  iconClasses?: string
  titleClasses?: string
}

const TitleWithIcon = ({
  title,
  inline = false,
  wrapperClasses = '',
  iconClasses = '',
  titleClasses = ''
}: TitleWithIconProps) => {
  return (
    <>
      {inline ? (
        <div className={classNames('flex items-center mb-1', wrapperClasses)}>
          <Icon
            name="exclusiveBadge"
            className={classNames('w-3 h-3 mr-1', iconClasses)}
          />
          <div className={classNames('h5', titleClasses)}>{title}</div>
        </div>
      ) : (
        <>
          <Icon
            name="exclusiveBadge"
            className={classNames('w-5 h-5 mb-[12px]', iconClasses)}
          />
          <div className={classNames('h3 mb-1', titleClasses)}>{title}</div>
        </>
      )}
    </>
  )
}

export default DropExclusiveSection
