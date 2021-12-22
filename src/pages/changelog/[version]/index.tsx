import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../app/hooks'
import ChangelogContainer from '../../../components/changelog/ChangelogContainer'
import { defaultCategoryFilters, FilterCategory, MobileViewFilter, MobileViewMenu, ViewFilterBar } from '../../../components/changelog/ViewFilterBar'
import { changelogSelector } from '../../../features/changelogs/changelog.slice'
import { ChangelogRoot } from '../../../features/changelogs/changelog.types'

const ChangelogPage: NextPage = () => {
  const router = useRouter()
  const { version } = router.query
  const { changelogs } = useAppSelector(changelogSelector)
  const [ changelog, setChangelog ] = useState<ChangelogRoot>()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [ filters, setFilters ] = useState<FilterCategory[]>(defaultCategoryFilters)

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
  
  return (<div className="bg-white">
    {/* Mobile filter dialog */}
    <MobileViewFilter mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen} filters={filters}/>

    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="relative z-10 flex items-baseline justify-between pt-5 pb-6 border-b border-gray-200">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Changelog</h1>
         <MobileViewMenu setMobileFiltersOpen={setMobileFiltersOpen}/>
      </div>

      {/* Main content section */}
      <section className="pt-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
          {/* Filters */}
          <ViewFilterBar filters={filters}/>

          {/* Content grid */}
          <div className="lg:col-span-3">
              {changelog && (
                  <ChangelogContainer root={changelog} />
              )}
          </div>
        </div>
      </section>
    </main>
</div>)
}

export default ChangelogPage
