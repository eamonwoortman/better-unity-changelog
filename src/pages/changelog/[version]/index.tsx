import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../app/hooks'
import ChangelogContainer from '../../../components/changelog/ChangelogContainer'
import { changelogSelector } from '../../../features/changelogs/changelog.slice'
import { ChangelogRoot } from '../../../features/changelogs/changelog.types'

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

      {/*
    <div className="grid grid-cols-3 gap-4">
      <div className="flex justify-center">
      This should be on the left
      </div>
      {changelog && (
          <div className="col-span-2"><ChangelogContainer root={changelog} /></div>
      )}
    </div>
     */}

  return (<div className="grid grid-cols-3 gap-4">
  <div className="flex justify-center">
  This should be on the left
  </div>
  {changelog && (
      <div className="col-span-2"><ChangelogContainer root={changelog} /></div>
  )}
</div>)
}

export default ChangelogPage
