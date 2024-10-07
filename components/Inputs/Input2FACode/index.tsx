import React, { useState } from 'react'
import Button, { ButtonLink } from '@/components/Button'
import Input from '@/components/Inputs/Input'
import InputVerification from '@/components/Inputs/InputVerification'

type SecondaryLinkStyle = 'phrase' | 'contactSupport' | 'none'

interface IProps {
  secondaryLinkStyle?: SecondaryLinkStyle
  onChange: (code: string, isValid: boolean, isPhrase?: boolean) => void
}

export default function Input2FACode({
  secondaryLinkStyle = 'phrase',
  onChange
}: IProps) {
  const [isPhrase, setIsPhrase] = useState(false)
  const [code, setCode] = useState('')
  const [phrase, setPhrase] = useState('')

  const handleChangePhrase = strPhrase => {
    const words = strPhrase.split(' ')
    const isValid = words.length === 10 && words[9].length > 0
    setPhrase(strPhrase)
    onChange(strPhrase, isValid, true)
  }

  const handleChangeCode = strCode => {
    const isValid = strCode?.length === 6
    setCode(strCode)
    onChange(strCode, isValid)
  }

  const handleToggleType = () => {
    if (isPhrase) {
      const isValid = code?.length === 6
      onChange(code, isValid)
    } else {
      const words = phrase.split(' ')
      const isValid = words.length === 10 && words[9].length > 0
      onChange(phrase, isValid, true)
    }

    setIsPhrase(!isPhrase)
  }

  if (isPhrase) {
    return (
      <>
        <div className="h7 mt-3">Your Secret Recovery Phrase</div>
        <Input
          className="!h-9 mt-2 body"
          format="textarea"
          placeholder="Type Here"
          value={phrase}
          onChange={handleChangePhrase}
        />
        <div className="text-center mt-3">
          <Button
            className="section-link"
            theme="clean"
            onClick={handleToggleType}
          >
            Enter 6-digit Code
          </Button>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="h7 mt-3">6-digit code</div>
      <InputVerification
        className="mt-2"
        values={Array(6)
          .fill('')
          .map((_, i) => code.split('')[i] || '')}
        onChange={handleChangeCode}
      />

      {secondaryLinkStyle == 'phrase' && (
        <div className="text-center mt-3">
          <Button
            className="section-link"
            theme="clean"
            onClick={handleToggleType}
          >
            Use Recovery Phrase
          </Button>
        </div>
      )}

      {secondaryLinkStyle == 'contactSupport' && (
        <div className="text-center mt-3">
          <ButtonLink
            className="section-link"
            theme="clean"
            href="mailto:support@droppp.io"
          >
            Contact Support
          </ButtonLink>
        </div>
      )}
    </>
  )
}
