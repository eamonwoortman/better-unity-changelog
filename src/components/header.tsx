import Image from 'next/image'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import unityIcon from '../../public/assets/unity-icon.png'
import unityLogo from '../../public/assets/unity-logo.svg'
import Searchbar from './header/searchbar'
import { ThemeSwitch } from './themeselector/ThemeSwitch'
import { Suspense } from 'react'

export const Header: FunctionComponent = () => {
  const showThemeSwitch = true

  return (<header className="flex w-full bg-black">
      <div className="flex w-full p-6 items-center max-w-8xl mx-auto">
        <div className="cursor-pointer mr-2 hidden md:inline-flex">
          <Link href='/'>
            <Image
              src={unityLogo}
              alt="logo"
              width={87}
              height={32}
              className="hidden lg:inline-flex"
            />
            <Image
              src={unityIcon}
              alt="logo"
              width={42}
              height={42}
              className="hidden md:inline-flex lg:hidden"
            />
          </Link>
        </div>
        {/* 
        <Suspense>
          <Searchbar />
        </Suspense>
        */}
        {showThemeSwitch && <ThemeSwitch />}
      </div>
    </header>)
  ;
}
