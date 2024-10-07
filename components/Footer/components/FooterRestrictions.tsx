import React from 'react'
import { Drop } from '@/types/drop'

interface Props {
  drops?: Drop[]
  displayTerritoryRestrictionDisclaimer?: boolean
}

export default function FooterRestrictions({
  drops,
  displayTerritoryRestrictionDisclaimer = false
}: Props) {
  let html = ''

  if (
    drops != null &&
    drops.length > 0 &&
    displayTerritoryRestrictionDisclaimer
  ) {
    html +=
      'Territory restrictions may apply to purchases and redemptions. See drop landing page for further details.'
  }

  if (!html) {
    return null
  }

  return (
    <p className="body-xs mb-3" dangerouslySetInnerHTML={{ __html: html }} />
  )
}
