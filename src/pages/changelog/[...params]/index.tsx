import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import ChangelogContainer from '../../../components/changelog/ChangelogContainer'
import { ChangelogRoot } from '../../../features/changelogs/changelog.types'
import ChangeLogDetailLayout from '../../../layouts/ChangelogDetailLayout'
import ChangelogsLayout, { ChangelogsContext } from '../../../layouts/ChangelogsLayout'
import { Version } from '../../../utils/vparse'
import { NextPageWithLayout } from '../../_app'

const ChangelogPage: NextPageWithLayout = () => {
  const router = useRouter()
  const params = (router.query.params as string[]) || []
  const { changelogs, setChangelogs } = useContext(ChangelogsContext);

  const getChangelog = async (versionString: string) : Promise<ChangelogRoot> => {
    const changelogEndpoint = (query: string) => `/api/changelog/${query}`
    const version:Version = Version.parseVersion(versionString);
    if (version.isEmpty) {
      console.log(`isempty: ${versionString}`);
      return null;
    }
    const fetchUrl = changelogEndpoint(version.text);
    const response = await fetch(fetchUrl);
    const match = await response.json();
    if (!match) {
      console.log('Failed to find changelog with version: %s', versionString);
    }
    return match as ChangelogRoot;
  }

  const getChangelogs = async(fromQuery: string, toQuery: string) : Promise<ChangelogRoot[]> => {
    const changelogEndpoint = (from: string, to: string) => `/api/search/?from=${from}&to=${to}`
    
    const from:Version = Version.parseVersion(fromQuery);
    const to:Version = Version.parseVersion(toQuery);
    if (from.isEmpty || to.isEmpty) {
      console.log(`Could not parse 'from'(${fromQuery}) or 'to'(${toQuery}) queries`);
      return [];
    }
    
    const url = changelogEndpoint(from.text, to.text);
    const response = await fetch(url);
    const data =  await response.json();
    console.log(`data: `, data);
    return data as ChangelogRoot[];
  }

  const updateView = async () => {
    let changelogs = [];
    console.log('updateViews, params: ', params);
    if (params.length == 0) {
      return;
    } else if (params.length == 1) {
      const matchingChangelog = await getChangelog(params[0]);
      if (matchingChangelog) {
        changelogs.push(matchingChangelog);
      }
    } else if (params.length == 2) {
      var [ from, to ] = params;
      changelogs = await getChangelogs(from, to)
    } 
    setChangelogs(changelogs);
  }

  useEffect(() => {
    updateView().catch(console.error);
  }, [router.query]);

  return (<>
    <ChangeLogDetailLayout changelogs={changelogs}>
      {changelogs !== undefined && changelogs.map((changelog:ChangelogRoot, index:number) => (
        <ChangelogContainer key={index} root={changelog} id={index} />
        )
      )}
    </ChangeLogDetailLayout>
  </>)
}

ChangelogPage.getLayout = ChangelogsLayout;

export default ChangelogPage
