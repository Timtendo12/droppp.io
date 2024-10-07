import { buildOgImageUrl } from './cloudinaryHelpers'

export const getPageOgMeta = (
  ogTags,
  mediaPath,
  description = '',
  keywords = ''
) => {
  const ogImage = buildOgImageUrl(`${mediaPath}/${ogTags.image}`)

  const og = {
    description: description.length > 0 ? description : ogTags.descption,
    keywords: keywords.length > 0 ? keywords : ogTags.keywords,
    image: ogImage
  }

  return og
}
