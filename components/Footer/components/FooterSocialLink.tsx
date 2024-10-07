import React from 'react'
import { ButtonLink } from '@/components/Button'
import Icon from '@/components/Icon'

export interface Props {
  icon: string
  url: string
}

export default function FooterSocialLink({ icon, url }: Props) {
  return (
    <ButtonLink theme="clean" href={url} target="_blank" rel="noreferrer">
      <Icon name={icon} className="hover:text-gray-200" />
    </ButtonLink>
  )
}
