import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useStore } from "../app/store";
import Layout from "../components/layout";
import {
  changelogSelector,
  fetchCatalog
} from "../features/changelogs/changelog.slice";
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
  );
}
