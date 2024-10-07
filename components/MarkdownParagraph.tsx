import classNames from 'classnames'
import Markdown from 'markdown-to-jsx'
import React from 'react'

type Props = {
  className?: string
  children: string
}

export default function MarkdownParagraph({ children, className }: Props) {
  return (
    <Markdown
      className={classNames('whitespace-pre-line', className)}
      options={{
        wrapper: 'p',
        forceInline: true,
        overrides: {
          a: {
            props: {
              className: 'inline-link'
            }
          }
        }
      }}
    >
      {children}
    </Markdown>
  )
}
