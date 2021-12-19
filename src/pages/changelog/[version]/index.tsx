import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../app/hooks'
import ChangelogContainer from '../../../components/changelog/ChangelogContainer'
import { changelogSelector } from '../../../features/changelogs/changelog.slice'
import { ChangelogRoot } from '../../../features/changelogs/changelog.types'
import { ViewFilterBar } from '../../../components/changelog/ViewFilterBar'
const ChangelogPage: NextPage = () => {
  const router = useRouter()
  const { version } = router.query
  const { changelogs } = useAppSelector(changelogSelector)
  const [ changelog, setChangelog ] = useState<ChangelogRoot>()
  
  const getChangelog = (version: string) => {
    const match = changelogs.find(x => x.slug == version);
    return match as ChangelogRoot;
  }

  useEffect(() => {
      if(!version) {
        return;
      }
      const matchingChangelog = getChangelog(version as string);
      setChangelog(matchingChangelog);
  }, [changelogs]);

  return (<div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10 pt-6 pb-24">
    <ViewFilterBar/>
    {changelog && (
      <div className="col-span-2"><ChangelogContainer root={changelog} /></div>
    )}
</div>)
}

export default ChangelogPage
