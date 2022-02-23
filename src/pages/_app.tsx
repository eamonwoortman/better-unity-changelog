import { unwrapResult } from '@reduxjs/toolkit'
import { ThemeProvider } from 'next-themes'
import type { AppContext, AppProps } from 'next/app'
import App from 'next/app'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { initialiseStore, useStore } from '../app/store'
import Layout from '../components/layout'
import { changelogSelector, fetchCatalog, fetchChangelogs } from '../features/changelogs/changelog.slice'
import { set_initial_categories } from '../features/filters/filters.slice'
import '../styles/globals.css'

const AppWrapper = ({children}) => {
  const dispatch = useAppDispatch();
  const {status} = useAppSelector(changelogSelector)

  const fetchEverything = async () => {
    const resultAction = await dispatch(fetchCatalog())
    if (fetchCatalog.fulfilled.match(resultAction)) {
      const catalog = unwrapResult(resultAction);
      dispatch(set_initial_categories(catalog.category_types));
      dispatch(fetchChangelogs(catalog));
    }
  }

  useEffect(() => {
    if (status === 'idle') {
      //fetchEverything();
    }
  }, [dispatch, status]);
  
  return (
    <>{children}</>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  //initialise redux store on server side
  const reduxStore = initialiseStore({});
  const { dispatch } = reduxStore;

  const fetchEverything = async () => {
    const resultAction = await dispatch(fetchCatalog())
    if (fetchCatalog.fulfilled.match(resultAction)) {
      const catalog = unwrapResult(resultAction);
      await dispatch(set_initial_categories(catalog.category_types));
      await dispatch(fetchChangelogs(catalog));
    }
  }
  await fetchEverything();

  /*const res = await   fetch('https://api.github.com/repos/vercel/next.js')
  const json = await res.json()  
  dispatch(setStars({ stars: json.stars }));
*/

  appProps.pageProps = {
    ...appProps.pageProps,
    initialReduxState: reduxStore.getState(),
  };

  return appProps;
};

export default function MyApp({ Component, pageProps }: AppProps) {
    //Normal initialisation Redux on client side
    const reduxStore = useStore(pageProps.initialReduxState);
  return (
    <Provider store={reduxStore}>
      <ThemeProvider>
        <Layout>
          <AppWrapper>
            <Component {...pageProps} />
          </AppWrapper>
        </Layout>
      </ThemeProvider>
    </Provider>
  )
}
