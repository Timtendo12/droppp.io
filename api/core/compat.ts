import { ApiErrorResponse, isZodError } from './errors'
import { isLocal } from '@/config'

export type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; data: ApiErrorResponse }

export type ApiAction<T = any, U = any> = (input?: U) => Promise<ApiResult<T>>

// Most of our UI component code assumes the following conventions:
//   1) API interactions will not throw exceptions
//   2) API interactions will return a success flag along with the data payload
// In order to help facilitate a transition to our TS/RQ architecture I've introduced this
// helper function so that we can gradually migrate existing components to the
// newer API access stack w/o having to cause any disruption to the view layer
// Eric, Wed Mar 8 2023
export async function tryApiAction<T>(
  actionFn: () => Promise<T>
): Promise<ApiResult<T>> {
  try {
    const response = await actionFn()
    return { success: true, data: response }
  } catch (error) {
    if (isLocal && isZodError(error)) throw error
    return { success: false, data: error.originalResponse }
  }
}

// Ensure compatibility for UI code relying on protected API calls to fail. For example, handleAuthRequest() in
// FormAuth - Eric, Tue May 23 2023
export const LoginRequiredResponse: ApiErrorResponse = {
  status: 'error',
  errorCode: 403,
  errorMessage: 'Forbidden',
  errors: {
    generic: 'Login required'
  }
}
