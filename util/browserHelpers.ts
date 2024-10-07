export const supportsTouchEvents = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-expect-error (browser specific test)
    navigator.msMaxTouchPoints > 0)

// handles creating a selection using an element
export const selectContent = (el: HTMLElement | null) => {
  if (!el) return
  if (el.hasAttribute('contenteditable')) {
    const range = document.createRange()
    range.selectNodeContents(el)
    const sel = window.getSelection()
    sel && sel.removeAllRanges()
    sel && sel.addRange(range)
  } else if (/input/i.test(el.tagName)) {
    ;(el as HTMLInputElement).select()
  } else if (/textarea/i.test(el.tagName)) {
    ;(el as HTMLTextAreaElement).select()
  }
}
