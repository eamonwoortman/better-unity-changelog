import { ReactElement, useEffect, useState } from 'react'
import { useChangelogs } from '../layouts/ChangelogsLayout'

export default function useHeadingsData(pageRef: ReactElement) {
  const {
    changelogs
  } = useChangelogs()
  const [
    nestedHeadings,
    setNestedHeadings
  ] = useState([])

  useEffect(() => {
    refreshHeadings()
  }, [changelogs])

  const refreshHeadings = () => {
    const headingElements = Array.from(document.querySelectorAll('h2, h3'))

    const newNestedHeadings = getNestedHeadings(headingElements)

    setNestedHeadings(newNestedHeadings)
  }

  const getNestedHeadings = (headingElements) => {
    const nestedHeadings = []

    headingElements.forEach((heading, index) => {
      const { innerText: title, id } = heading

      if (heading.nodeName === 'H2') {
        nestedHeadings.push({ id,
          title,
          items: [] })
      } else if (heading.nodeName === 'H3' && nestedHeadings.length > 0) {
        nestedHeadings[nestedHeadings.length - 1].items.push({
          id,
          title
        })
      }
    })

    return nestedHeadings
  }

  return { nestedHeadings }
}
