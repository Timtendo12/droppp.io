import { useEffect } from 'react'
import Link from 'next/link'
import Button from '@/components/Button'
import RoundedBox from '@/components/RoundedBox'
import useLocalStorage from '@/storage/useLocalStorage'
import { StorageKey } from '@/storage/keys'
import { useHasMounted } from '@/hooks/useHasMounted'
import { CookieKey, getClientCookieStore } from '@/api/core/http/cookies'

type CookieConsent = 'granted' | 'denied'

const isInEuroZone = () => {
  const cookieStore = getClientCookieStore()
  const continent = cookieStore.get(CookieKey.geoIpContinent)?.toString() ?? ''
  return continent.trim().toUpperCase() === 'EU'
}

const useCookieConsent = () => {
  const hasMounted = useHasMounted()
  const [consentResponse, setConsentResponse] = useLocalStorage<CookieConsent>(
    StorageKey.CookieConsent
  )

  const isConsentRequired = isInEuroZone()
  const gTagValue = isConsentRequired ? consentResponse ?? 'denied' : 'granted'

  useEffect(() => {
    // @ts-ignore
    window.gtag?.('consent', 'update', {
      analytics_storage: gTagValue
    })
  }, [gTagValue])

  const reject = () => setConsentResponse('denied')
  const accept = () => setConsentResponse('granted')

  const shouldPrompt = isConsentRequired && !consentResponse
  const showBanner = hasMounted && shouldPrompt

  return { showBanner, reject, accept }
}

const CookieBanner = () => {
  const { showBanner, reject, accept } = useCookieConsent()

  const handleRejectAll = () => reject()
  const handleAcceptAll = () => accept()

  if (!showBanner) return null

  return (
    <section
      role="alertdialog"
      className="fixed bottom-0 left-0 w-full md:p-4 z-modal"
    >
      <RoundedBox className="rounded-b-none md:rounded-[32px] w-full max-w-[1200px] mx-auto flex max-md:flex-col items-center gap-2 md:gap-4 !p-3 md:!p-6 bg-black/97 shadow-cookieConsent">
        <div>
          <div className="h4">Notice</div>
          <p className="body-sm text-gray-300 mt-1">
            Droppp and our partners use cookies to make our website work,
            analyze and improve site usage and to show you personalized content
            and advertisements. By clicking “Accept All,” you agree to the
            storing of cookies on your device for these purposes. See our{' '}
            <Link href="/privacy" target="_blank" className="inline-link">
              Privacy Policy
            </Link>{' '}
            for more information.
          </p>
        </div>
        <div className="flex gap-2 max-md:w-full">
          <Button
            className="max-md:w-full"
            theme="gray"
            size="sm"
            onClick={handleRejectAll}
          >
            Reject All
          </Button>
          <Button className="max-md:w-full" size="sm" onClick={handleAcceptAll}>
            Accept All
          </Button>
        </div>
      </RoundedBox>
    </section>
  )
}

export default CookieBanner
