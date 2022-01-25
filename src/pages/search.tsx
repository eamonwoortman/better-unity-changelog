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
    { searchTerm && <div className="py-7">Searching afor: {searchTerm}</div> }
  </div>;
}

export default Search;
