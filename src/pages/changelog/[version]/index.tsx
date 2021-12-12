import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const ChangelogPage: NextPage = () => {
  const router = useRouter()
  const { version } = router.query

  return (
    <div className="flex flex-col items-center justify-center py-2">
        changelog, version: {version}!
    </div>
  )
}

export default ChangelogPage
