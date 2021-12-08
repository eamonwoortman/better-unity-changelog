import { VersionSelector } from './VersionSelector';
import { CatalogEntry } from '../../types/changelog.types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchChangelogs, fetchCatalog, changelogSelector } from '../../features/changelogs/changelog-slice';
import { Suspense, useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit'
import { LoadingScreen } from '../LoadingScreen';

export default function Home () {
    const dispatch = useAppDispatch();
    const {catalog, changelogs, status, error} = useAppSelector(changelogSelector)
  
    const fetchEverything = async () => {
      const resultAction = await dispatch(fetchCatalog())
      if (fetchCatalog.fulfilled.match(resultAction)) {
        const catalog = unwrapResult(resultAction);
        dispatch(fetchChangelogs(catalog));
      }
    }
  
    useEffect(() => {
      if (status === 'idle') {
        fetchEverything();
      }
    }, [dispatch, status]);
  
    
  return (
    <Suspense fallback={LoadingScreen}>
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
              <small className="prose-sm"><i>(last updated: {new Date(catalog.date_modified).toLocaleString()})</i></small>
              <ul>
              {catalog.changelogs.map((changelog:CatalogEntry, index:number) => (
                  <li key={index}>{changelog.version} ({changelog.file_name})</li>
                ))}
              </ul>
            </article>
          )}
        </div>
        <div className="flex-shrink-0 w-64 bg-gray-2 00 px-2 py-2">
          <VersionSelector catalog={catalog}/>
        </div>
      </main></Suspense>
  );
}
