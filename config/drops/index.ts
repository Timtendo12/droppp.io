import { DropConfig, dropConfigSchema } from './schema'
import drops from './drops.json'
import { parseForSchema } from '@/util/jsonHelper'
import { isTest } from '../index'

export const findDropConfigById = (id: number): DropConfig => {
  const drop = drops.find(drop => drop.id === id)

  if (!drop) {
    if (!isTest) {
      // eslint-disable-next-line no-console
      console.info(`Config for drop ${id} was not found`)
    }
    return null
  }

  return parseForSchema(drop, dropConfigSchema)
}

export const getDropBrandImage = (id: number) => {
  const drop = findDropConfigById(id)
  return drop
    ? {
        id: drop.cardLogo,
        path: `drops/${drop.cloudinaryFolder}/`
      }
    : undefined
}

export const getDropNameById = (id: number) => {
  const drop = findDropConfigById(id)
  return drop.mockName
}

export const getDropCloudinaryFolderById = (id: number): string => {
  const drop = findDropConfigById(id)
  // this should eventuall be a fallback drop
  if (!drop) {
    return ''
  }
  return `drops/${drop.cloudinaryFolder}/`
}
