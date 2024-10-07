import Icon from '@/components/Icon'
import {
  paragraphClasses,
  link,
  linkNewTab
} from '@/components/Modals/ModalV2/shared/props'
import classNames from 'classnames'

const USDCPlatformLink = ({ platform, platformIcon, description, url }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="
        flex gap-2 sm:flex-col items-center group relative
        [&:not(:last-child)]:max-sm:pb-2
        [&:not(:last-child)]:max-sm:border-b border-inherit
        before:content-none 
        [&:not(:first-child)]:before:sm:content-['']
        [&:not(:first-child)]:before:absolute 
        [&:not(:first-child)]:before:-left-[calc(var(--horizontalGap)/2)] 
        [&:not(:first-child)]:before:top-0 
        [&:not(:first-child)]:before:bottom-0 
        [&:not(:first-child)]:before:border-l 
        [&:not(:first-child)]:before:border-inherit
        "
    >
      <Icon name={platformIcon} className="w-[53px] sm:w-10 h-4" />

      <div className="sm:text-center flex-1">
        <h5 className="h7">{platform}</h5>
        <p className="text-gray-300 body-xs">{description}</p>
      </div>
      <div className="h-3 w-3 p-[6px] rounded-full bg-blue flex items-center justify-center">
        <Icon name="arrowLink" />
      </div>
    </a>
  )
}

export const Content = {
  title: 'Get USDC',
  image: {
    path: 'global/modals/',
    id: 'where-can-i-get',
    alt: 'Header image of a monster putting money into a machine and receiving coins',
    width: 480,
    height: 300,
    className: 'aspect-[24/15]'
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  body: (_: () => void) => (
    <>
      <p className={classNames(paragraphClasses, '-mt-1')}>
        There are many places where you can purchase USDC, such as the financial
        platforms listed below.
      </p>
      <div
        style={{ '--horizontalGap': '24px' }}
        className="rounded-2xl border border-gray-700 grid sm:grid-cols-3 gap-2 sm:gap-[var(--horizontalGap)] p-2 my-3"
      >
        <USDCPlatformLink
          platform="Robinhood"
          platformIcon="robinhood"
          description="Easy for beginners in the U.S."
          url="https://robinhood.com"
        />
        <USDCPlatformLink
          platform="Coinbase"
          platformIcon="coinbase"
          description="User-friendly U.S. crypto exchange"
          url="https://coinbase.com"
        />
        <USDCPlatformLink
          platform="OKX"
          platformIcon="okx"
          description="Available to international users"
          url="https://okx.com"
        />
      </div>
      <p className={paragraphClasses}>
        Once you have purchased USDC and the funds have settled in your account
        (which typically takes between 1 and 10 days), you can use it to fund
        your Droppp Balance by following the deposit instructions in the next
        step.
      </p>
      <p className={paragraphClasses}>
        Having troubles? Reach out to{' '}
        <a href="/support" target="_blank" rel="noreferrer" {...link}>
          Droppp&nbsp;Support
        </a>{' '}
        staff or jump into{' '}
        <a href="https://droppp.io/discord" {...linkNewTab}>
          Discord
        </a>{' '}
        to get immediate help.
      </p>
    </>
  )
}
