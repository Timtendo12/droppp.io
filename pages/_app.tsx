import Head from 'next/head'
import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'
import { GoogleTagManager } from '@next/third-parties/google'
import Modal from 'react-modal'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '@/contexts/auth'
import { QueueItProvider } from '@/contexts/queueIt'
import { ErrorBoundary } from '@/components'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-phone-number-input/style.css'
import 'react-toastify/dist/ReactToastify.css'
import 'reactjs-popup/dist/index.css'
import '@/styles/globals.css'
import '@/styles/toast.scss'
import '@/styles/tooltips.scss'
import NiceModal from '@ebay/nice-modal-react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ModalProvider from '@/components/Modals/ModalProvider'
import { LayoutProvider } from '@/contexts/layout'
import { INVENTORY_FILTER_TRANSITION_DURATION } from '@/constants'
import { isBrowser } from '@/util/envHelpers'
import { logSessionEvent } from '@/util/logger'
import { QueryProvider } from '@/components/QueryProvider'
import WindowDimensionsProvider from '@/contexts/windowDimensions'
import CookieBanner from '@/components/CookieBanner'
import { designSystem } from '@/util/tailwindHelpers'

Modal.setAppElement('#__next')

if (isBrowser) {
  window.addEventListener('unhandledrejection', event => {
    logSessionEvent(`[client] unhandled promise rejection: ${event.reason}`)
    Sentry.captureException(event.reason)
  })

  window.addEventListener('error', event => {
    logSessionEvent(`[client] unhandled error: ${event.error}`)
    Sentry.captureException(event.error)
  })
}

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    document.body.style.setProperty(
      '--inventory-filter-transition-duration',
      `${INVENTORY_FILTER_TRANSITION_DURATION}ms`
    )
  }, [])

  const renderPage = () => {
    if (Component.Layout) {
      return (
        <Component.Layout>
          <Component {...pageProps} />
        </Component.Layout>
      )
    }
    return <Component {...pageProps} />
  }

  return (
    <ErrorBoundary>
      <QueryProvider reactQueryData={pageProps.reactQueryData}>
        <AuthProvider>
          <QueueItProvider>
            <WindowDimensionsProvider>
              <LayoutProvider>
                <NiceModal.Provider>
                  <ModalProvider />
                  <Head>
                    <meta
                      name="theme-color"
                      content={designSystem.colors['black'].toString()}
                    />
                    <meta
                      name="viewport"
                      content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
                    />
                  </Head>
                  {renderPage()}
                  <ToastContainer
                    className="custom-toast-container"
                    limit={1}
                  />
                  <CookieBanner />
                  <ReactQueryDevtools />
                  <GoogleTagManager
                    gtmId={process.env.NEXT_PUBLIC_GTM_ID}
                    preview={process.env.NEXT_PUBLIC_GTM_PREVIEW}
                    auth={process.env.NEXT_PUBLIC_GTM_AUTH}
                  />
                </NiceModal.Provider>
              </LayoutProvider>
            </WindowDimensionsProvider>
          </QueueItProvider>
        </AuthProvider>
      </QueryProvider>
    </ErrorBoundary>
  )
}

export default MyApp
