import React from 'react'
import { Drop } from '@/types/drop'

interface Props {
  drops?: Drop[]
}

export default function FooterLegal({ drops }: Props) {
  let html = ''

  if (drops != null && drops.length > 0) {
    const cpYear = new Date().getFullYear()

    html = drops.reduce((accumulator, drop) => {
      return `${
        accumulator.length > 0 ? `${accumulator}<br /><br />` : ''
      }${drop.legal.replace('&year', cpYear.toString())}`
    }, '')
  }

  if (!html) {
    return null
  }

  return (
    <p className="body-xs mb-3" dangerouslySetInnerHTML={{ __html: html }} />
  )
}
