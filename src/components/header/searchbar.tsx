import { SearchIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';

function Searchbar() {
    const router = useRouter();
    const searchInputRef = useRef(null);
    const search = (e) => {
        e.preventDefault();
        const term = searchInputRef.current.value;
        if (!term) return;
        searchInputRef.current.blur();
        router.push(`/search?term=${term}`);
    }
    useEffect(() => {
        const term = router.query.term;
        searchInputRef.current.value = term ? term : '';
    });
    return <div>
    <form onSubmit={search} className="flex justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="relative"> 
            <input type="text" ref={searchInputRef} className="h-12 w-96 pr-8 pl-5 z-0
                border rounded border-gray-700  
                bg-black text-gray-400 focus:text-gray-300 
                placeholder-gray-500
                focus:shadow focus:outline-none
                focus:border-blue-400 focus:border-opacity-75" 
                placeholder="Search anything..."/>
            <button type="submit" className="absolute top-3 right-3"> 
                <SearchIcon className="w-6 h-6"/>
             </button>
        </div>
    </form>
  </div>
  }
export default Searchbar;
