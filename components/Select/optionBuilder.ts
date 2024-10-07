import { ReactNode } from 'react'
import { SelectOption } from './index'
import Identifiable from '@/types/identifiable'

export interface SelectOptionConvertible extends Identifiable {
  name?: string
}

export function buildSelectOptions<Option extends SelectOptionConvertible>(
  collection?: Map<number, Option>
): SelectOption[]

export function buildSelectOptions<Option extends SelectOptionConvertible>(
  collection?: Array<Option>
): SelectOption[]

export function buildSelectOptions<
  Option extends SelectOptionConvertible,
  Collection extends Iterable<Option>
>(collection?: Collection): SelectOption[] {
  if (typeof collection?.[Symbol.iterator] !== 'function') {
    return []
  }

  var options: SelectOption[] = []

  for (const value of collection) {
    let option: Option = value

    // The value returned is a key-value pair returned by the iterator of an
    // object-like structure (ie. Map, Object, etc.) returned by the iterator.
    if (Array.isArray(value) && value.length == 2) {
      option = value.pop()
    }

    if (!option.id || !option.name) {
      continue
    }

    options.push({
      label: option.name as ReactNode,
      value: option.id
    })
  }

  return options
}
