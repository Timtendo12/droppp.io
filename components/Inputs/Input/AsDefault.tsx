import { IInputChildProps, InputType } from '.'

export const renderAsDefault = (inputProps: IInputChildProps): InputType => {
  const { register, ...rest } = inputProps

  // If we are using the input with React Hook Form we don't want competing values - Josh Dobson - 9/28/23
  if (register) {
    delete rest.value
  }
  const input = <input {...rest} {...register} />
  return { input }
}
