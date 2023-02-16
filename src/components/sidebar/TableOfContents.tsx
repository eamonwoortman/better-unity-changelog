import useHeadingsData from 'hooks/useHeadingsData';
import { ChangelogsPageProps } from 'lib/changelog';
import InnerToC from './InnerToC';

export default function TableOfContents( { changelogs } : { changelogs: ChangelogsPageProps } ) {
  const headings = useHeadingsData(changelogs)
  return (<InnerToC headings={headings}/>)
}

