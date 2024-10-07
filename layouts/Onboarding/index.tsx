import { useRouter } from 'next/router'
import React from 'react'
import { useAuth } from '@/contexts/auth'
import { Icon, Button, Separator } from '@/components'
import styles from './styles.module.scss'
import Footer from '@/components/Footer'
import Seo from '@/components/Seo'

const OnboardingLayout = ({
  metaTitle,
  title,
  description,
  skip2FA,
  otherOptions,
  children
}) => {
  const router = useRouter()
  const { getReturnUri, removeReturnUri, getRedirectUri, removeRedirectUri } =
    useAuth()

  const handleOtherOption = () => {
    router.replace('/setup-2fa')
  }

  const handleSkip2FA = () => {
    const redirectUri = getRedirectUri()
    const returnUri = getReturnUri()

    if (redirectUri) {
      removeRedirectUri()
      window.location.href = redirectUri
    } else if (returnUri) {
      removeReturnUri()
      router.replace(returnUri)
    } else {
      router.replace('/inventory')
    }
  }

  return (
    <div className={styles.container}>
      <Seo title={metaTitle} />
      <div className={styles.content}>
        <Icon className={styles.logo} name="dpLogoRainbow" />
        {title && <h3 className="h4">{title}</h3>}
        {description && (
          <div
            className="mt-2 body text-gray-300 whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
        {children}
        {skip2FA && (
          <div className="mt-3 text-center body-sm">
            {otherOptions && (
              <>
                <Button
                  className="underline mx-auto mt-2"
                  theme="clean"
                  onClick={handleOtherOption}
                >
                  Other Options
                </Button>
                <Separator className="mx-[12px]" vertical />
              </>
            )}
            <Button
              className="underline mx-auto mt-2"
              theme="clean"
              onClick={handleSkip2FA}
            >
              Skip for Now
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default OnboardingLayout
