import { ChangelogRoot } from 'components/changelog/changelog.types';
import { ChangelogDatabase } from 'services/changelogdb';
import { Version } from 'utils/vparse';

export type ChangelogsPageProps = ChangelogRoot[];

export type ChangelogProps = {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}
  
export type LayoutPageProps = {
    params?: ChangelogProps;
    children?: React.ReactNode;
};

const getChangelog = async (versionString: string) : Promise<ChangelogRoot> => {
  const version:Version = Version.parseVersion(versionString)
    if (version.isEmpty) {
      console.log(`isempty: ${versionString}`)
      return null
    }
  
    return await ChangelogDatabase.findVersion<ChangelogRoot>(version.text)
  }
  
  const getChangelogs = async (fromQuery: string, toQuery: string) : Promise<ChangelogRoot[]> => {
    const from:Version = Version.parseVersion(fromQuery)
    const to:Version = Version.parseVersion(toQuery)
  
    if (from.isEmpty || to.isEmpty) {
      console.log(`Could not parse 'from'(${fromQuery}) or 'to'(${toQuery}) queries`)
  
      return []
    }
  
    const result = await ChangelogDatabase.findVersions(from, to)
  
    return result as ChangelogRoot[]
  }
  
  export async function getPageProps(props: ChangelogProps): Promise<ChangelogsPageProps> {
    const { params, searchParams } = props
    if (!params) {
      return []
    }
    const changelogs = []
    if (params.slug !== undefined) {
      const slug = params.slug[0];
      const matchingChangelog = await getChangelog(slug)
  
      if (matchingChangelog) {
        changelogs.push(matchingChangelog)
      }
    } else if (searchParams !== undefined) {
      const from = searchParams.from as string;
      const to = searchParams.to as string;
      console.log(`params, searchParams: `, params, searchParams)
      const matchingChangelogs = await getChangelogs(from, to)
      changelogs.push(...matchingChangelogs);
    }
  
    return changelogs
  }
  