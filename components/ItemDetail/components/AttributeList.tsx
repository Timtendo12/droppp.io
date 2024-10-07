import classnames from 'classnames'
import React, { ReactNode } from 'react'

interface IAttributeList {
  children: ReactNode
  className?: string
}

interface IAttribute {
  label: string
  value: ReactNode
  additional?: boolean
}

export const Attribute = ({ label, value, additional = false }: IAttribute) => {
  return (
    <li className={`justify-between mt-1 ${additional ? 'block' : 'flex'}`}>
      <div
        className={`body-sm text-gray-400 capitalize ${
          additional ? 'mb-1' : ''
        }`}
      >
        {label}
      </div>
      <div
        className={classnames('whitespace-pre-line', 'text-sm', {
          'mt-1': additional,
          'text-left': additional,
          'text-right': !additional
        })}
      >
        {value}
      </div>
    </li>
  )
}

const AttributeList = ({ children, className = '' }: IAttributeList) => {
  return <ul className={className}>{children}</ul>
}

export default AttributeList
