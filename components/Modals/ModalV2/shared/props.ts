import { ButtonHTMLAttributes } from 'react'

export const button = {
  className: 'flex-1 leading-none !whitespace-normal w-full'
}

export const submit = {
  ...button,
  type: 'submit' as ButtonHTMLAttributes<HTMLButtonElement>['type']
}

export const paragraphClasses = 'text-gray-300'

export const info = {
  className: 'body-xs text-gray-300 mt-2'
}

export const footer = {
  className: 'flex gap-2'
}
export const link = {
  className: 'inline-link'
}

export const linkNewTab = {
  ...link,
  target: '_blank',
  rel: 'noreferrer'
}
