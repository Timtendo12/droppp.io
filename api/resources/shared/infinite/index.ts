import { Page } from './schema'

export const getNextPageParam = <T>(lastPage: Page<T>, allPages: Page<T>[]) =>
  lastPage.more ? allPages.length + 1 : undefined
