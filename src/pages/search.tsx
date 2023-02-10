import { XCircleIcon } from '@heroicons/react/outline';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { ChangelogRoot } from '../components/changelog/changelog.types';

// Const fetcher = (...args) => fetch([...args]).then(res => res.json());
const fetcher = async (url) => await axios.get(url).then((res) => res.data)

function useSearch(query) {
  const { data, error } = useSWR(`/api/search?query=${query}`, fetcher)

  return {
    user: data,
    isLoading: !error && !data,
    isError: error
  }
}

function Search() {
  const searchParams = useSearchParams();
  const [
    searchTerm,
    setSearchTerm
  ] = useState(null)
  const [
    results,
    setResults
  ] = useState<ChangelogRoot[]>([])
  const searchEndpoint = (query: string) => `/api/search?q=${query}`

  useEffect(() => {
    const queryTerm:string = searchParams.get('term') || ''

    setSearchTerm(queryTerm)

    if (queryTerm.length) {
      // Console.log('fetching: ', queryTerm);
      fetch(searchEndpoint(queryTerm)).
        then((res) => res.json()).
        then((res) => {
          // Console.log('res: ', results);
          setResults(res.results)
        })
    } else {
      setResults([])
    }
  }, [searchParams])

  return <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col">
      <h3 className="text-yellow-600">Todo</h3>
      <ul>
        <li className="flex flex-row items-center"><XCircleIcon className="h-[22px] pr-2"/>Create API endpoint for search</li>
        <li className="flex flex-row items-center"><XCircleIcon className="h-[22px] pr-2"/>Create pagination</li>
        <li className="flex flex-row items-center"><XCircleIcon className="h-[22px] pr-2"/>Call API endpoint (SWR?)</li>
        <li className="flex flex-row items-center"><XCircleIcon className="h-[22px] pr-2"/>Show paginated results</li>
        <li className="flex flex-row items-center"><XCircleIcon className="h-[22px] pr-2"/>SSR?</li>
      </ul>
    </div>
    { searchTerm && <div className="py-7"><h4>Search results for: {searchTerm}</h4></div> }
    { !searchTerm && <div className="py-7">
        <h4>No results found</h4>
        
      </div> }

  </div>;
}

export default Search
