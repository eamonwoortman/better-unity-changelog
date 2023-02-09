import Link from 'next/link'
import { FunctionComponent } from 'react'
import Searchbar from './header/searchbar'
import { ThemeSwitch } from './themeselector/ThemeSwitch'

export const Header: FunctionComponent = () => {
  const showThemeSwitch = true

  return (<header className="flex w-full bg-black">
      <div className="flex w-full p-6 items-center max-w-8xl mx-auto">
        <div className="cursor-pointer mr-2 hidden md:inline-flex">
          <Link href='/'>
            <img src="/assets/unity-logo.svg" className="h-[32px] hidden lg:inline-flex" alt="logo" />
            <img src="/assets/unity-icon.png" className="h-[42px] hidden md:inline-flex lg:hidden" alt="logo" />
          </Link>
        </div>
        <Searchbar />
        {showThemeSwitch && <ThemeSwitch />}
      </div>
    </header>)
  ;
}
