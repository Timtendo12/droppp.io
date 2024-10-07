import MarkdownParagraph from '@/components/MarkdownParagraph'

export function Description({ description }: { description?: string }) {
  if (!description) {
    return null
  }

  return (
    <div className="flex flex-col gap-2">
      <h4 className="h4">Description</h4>
      <MarkdownParagraph className="text-md text-gray-300">
        {description}
      </MarkdownParagraph>
    </div>
  )
}
