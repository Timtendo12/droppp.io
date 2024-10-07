import { IInputChildProps, InputType } from '.'

export const renderAsContentEditable = (
  inputProps: IInputChildProps
): InputType => {
  const input = <div contentEditable={true} {...inputProps} />
  return { input }
}
