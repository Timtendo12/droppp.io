import { QueryFunctionContext } from '@tanstack/react-query'
import { transformObjectBooleanToString } from '@/util/objectHelpers'
import post from '@/api/core/http/post'
import { buildApiUrl } from '@/api/core/url'
import {
  UserPreferences,
  UserPreferencesSetResponse,
  userPreferencesSetResponseSchema
} from './schema'

const path = `/user/prefs/set`

export const setUserPreferences = async (
  preferences: UserPreferences,
  queryContext?: QueryFunctionContext
): Promise<UserPreferencesSetResponse> =>
  post<UserPreferencesSetResponse>(
    buildApiUrl(path, { ...transformObjectBooleanToString(preferences) }),
    queryContext,
    userPreferencesSetResponseSchema
  )
