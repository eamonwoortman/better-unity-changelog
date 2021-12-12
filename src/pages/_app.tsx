import { unwrapResult } from '@reduxjs/toolkit'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import store from '../app/store'
import Layout from '../components/layout'
import { changelogSelector, fetchCatalog, fetchChangelogs } from '../features/changelogs/changelog.slice'
import '../styles/globals.css'

const AppWrapper = ({children}) => {
  const dispatch = useAppDispatch();
  const {status} = useAppSelector(changelogSelector)

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
    <>{children}</>
  )
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </Layout>
    </Provider>
  )
}
