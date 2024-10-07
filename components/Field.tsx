import classNames from 'classnames'
import { ReactNode } from 'react'
import { FieldErrors } from 'react-hook-form'

interface IField {
  name: string
  label?: ReactNode
  optional?: boolean
  className?: string
  errorClassName?: string
  children: ReactNode
  errors?: FieldErrors
}

const Field = ({
  name,
  optional,
  label,
  className = '',
  errorClassName,
  children,
  errors
}: IField) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="h7 mb-1 inline-block align-top">
          {label}
          {optional && <span className="text-gray-300">&nbsp;(Optional)</span>}
        </label>
      )}
      {children}
      {errors?.[name] && (
        <p className={classNames('text-error--light mt-1', errorClassName)}>
          {errors?.[name]?.message?.toString()}
        </p>
      )}
    </div>
  )
}

export default Field
