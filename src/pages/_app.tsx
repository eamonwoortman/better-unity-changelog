import { NextPage } from 'next'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import Layout from '../components/layout'
import '../styles/globals.css'

function AppWrapper({ children }) {
  return <>{children}</>
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)

  return (
    <ThemeProvider>
      <AppWrapper>
        {getLayout(<Component {...pageProps} />)}
      </AppWrapper>
    </ThemeProvider>
  )
}
