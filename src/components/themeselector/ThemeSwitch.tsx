'use client'
import { MoonIcon, SunIcon } from '@heroicons/react/outline'
import { useDarkMode } from './useDarkMode'

export function ThemeSwitch() {
  const [
    theme,
    setTheme
  ] = useDarkMode()
  const hideThemeSwitch = process.env.PREFER_THEME !== ''

  return <>
        { (!hideThemeSwitch) && 
            <button onClick={() => { setTheme(theme === 'light' ? 'dark' : 'light')}} className="h-6 w-6 relative z-10">
                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
        }
    </>
}
