export const isUndefined = (variable: any) => typeof variable === 'undefined'
export type ArrayItemType<T> = T extends (infer U)[] ? U : T

export function isIn<T>(values: readonly T[], x: any): x is T {
  return values.includes(x)
}
