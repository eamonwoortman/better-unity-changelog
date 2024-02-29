'use client'
import { SearchIcon, XIcon } from '@heroicons/react/solid'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

function Searchbar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [
    isEmpty,
    setIsEmpty
  ] = useState(true)
  const [
    query,
    setQuery
  ] = useState('')

  const clearSearch = (e) => {
    e.preventDefault()
    setQuery('')
    router.push('/search')
  }

  /* Set query from initial url input */
  useEffect(() => {
    const term = searchParams?.get('term')
    setQuery(term as string || '')
  }, [searchParams])

  /* Update isEmpty on query change */
  useEffect(() => {
    setIsEmpty(!query)
  }, [query])


  const handleOnSubmit = (event) => {
    event.preventDefault()
    const term = query

    if (!term) {
      return
    }
    searchInputRef.current?.blur()
    router.push(`/search?term=${term}`)
  }

  /* Update query on input change */
  const handleOnInputChange = useCallback((event) => {
    event.preventDefault()
    setQuery(event.target.value || '')
  }, [])

  return <div className="flex flex-grow justify-center">
      <form onSubmit={handleOnSubmit} className="flex flex-grow px-6 py-2 border border-gray-700 focus-within:border-blue-400 focus-within:border-opacity-75 
        rounded lg:max-w-3xl items-center">
        <input onChange={handleOnInputChange} ref={searchInputRef} value={query} className="flex-grow w-full focus:outline-none
        bg-black text-gray-400 focus:text-gray-300 
        placeholder-gray-500" type="text" placeholder="Search anything..."/>
          <XIcon className={`h-6 text-gray-500 cursor-pointer transition duration-100 transform hover:scale-125 ${isEmpty && "hidden"}`} onClick={clearSearch}/>
          <hr className={`hidden border-0 bg-gray-500 text-gray-500 w-px h-5 ml-2 mr-2 ${!isEmpty && "sm:inline-flex"}`}/>
          
          <button type="submit">
            <SearchIcon className="h-6 text-blue-800 hover:text-blue-600 hidden sm:inline-flex
              transition duration-100 transform hover:scale-125"/>
          </button>
      </form>
     </div>
}

export default Searchbar
