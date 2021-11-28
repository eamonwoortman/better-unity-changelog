import React, { useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchChangelogs, selectTvByGenre } from './features/changelogs/changelog-slice';
import { amountAdded } from './features/counter/counter-slice';
import logo from './logo.svg';

function App() {
  const count = useAppSelector((state)=>state.counter.value);
  const dispatch = useAppDispatch();
  const {changelogs, status, error} = useAppSelector(selectTvByGenre)
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchChangelogs());
    }
    console.log(status);
    console.log(changelogs);
  }, [dispatch, status]);
  
  function handleClick() {
    let res = dispatch(fetchChangelogs());
    console.log(res);
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
          <ul>
           {changelogs.map((changelog:any, index:number) => (
              <li key={index}>[{index}] {changelog}</li>
            ))}
          
          </ul>
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
