

type ChangelogProps = {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function Page(props: ChangelogProps) {

  const test = () => {

  }

  test()

  return (<>
    Empty test now
  </>)

}


/*
 *
 *Const getChangelog = async (versionString: string) : Promise<ChangelogRoot> => {
 *const version:Version = Version.parseVersion(versionString);
 *if (version.isEmpty) {
 *  console.log(`isempty: ${versionString}`);
 *  return null;
 *}
 *return await ChangelogDatabase.findVersion<ChangelogRoot>(version.text);
 *}
 *
 *const getChangelogs = async(fromQuery: string, toQuery: string) : Promise<ChangelogRoot[]> => {
 *const from:Version = Version.parseVersion(fromQuery);
 *const to:Version = Version.parseVersion(toQuery);
 *if (from.isEmpty || to.isEmpty) {
 *  console.log(`Could not parse 'from'(${fromQuery}) or 'to'(${toQuery}) queries`);
 *  return [];
 *}
 *
 *const result = await ChangelogDatabase.findVersions(from, to);
 *return result as ChangelogRoot[];
 *}
 *
 *export async function getServerSideProps(props: ChangelogProps): Promise<ChangelogsPageProps> {
 *  const { params, searchParams } = props;
 *if (!params) {
 *  return [];
 *}
 *console.log('TEST', params, searchParams)
 *let changelogs = [];
 *if (params.slug != undefined) {
 *  const matchingChangelog = await getChangelog(params.slug);
 *  if (matchingChangelog) {
 *    changelogs.push(matchingChangelog);
 *  }
 *}
 *  else if (searchParams != undefined) {
 *  //var [ from, to ] = searchParams;
 *  //changelogs = await getChangelogs(from, to)
 *}
 *
 *  return changelogs;
 *}
 */
