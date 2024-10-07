import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

export interface ISeo {
  description?: string
  title?: string
  keywords?: string
  showDropppTitleText?: boolean
  og?: {
    description?: string
    title?: string
    image?: string
  }
}

const getPageTitle = (
  title: string,
  append: boolean = false,
  showDropppTitleText: boolean = true
) => {
  if (!showDropppTitleText) {
    return `${title}`
  } else {
    return append ? `Droppp - ${title}` : `${title} - Droppp`
  }
}

export default function Seo({
  title,
  description,
  keywords,
  og,
  showDropppTitleText = true
}: ISeo) {
  const router = useRouter()
  const isHomepage = router.pathname === '/'
  return (
    <Head>
      <title>{getPageTitle(title, isHomepage, showDropppTitleText)}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content={getPageTitle(
          og?.title || title,
          isHomepage,
          showDropppTitleText
        )}
      />
      <meta
        property="og:description"
        content={og?.description || description}
      />
      {og?.image && <meta property="og:image" content={og.image} />}
    </Head>
  )
}
