import React, { useEffect, useRef, useState } from 'react'

const sizerStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  visibility: 'hidden',
  height: 0,
  overflow: 'scroll',
  whiteSpace: 'pre'
}

const INPUT_PROPS_BLACKLIST = [
  'extraWidth',
  'injectStyles',
  'inputClassName',
  'inputRef',
  'inputStyle',
  'minWidth',
  'onAutosize',
  'placeholderIsMinWidth'
]

const cleanInputProps = inputProps => {
  INPUT_PROPS_BLACKLIST.forEach(field => delete inputProps[field])
  return inputProps
}

const copyStyles = (styles, node) => {
  node.style.fontSize = styles.fontSize
  node.style.fontFamily = styles.fontFamily
  node.style.fontWeight = styles.fontWeight
  node.style.fontStyle = styles.fontStyle
  node.style.letterSpacing = styles.letterSpacing
  node.style.textTransform = styles.textTransform
}

const InputAutoSize = props => {
  const [inputWidth, setInputWidth] = useState(1)
  const mounted = useRef(false)
  const inputRef = useRef()
  const placeHolderSizerRef = useRef()
  const sizerRef = useRef()

  const { className, inputClassName, value, placeholder } = props

  useEffect(() => {
    if (mounted.current) {
      updateInputWidth()
    } else {
      mounted.current = true
    }
  })

  useEffect(() => {
    setTimeout(() => {
      copyInputStyles()
      updateInputWidth()
    })
  }, [inputWidth])

  const copyInputStyles = () => {
    if (!mounted.current || !window.getComputedStyle) {
      return
    }
    const inputStyles =
      inputRef.current && window.getComputedStyle(inputRef.current)
    if (!inputStyles) {
      return
    }
    copyStyles(inputStyles, sizerRef.current)
    if (placeHolderSizerRef.current) {
      copyStyles(inputStyles, placeHolderSizerRef.current)
    }
  }
  const updateInputWidth = () => {
    if (
      !mounted.current ||
      !sizerRef.current ||
      typeof sizerRef.current.scrollWidth === 'undefined'
    ) {
      return
    }
    let newInputWidth
    if (placeholder && !value) {
      newInputWidth =
        Math.max(
          sizerRef.current.scrollWidth,
          placeHolderSizerRef.current.scrollWidth
        ) + 2
    } else {
      newInputWidth = sizerRef.current.scrollWidth + 2
    }
    setInputWidth(newInputWidth)
  }

  const inputStyle = {
    boxSizing: 'content-box',
    width: `${inputWidth}px`,
    outline: 'none'
  }

  const { ...inputProps } = props
  cleanInputProps(inputProps)
  inputProps.className = inputClassName
  inputProps.style = inputStyle

  return (
    <div className={className}>
      <input
        {...inputProps}
        ref={el => {
          inputRef.current = el
          props.inputRef(el)
        }}
      />
      <div ref={sizerRef} style={sizerStyle}>
        {value}
      </div>
      {placeholder && (
        <div ref={placeHolderSizerRef} style={sizerStyle}>
          {placeholder}
        </div>
      )}
    </div>
  )
}

export default InputAutoSize
