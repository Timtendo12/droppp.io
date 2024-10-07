import { HttpStatusCode } from './http/status'
import { ZodError } from 'zod'

export interface ApiErrorDetails {
  [index: string]: string
  generic?: string
}

export interface ApiErrorRequest {
  url: string
  queryKey?: unknown[]
}

export type ApiErrorFlags = {
  // specific error flags
  account_redirect?: string
  minimum_not_met?: boolean
  payment_error?: boolean
  sold_transferred_not_owned?: boolean
  drop_marketplace_disabled_snapshot?: boolean
  mfa_required?: boolean
  challengeError?: boolean
  countryRestriction?: boolean
  card_cooldown?: boolean
  errorNotFound?: boolean
  already?: boolean
  invalidCode?: boolean
}

export type ApiErrorResponse = {
  status: 'error'
  errorCode: number
  errorMessage: string
  errors?: ApiErrorDetails
  [index: number]: ApiErrorFlags
} & ApiErrorFlags

export class ApiError extends Error {
  readonly statusCode: HttpStatusCode | number
  readonly details: ApiErrorDetails
  readonly originalResponse?: ApiErrorResponse
  readonly profileRedirect?: string
  readonly isMinimumNotMetError?: boolean
  readonly isPaymentError?: boolean
  readonly isPendingSnapshotError?: boolean
  readonly is2FAAuthCodeRequest?: boolean
  readonly isChallengeError?: boolean
  readonly isCardCooldown?: boolean
  readonly isNotFound?: boolean
  readonly isNotOwned?: boolean
  readonly isAlreadySubscribed?: boolean
  readonly countryRestriction?: boolean
  readonly errorMessage?: string

  constructor(
    response: ApiErrorResponse,
    public readonly request?: ApiErrorRequest
  ) {
    super(response.errorMessage)

    this.errorMessage = response.errorMessage
    this.statusCode = response.errorCode
    this.details = response.errors || {}
    this.originalResponse = response
    this.profileRedirect = response.account_redirect
    this.isPaymentError = !!response.payment_error
    this.isChallengeError = !!response.challengeError
    this.isMinimumNotMetError = !!response.minimum_not_met
    this.isPendingSnapshotError = !!response.drop_marketplace_disabled_snapshot
    this.countryRestriction = !!response.countryRestriction
    this.is2FAAuthCodeRequest = !!response.errors?.code
    this.isCardCooldown = !!response.card_cooldown
    this.isNotFound = !!response.errorNotFound
    this.isNotOwned = !!response.sold_transferred_not_owned
    this.isAlreadySubscribed = response.already
  }

  public errorFlagsAt(idx: number): ApiErrorFlags | undefined {
    return this.originalResponse[idx]
  }
}

export const isApiErrorResponse = (
  errorResponseData: unknown
): errorResponseData is ApiErrorResponse => {
  if (errorResponseData) {
    return (
      typeof errorResponseData === 'object' &&
      'status' in errorResponseData &&
      typeof (errorResponseData as Record<string, unknown>).status ===
        'string' &&
      errorResponseData.status === 'error'
    )
  } else {
    return false
  }
}

export const isApiError = (err: unknown): err is ApiError =>
  err instanceof ApiError

export const isServerApiError = (error: ApiError) =>
  error.statusCode >= HttpStatusCode.InternalServerError

export const isZodError = (err: unknown): err is ZodError =>
  err instanceof ZodError

// workaround until we get consistent flags from BE. - Eric, Fri Dec 15 2023

// Technically this message is outdated but tying it to the BE
// apiResponseError in ApiUserAssetOpen.php, errors.ts and ChainAsset.php - Joe 7.12.2024
const SNAPSHOT_ERROR_MESSAGE = 'collection snapshot is about to occur'
export const isPendingSnapshotError = (err: unknown): err is ApiError => {
  if (isApiError(err)) {
    return (
      err.isPendingSnapshotError ||
      err.errorMessage?.toLowerCase()?.startsWith(SNAPSHOT_ERROR_MESSAGE) ||
      err.errorFlagsAt(0)?.drop_marketplace_disabled_snapshot
    )
  }

  return false
}

export const shouldRespondAs404 = (error: unknown) =>
  // RQ POC - `dpapi` returns a 400 when a chain template id does not exist, but we return a 404
  // for the 400 range except for 'Forbidden' - Eric, Fri Jan 27 2023
  isApiError(error) &&
  error.statusCode >= HttpStatusCode.BadRequest &&
  error.statusCode < HttpStatusCode.InternalServerError &&
  error.statusCode !== HttpStatusCode.Forbidden
