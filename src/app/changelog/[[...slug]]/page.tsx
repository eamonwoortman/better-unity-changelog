
import { ChangelogRoot } from 'components/changelog/changelog.types';
import ChangelogContainer from 'components/changelog/ChangelogContainer';
import ChangelogView from 'components/changelog/ChangelogView';
import ScrollToTop from 'components/scrolltotop';
import TableOfContents from 'components/sidebar/TableOfContents';
import ChangeLogDetailLayout from 'layouts/ChangelogDetailLayout';
import { ChangelogProps, getPageProps } from 'lib/changelog';

// Work-around for getting "dynamic" searchParams on deployments
export const dynamic = "force-dynamic";

export default async function Page(props: ChangelogProps) {
  const { changelogs, filters, simpleView } = await getPageProps(props)
  return (<ChangelogView changelogs={changelogs} filters={filters} simpleView={simpleView}/>)
}
