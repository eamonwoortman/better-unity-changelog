import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../app/hooks'
import { NextPageWithLayout } from '../../../app/types'
import ChangelogContainer from '../../../components/changelog/ChangelogContainer'
import { defaultCategoryFilters, FilterCategory, FilterCategoryOption, MobileViewFilter, MobileViewMenu, ViewFilterBar } from '../../../components/changelog/ViewFilterBar'
import { changelogSelector } from '../../../features/changelogs/changelog.slice'
import { ChangelogRoot } from '../../../features/changelogs/changelog.types'
import { filtersSelector } from '../../../features/filters/filters.slice'
import ChangeLogDetailLayout from '../../../layouts/ChangelogDetailLayout'

const ChangelogPage: NextPage = () => {
  const router = useRouter()
  const { version } = router.query
  const { changelogs } = useAppSelector(changelogSelector)
  const [changelog, setChangelog] = useState<ChangelogRoot>()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const { initial_categories } = useAppSelector(filtersSelector);
  const [filters, setFilters] = useState<FilterCategory[]>(defaultCategoryFilters)

  const getChangelog = (version: string) => {
    const match = changelogs.find(x => x.slug == version);
    return match as ChangelogRoot;
  }

  const transformCategoryString = (label: string): FilterCategoryOption => {
    const value = label.toLowerCase().replace(' ', '_');
    return { value, label, checked: false };
  }

  useEffect(() => {
    const categoryFilter = filters.find(x => x.id == "category");
    categoryFilter.options = initial_categories.map(category => transformCategoryString(category));
  }, [initial_categories]);

  useEffect(() => {
    if (!version) {
      return;
    }
    const matchingChangelog = getChangelog(version as string);
    setChangelog(matchingChangelog);
  }, [changelogs]);

  return (<>
    <ChangeLogDetailLayout>
      {changelog && (
        <ChangelogContainer root={changelog} />
      )}
    </ChangeLogDetailLayout>
  </>)
}

export default ChangelogPage
