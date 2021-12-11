import { FunctionComponent } from 'react';

export const Header: FunctionComponent = () => <header>
    <section className="relative w-full px-8 text-gray-700 bg-black body-font">
        <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
          <div className="relative z-10 flex items-center w-auto text-2xl font-extrabold leading-none text-black select-none">
              <img src="assets/unity-logo.svg" className="h-[32px]" alt="logo" />
            </div>
          <div className="top-0 left-0 z-0 flex items-center justify-center w-full h-full py-5 -ml-0 space-x-5 text-base md:-ml-5 md:py-0 md:absolute">
          <ul className="flex">
            <li className="mr-6">
                <a className="text-blue-500 hover:text-blue-500" href="#">Home</a>
            </li>
            <li className="mr-6">
                <a className="text-gray-200 hover:text-blue-500" href="#">Link</a>
            </li>
            <li className="mr-6">
                <a className="text-gray-200 hover:text-blue-500" href="#">Link</a>
            </li>
            <li className="mr-6">
                <a className="text-gray-400 cursor-not-allowed" href="#">Disabled</a>
            </li>
            </ul>
          </div>
        </div>
      </section>
</header>