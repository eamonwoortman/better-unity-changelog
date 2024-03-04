import ChangelogView from 'components/changelog/ChangelogView';
import { ChangelogsProps, getPagePropsMultiple } from 'lib/changelog';

// Work-around for getting "dynamic" searchParams on deployments
export const dynamic = "force-dynamic";

export default async function Page(props: ChangelogsProps) {
  const {changelogs, filters, simpleView} = await getPagePropsMultiple(props)
  return (<ChangelogView changelogs={changelogs} filters={filters} simpleView={simpleView}/>)
}
