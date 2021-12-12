import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../app/hooks'
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

  return (
    <div className="flex flex-col items-center justify-center py-2">
      {changelog && (
        <div className="text-white font-base text-xs text-center p-1.5 bg-black">
            changelog, version: {changelog.slug}!
        </div>
      )}
    </div>
  )
}

export default ChangelogPage
