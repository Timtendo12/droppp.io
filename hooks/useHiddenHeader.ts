import { useEffect } from 'react'

const useHiddenHeader = (isHidden: boolean) => {
  useEffect(() => {
    if (isHidden) {
      document.body.classList.add('hiddenHeader')
    } else {
      document.body.classList.remove('hiddenHeader')
    }
    return () => {
      document.body.classList.remove('hiddenHeader')
    }
  }, [isHidden])
}

export default useHiddenHeader
