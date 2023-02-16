import { PropsWithChildren } from 'react'
//import { ThemeProvider } from './themeprovider'

export default function Providers({ children }: PropsWithChildren) {
  return (
    <>{children}</>
    /*<ThemeProvider>{children}</ThemeProvider>*/
  )
}
