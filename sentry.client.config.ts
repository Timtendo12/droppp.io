var _sentryCollisionFreeGlobalObject = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {};
_sentryCollisionFreeGlobalObject["__sentryRewritesTunnelPath__"] = undefined;
_sentryCollisionFreeGlobalObject["SENTRY_RELEASE"] = {"id":"bb25539"};
_sentryCollisionFreeGlobalObject["__sentryBasePath"] = undefined;
_sentryCollisionFreeGlobalObject["__rewriteFramesAssetPrefixPath__"] = "";

// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'
import {
  SENTRY_DSN,
  isSentryEnabled,
  isSentryNetworkDetailEnabled
} from './constants/sentry'

Sentry.init({
  environment: process.env.NEXT_PUBLIC_ENV,
  dsn: SENTRY_DSN,
  enabled: isSentryEnabled,

  ignoreErrors: [
    'ResizeObserver loop completed with undelivered notifications'
  ],

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.25,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: true,

  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0,

  integrations: [
    new Sentry.Replay({
      maskAllText: true,
      networkDetailAllowUrls: isSentryNetworkDetailEnabled
        ? ['https://dev.api.droppp.io']
        : []
    })
  ]
})
