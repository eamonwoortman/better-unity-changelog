'use client'

import { ThemeProvider } from 'next-themes'

function Provider({ children }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}

export { Provider as ThemeProvider }
