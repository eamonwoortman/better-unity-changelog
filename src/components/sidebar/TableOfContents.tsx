import { ReactElement } from 'react'
import useHeadingsData from '../../hooks/useHeadingsData'

function Headings({ headings }) {
  return (<ul>
      {headings.map((heading) => (
        <li key={heading.id}>
          <a href={`#${heading.id}`}>{heading.title}</a>
          {heading.items.length > 0 && (
            <ul>
              {heading.items.map((child) => (
                <li key={child.id}>
                  <a href={`#${child.id}`}>{child.title}</a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>)
}

function TableOfContents({ page } : { page: ReactElement }) {
  const { nestedHeadings } = useHeadingsData(page)

  return (
    <nav aria-label="Table of contents">
      <Headings headings={nestedHeadings} />
    </nav>
  )
}

export default TableOfContents
