export const env = process.env.NEXT_PUBLIC_ENV || 'dev'

export const isDev = env === 'dev'
export const isLocal = env === 'local'
export const isTest = env === 'test'
export const isStaging = env === 'stage'
export const isProd = env === 'prod'
export const isProdOrStaging = isProd || isStaging

export const apiUrl =
  (process.env.NEXT_PUBLIC_API_URL || 'https://dev.api.droppp.io') + '/v1'

export const CLOUDINARY_CLOUD_NAME = 'dpaccount'

export const appleClientId = isProdOrStaging ? 'io.droppp.prod' : 'io.droppp'
export const appleRedirectUrl = apiUrl + '/apple/validate'

export const googleClientId = isProdOrStaging
  ? '825785221882-0t2rejk6pp0tjlbv06vh25sqf1bmbc5t.apps.googleusercontent.com'
  : '10529570084-bslu3cshqfp9r75g86lge8i2q24u97bj.apps.googleusercontent.com'

export const stripeApiKey = isProdOrStaging
  ? 'pk_live_51J0b2hH2b78LMQRr1sO9Xtde3nTmzDVcWthZ8Rs4H8ykBke8Cwzr7NeW1DYCJqWHSl0XEHhxBG7d6mgtiG9QPxq800AhTEm2ZN'
  : 'pk_test_51J0b2hH2b78LMQRroafRtUOJArMXO0Fhsd5psdtNeqz9AFQ4QTD7tUfG5JXexeYHevLAk4Vw3G48BSLNdSqLFlBF00dpz7cDFx'

export const gtmId = 'GTM-MDPGW4T'

export const CLOUDINARY_ENVIRONMENT = env === 'local' ? 'dev' : env
export const TURNSTILE_KEY = isProdOrStaging
  ? '0x4AAAAAAABBd5PTPryegVDg'
  : '0x4AAAAAAAA-8R6a_qWX9M4k'

export const SUPPORT_EMAIL = 'support@droppp.io'
