import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function Search() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(null);

  useEffect(() => {
    const term = router.query.term;
    if (!term) return;
    setSearchTerm(term);
  });

  return <div><p>Searching for: {searchTerm}</p>
  </div>;
}

export default Search;
