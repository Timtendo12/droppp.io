export const scrollIntoViewWithOffset = (
  selector: string | string[],
  offset: number
): void => {
  const element = document.getElementById(selector.toString())

  if (!element) return

  window.scrollTo({
    behavior: 'smooth',
    top:
      element.getBoundingClientRect().top -
      document.body.getBoundingClientRect().top -
      offset
  })
}
