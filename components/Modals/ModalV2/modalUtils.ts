import { returnsPromise } from '@/util/functionHelpers'
import Toast from '@/components/Toast'

export const handlePrimaryButtonAction = (
  action: () => any,
  hide: () => Promise<unknown> = undefined,
  setState: React.Dispatch<React.SetStateAction<boolean>>,
  notifyOnPromiseRejection = true
) => {
  if (returnsPromise(action)) {
    setState(true)
    action()
      .then(() => {
        setState(false)
        hide?.()
      })
      .catch(e => {
        setState(false)
        // May not be needed....
        notifyOnPromiseRejection &&
          Toast({
            type: 'system',
            title: 'Error',
            description: e
          })
      })
  } else {
    action()
    hide?.()
  }
}
