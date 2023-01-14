import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../app/hooks'
import ChangelogContainer from '../../../components/changelog/ChangelogContainer'
import { changelogSelector } from '../../../features/changelogs/changelog.slice'
import { ChangelogRoot } from '../../../features/changelogs/changelog.types'
import ChangeLogDetailLayout from '../../../layouts/ChangelogDetailLayout'
import { Version } from '../../../utils/vparse'

const ChangelogPage: NextPage = () => {
  const router = useRouter()
  const params = (router.query.params as string[]) || []
  const { changelogs } = useAppSelector(changelogSelector)
  const [selectedChangelogs, setSelectedChangelogs] = useState<ChangelogRoot[]>([])

  const changelogEndpoint = (query: string) => `/api/changelog/${query}`

  const getChangelog = async (versionString: string) : Promise<ChangelogRoot> => {
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

  const getChangelogs = (fromQuery: string, toQuery: string) : ChangelogRoot[] => {
    const filteredChangelogs = [];

    const from:Version = Version.parseVersion(fromQuery);
    const to:Version = Version.parseVersion(toQuery);
    if (from.isEmpty || to.isEmpty) {
      console.log(`Could not parse 'from'(${fromQuery}) or 'to'(${toQuery}) queries`);
      return filteredChangelogs;
    }
        
    // map through all changelogs, only allow from parsed from and to version
    changelogs.map((changelog:ChangelogRoot) => {
      const version:Version = Version.parseVersion(changelog.slug);
      const compareFrom = from.compare(version);
      const compareTo = to.compare(version);
      if (compareFrom <= 0 && compareTo >= 0) {
        filteredChangelogs.push(changelog);
      } 
    });

    return filteredChangelogs;
  }

  const updateView = async () => {
    let changelogs = [];
    if (params.length == 0) {
      return;
    } else if (params.length == 1) {
      const matchingChangelog = await getChangelog(params[0]);
      if (matchingChangelog) {
        changelogs.push(matchingChangelog);
      }
    } else if (params.length == 2) {
      var [ from, to ] = params;
      changelogs = getChangelogs(from, to)
    } 
    setSelectedChangelogs(changelogs);
  }

  useEffect(() => {
    updateView().catch(console.error);
  }, [router.query]);

  return (<>
    <ChangeLogDetailLayout changelogs={selectedChangelogs}>
      {selectedChangelogs !== undefined && selectedChangelogs.map((changelog:ChangelogRoot, index:number) => (
        <ChangelogContainer key={index} root={changelog} id={index} />
        )
      )}
    </ChangeLogDetailLayout>
  </>)
}

export default ChangelogPage
