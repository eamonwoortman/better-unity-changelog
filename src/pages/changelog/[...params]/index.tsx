import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../app/hooks'
import ChangelogContainer from '../../../components/changelog/ChangelogContainer'
import { changelogSelector } from '../../../features/changelogs/changelog.slice'
import { ChangelogRoot } from '../../../features/changelogs/changelog.types'
import ChangeLogDetailLayout from '../../../layouts/ChangelogDetailLayout'
import { parseVersion, Version } from '../../../utils/vparse'

const ChangelogPage: NextPage = () => {
  const router = useRouter()
  const params = (router.query.params as string[]) || []
  const { changelogs } = useAppSelector(changelogSelector)
  const [selectedChangelogs, setSelectedChangelogs] = useState<ChangelogRoot[]>([])

  const getChangelog = (version: string): ChangelogRoot => {
    const match = changelogs.find(x => x.slug == version);
    if (!match) {
      console.log('Failed to find changelog with version: %s', version);
    }
    return match as ChangelogRoot;
  }

  const getChangelogs = (fromQuery: string, toQuery: string) : ChangelogRoot[] => {
    const filteredChangelogs = [];

    const from:Version = parseVersion(fromQuery);
    const to:Version = parseVersion(toQuery);
    if (from.isEmpty || to.isEmpty) {
      console.log(`Could not parse 'from'(${fromQuery}) or 'to'(${toQuery}) queries`);
      return filteredChangelogs;
    }
        
    // map through all changelogs, only allow from parsed from and to version
    changelogs.map((changelog:ChangelogRoot) => {
      const version:Version = parseVersion(changelog.slug);
      const compareFrom = from.compare(version);
      const compareTo = to.compare(version);
      if (compareFrom <= 0 && compareTo >= 0) {
        filteredChangelogs.push(changelog);
      } else {
        return;
      }

    });

    return filteredChangelogs;
  }

  const updateView = () => {
    let changelogs = [];
    console.log(`params: ${params}`, params);
    if (params.length == 1) {
      const matchingChangelog = getChangelog(params[0]);
      changelogs.push(matchingChangelog);
    } else if (params.length == 2) {
      var [ from, to ] = params;
      console.log('from to filter! %s, %s', from, to);
      changelogs = getChangelogs(from, to)
    } else {
      console.log('invalid query');
    }
    setSelectedChangelogs(changelogs);
  }

  useEffect(() => {
    updateView();
  }, [changelogs]);

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
