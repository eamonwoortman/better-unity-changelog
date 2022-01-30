import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function Search() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(null);

  useEffect(() => {
    const term = router.query.term;
    setSearchTerm(term);
  });

  return <div className="flex items-center justify-center">
    { searchTerm && <div className="py-7"><h4>Search results for: {searchTerm}</h4></div> }
    { !searchTerm && <div className="py-7">
        <h4>No results found</h4>
        
      </div> }
  </div>;
}

export default Search;
