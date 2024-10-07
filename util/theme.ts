export const flipLightDarkTheme = (
  theme: 'light' | 'dark'
): 'light' | 'dark' | undefined => {
  if (!theme) return undefined
  if (theme === 'dark') return 'light'
  if (theme === 'light') return 'dark'
}

export const getCloseIconClassNames = (
  theme: 'light' | 'dark',
  isSticky = false
) => (theme === 'light' || isSticky ? 'bg-white/[.15]' : 'bg-black/[.72]')
