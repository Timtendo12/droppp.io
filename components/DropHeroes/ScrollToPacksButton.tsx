import { ReactNode } from 'react'
import useBreakpoints from '@/hooks/useBreakpoints'
import { ScrollToButton, ButtonTheme } from '@/components/Button'

interface Props {
  theme: ButtonTheme
  children: ReactNode
}

const ScrollToPacksButton = ({ theme, children }: Props) => {
  const { isMedium } = useBreakpoints()

  return (
    <ScrollToButton
      theme={theme}
      targetId={isMedium ? 'packsSection' : 'packsTitle'}
    >
      {children}
    </ScrollToButton>
  )
}

export default ScrollToPacksButton
