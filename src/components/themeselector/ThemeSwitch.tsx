import { useDarkMode } from "./useDarkMode";
import { MoonIcon, SunIcon } from '@heroicons/react/outline';

export const ThemeSwitch = () => {
    const [theme, setTheme] = useDarkMode();

    return (<>
        {/* ... */}
        <button onClick={() => { setTheme(theme === 'light' ? 'dark' : 'light')}} className="h-6 w-6 relative z-10">
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
        {/* ... */}
    </>)
}
