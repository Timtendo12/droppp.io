export const match = (value: string, regex: RegExp) =>
  [...value.matchAll(regex)] || []
