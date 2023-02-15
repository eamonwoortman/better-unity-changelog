import Link from 'next/link'
import { CatalogEntry } from '../components/changelog/changelog.types'
import VersionSelector from '../components/selectors/VersionSelector'
import { dateStringToLocale } from '../helpers/datehelper'
import { ChangelogDatabase } from '../services/changelogdb'

async function getCatalog() {
  const result = await ChangelogDatabase.getAllVersions()

  return { changelogs: result }
}

export default async function Page() {
  const catalog = await getCatalog()

  return (
    <main className="flex">
      <div className="flex-1 bg-gray-200 px-8 py-2">
        {catalog
          ? <article className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl mx-auto">
            <h5>Unity Versions</h5>
            <ul>
              {catalog.changelogs.map((changelog:CatalogEntry, index:number) => (<li key={index}>
                  <Link href={`/changelog/${  changelog.slug}`}><div className="text-blue-500">{changelog.version_string} ({dateStringToLocale(changelog.date)})</div></Link>

                </li>))}
            </ul>
          </article>
          : null}
      </div>
      <div className="flex-shrink-0 w-64 bg-gray-2 00 px-2 py-2">
        Search version <VersionSelector />
      </div>
    </main>
  )
}
