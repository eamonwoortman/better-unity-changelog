import { useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit'
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchChangelogs, fetchCatalog, changelogSelector } from './features/changelogs/changelog-slice';
import { CatalogEntry } from './types/changelog.types';

function App() {
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
    <div className="App">

        <div>
          {error && <div>
            <pre>Failed to get the changelogs:</pre>
            <p><i>{error.message}</i></p>
          </div>}
           
          {(!changelogs || !changelogs.length) && !error && (
            <div>Loading data ...</div>
          )}
          {(catalog) && ( 
            <div>
              <h2>Unity Versions:</h2>
              <i>(last updated: {new Date(catalog.date_modified).toLocaleString()})</i>
              <ul>
              {catalog.changelogs.map((changelog:CatalogEntry, index:number) => (
                  <li key={index}>[{index}] {changelog.version} ({changelog.file_name})</li>
                ))}
              </ul>
            </div>
          )}
        </div>
       
    </div>
  )
}

export default App
