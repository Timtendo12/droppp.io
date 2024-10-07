import { IInputChildProps, InputType } from '.'

export const renderAsTextarea = (inputProps: IInputChildProps): InputType => {
  const { register, ...rest } = inputProps
  if (register) {
    delete rest.value
  }
  const input = <textarea {...rest} {...register} />
  return { input }
}
