import React, { useEffect } from 'react';
import { unwrapResult } from '@reduxjs/toolkit'
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchChangelogs, fetchCatalog, changelogSelector, CatalogEntry } from './features/changelogs/changelog-slice';
import { amountAdded } from './features/counter/counter-slice';
import logo from './logo.svg';

function App() {
  const count = useAppSelector((state)=>state.counter.value);
  const dispatch = useAppDispatch();
  const {catalog, changelogs, status, error} = useAppSelector(changelogSelector)
  useEffect(() => {
    if (status === 'idle') {
      let result = dispatch(fetchCatalog()).then(unwrapResult).then(catalog => dispatch(fetchChangelogs(catalog)))
      console.log('result:', result);
      //dispatch(fetchChangelogs());
    }
    console.log('status:', status);
    console.log('changelogs:', changelogs);
    console.log('catalog:', catalog);
  }, [dispatch, status]);
  
  /*
  const fetchEverything = async () => {
    const resultAction = await dispatch(fetchCatalog())
    if (fetchCatalog.fulfilled.match(resultAction)) {
      const catalog = unwrapResult(resultAction)
      
    } else {
      if (resultAction.payload) {
        // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, those types will be available here.
        formikHelpers.setErrors(resultAction.payload.field_errors)
      } else {
        showToast('error', `Update failed: ${resultAction.error}`)
      }
    }
  }
*/

  function handleClick() {
    //let res = dispatch(fetchChangelogs());
    //console.log(res);
    /*
    dispatch(getCatalog()).then(unwrapResult).then((result) => {
      console.log(result); // => 233
    })
    .catch((error) => {
      console.error(error); // if there is an error
    });*/
    dispatch(amountAdded(3));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          test
        </p>
        <div>
          {error && <div>{error}</div>}
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
        <p>
          <button type="button" onClick={handleClick}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
