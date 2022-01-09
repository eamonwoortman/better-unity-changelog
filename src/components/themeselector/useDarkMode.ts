import { useTheme } from 'next-themes'
import React from "react"

export type DarkModeState = 'dark' | 'light'
export type SetDarkModeState = React.Dispatch<React.SetStateAction<DarkModeState>>

export const useDarkMode = () => {
  const preferDarkQuery = '(prefers-color-scheme: dark)'
  const {theme, setTheme} = useTheme()

  React.useEffect(() => {
    if (process.env.PREFER_THEME !== '') {
      setTheme(process.env.PREFER_THEME);
      return;
    }
    if (typeof window === "undefined") {
      return;
    }
    const mediaQuery = window.matchMedia(preferDarkQuery)
    const handleChange = () => {
      setTheme(mediaQuery.matches ? 'dark' : 'light')
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  React.useEffect(() => {
    window.localStorage.setItem('colorMode', theme)
  }, [theme])

  // we're doing it this way instead of as an effect so we only
  // set the localStorage value if they explicitly change the default
  return [theme, setTheme] as const
}