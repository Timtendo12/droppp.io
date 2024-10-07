import Identifiable from '../types/identifiable'

export const identifiableArrayToMap = <T extends Identifiable>(
  items: T[]
): Map<number, T> =>
  items.reduce((accumulator, item) => {
    if (!item?.id) {
      return accumulator
    }
    accumulator.set(item.id, item)
    return accumulator
  }, new Map<number, T>())

export const valueInMap = <T, U>(key?: T, map?: Map<T, U>): U | undefined =>
  (!!key && map?.get(key)) || undefined
