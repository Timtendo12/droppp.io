export const setObjectDefaults = (initialObject: Record<string, any>) => {
  return {
    get: function (target, name) {
      return target.hasOwnProperty(name) ? target[name] : initialObject[name]
    }
  }
}

export interface BooleanMap {
  [key: string]: boolean
}
export interface StringMap {
  [key: string]: string
}

export const transformObjectBooleanToString = (obj: BooleanMap): StringMap => {
  return Object.entries(obj).reduce((result, [key, value]) => {
    result[key] = value.toString()
    return result
  }, {})
}

export const transformObjectToArray = <
  T extends Record<string, string | number>
>(
  obj: T
): Array<string> => {
  const array: Array<string | any> = []
  for (const key in obj) {
    array.push(key, obj[key])
  }
  return array
}
