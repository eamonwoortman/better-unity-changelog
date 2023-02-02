import { NextPage } from "next";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import Layout from "../components/layout";
import {
  changelogSelector,
  fetchCatalog
} from "../features/changelogs/changelog.slice";
import { useAppDispatch, useAppSelector } from "../helpers/hooks";
import { useStore } from "../helpers/store";
import "../styles/globals.css";

const AppWrapper = ({ children }) => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector(changelogSelector);

  const fetchEverything = async () => {
    await dispatch(fetchCatalog());
    // Todo: do we still need to fetch and set initial filter categories?
  };

  useEffect(() => {
    if (status === "idle") {
      fetchEverything();
    }
  }, [dispatch, status]);

  return <>{children}</>;
};

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  //Normal initialisation Redux on client side
  const reduxStore = useStore(pageProps.initialReduxState);
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)

  return (
    <Provider store={reduxStore}>
      <ThemeProvider>
      <AppWrapper>
        {getLayout(<Component {...pageProps} />)}
      </AppWrapper>
      </ThemeProvider>
    </Provider>
  );
}
