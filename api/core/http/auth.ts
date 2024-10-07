import { RequestConfig } from './request'
import { path as catalogItemGetPath } from '@/api/resources/catalog/item/get'
import { isBrowser } from '@/util/envHelpers'

// We've received approval for `catalog/item/get`, as we confirm other endpoints they can be added here - Eric, Tue Mar 7 2023
const AuthenticatedServerRequests = [catalogItemGetPath]

export const shouldIncludeAccessToken = (request: RequestConfig) =>
  isBrowser || AuthenticatedServerRequests.includes(request.url ?? '')
