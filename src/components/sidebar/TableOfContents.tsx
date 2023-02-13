import { Headings } from 'components/sidebar/Headings';
import useHeadingsData from 'hooks/useHeadingsData';
import { ChangelogsPageProps } from 'lib/changelog';

export default function TableOfContents( { changelogs } : { changelogs: ChangelogsPageProps } ) {
  const { nestedHeadings }  = useHeadingsData(changelogs)
  return (
    <nav aria-label="Table of contents">
      <h5>TABLE OF CONTENTS</h5>
      <Headings headings={nestedHeadings} />
    </nav>
  )
}

