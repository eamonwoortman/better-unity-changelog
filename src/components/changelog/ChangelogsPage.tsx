import type { NextPage } from 'next';
import Link from 'next/link';
import { useAppSelector } from '../../app/hooks';
import { changelogSelector } from '../../features/changelogs/changelog.slice';
import { CatalogEntry } from '../../features/changelogs/changelog.types';

const ChangelogsPage: NextPage = () => {
  const {catalog, changelogs, status, error} = useAppSelector(changelogSelector)
    
  return (
    <main className="flex">
        <div className="flex-1 bg-gray-200 px-8 py-2"> 
          {error && <div>
            <pre>Failed to get the changelogs:</pre>
            <p><i>{error.message}</i></p>
          </div>}
           
          {(!changelogs || !changelogs.length) && !error && (
            <div>Loading data ...</div>
          )}
          {(catalog) && ( 
            <article className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl mx-auto">
              <h5>Unity Versions</h5>
              <small className="prose-sm"><i>(last updated: {new Date(catalog.date_modified).toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam' })})</i></small>
              <ul>
              {catalog.changelogs.map((changelog:CatalogEntry, index:number) => (
                  <li key={index}>
                    <Link href={"/changelog/" + changelog.slug}><div className="text-blue-500">{changelog.version} ({changelog.file_name})</div></Link>
                    
                  </li>
                ))}
              </ul>
            </article>
          )}
        </div>
        <div className="flex-shrink-0 w-64 bg-gray-2 00 px-2 py-2">
          select version {/* <VersionSelector catalog={catalog}/>  */} 
        </div>
      </main>
  );
}

export default ChangelogsPage;