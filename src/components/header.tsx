import router from "next/router";
import { FunctionComponent } from "react";
import Searchbar from "./header/searchbar";
import { ThemeSwitch } from "./themeselector/ThemeSwitch";

export const Header: FunctionComponent = () => {
  const showThemeSwitch: boolean = true;
  return (<header className="sticky top-0 z-50 bg-black">
      <div className="flex w-full p-6 items-center max-w-8xl mx-auto">
        <div className="cursor-pointer mr-2 hidden md:inline-flex">
          <img src="/assets/unity-logo.svg" className="h-[32px] hidden lg:inline-flex" alt="logo" onClick={() => router.push('/')} />
          <img src="/assets/unity-icon.png" className="h-[42px] hidden md:inline-flex lg:hidden" alt="logo" onClick={() => router.push('/')} />
        </div>
        <Searchbar />
        {showThemeSwitch && <ThemeSwitch />}
      </div>
    </header>
  );
};
