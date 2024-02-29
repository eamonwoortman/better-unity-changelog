import { XCircleIcon } from '@heroicons/react/outline';
import searchChangelog from '../../lib/search';

type Props = {
  params?: {
    num?: string;
  };
  searchParams?: {
    term?: string;
  };
};

export default async function Page(props: Props) {
  const searchTerm = props.searchParams?.term ?? "";
  const results = await searchChangelog(searchTerm);

  return (<div className="flex flex-col items-center justify-center">
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
        
      </div> 
    }
    { results && results.length > 0 ? 
      <div>TEST</div> 
      : null 
    }

  </div>);
}
