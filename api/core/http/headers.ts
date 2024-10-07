import { isServer } from '@/util/envHelpers'
import { IncomingMessage } from 'http'
import { getContextFromRequest, RequestConfig } from './request'

interface HttpHeaders {
  Origin?: string | undefined
  common: { 'Content-Type': string }
  Authorization?: string | undefined
}

export const buildDefaultHeaders = (): HttpHeaders => {
  const headers: HttpHeaders = {
    common: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  if (isServer) {
    headers.Origin = 'https://droppp.io'
  }

  return headers
}

const setOutgoingHeader = (
  incomingRequest: IncomingMessage,
  outgoingRequest: RequestConfig,
  incomingHeaderName: string,
  outgoingHeaderName: string = incomingHeaderName
) => {
  const incomingHeaders = Object.entries(incomingRequest.headers)
  const incomingHeader = incomingHeaders.find(([name]) => {
    return name.toLowerCase() === incomingHeaderName.toLowerCase()
  })

  if (incomingHeader) {
    const [, value] = incomingHeader
    outgoingRequest.headers[outgoingHeaderName] = value.toString()
  }
}

export const includeOutgoingHeaders = (outgoingRequest: RequestConfig) => {
  if (isServer) {
    const incomingRequest = getContextFromRequest(outgoingRequest)?.req

    if (incomingRequest) {
      const incomingIpHeaderName = process.env['DP_SSR_IP_HEADER_SRC']
      const outgoingIpHeaderName = process.env['DP_SSR_IP_HEADER_DEST']

      if (incomingIpHeaderName && outgoingIpHeaderName) {
        setOutgoingHeader(
          incomingRequest,
          outgoingRequest,
          incomingIpHeaderName,
          outgoingIpHeaderName
        )
      }

      setOutgoingHeader(incomingRequest, outgoingRequest, 'User-Agent')
      setOutgoingHeader(incomingRequest, outgoingRequest, 'Accept')
      setOutgoingHeader(incomingRequest, outgoingRequest, 'Accept-Language')
    }
  }
}
