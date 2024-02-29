import useHeadingsData from 'hooks/useHeadingsData';
import { ChangelogsPageProps } from 'lib/changelog';
import InnerToC from './InnerToC';

export default function TableOfContents( props: ChangelogsPageProps ) {
  const headings = useHeadingsData(props.changelogs)
  return (<InnerToC headings={headings}/>)
}

