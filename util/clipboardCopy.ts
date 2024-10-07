export const clipboardCopy = async content => {
  if ('clipboard' in navigator)
    return await navigator.clipboard.writeText(content)
}
