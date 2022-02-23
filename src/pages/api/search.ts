import type { NextApiHandler } from 'next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const searchHandler: NextApiHandler = async (request, response) => {
  function useGlobalItems() {
    return useSelector((state) => state, shallowEqual);
  }
  const dispatch = useDispatch();
  const items = useGlobalItems();

  console.log(items);
  //const { data: user } = useSWR('/api/user')
  //const { data: projects } = useSWR(() => '/api/projects?uid=' + user.id)
  const { q, start = 0 } = request.query;
  const results = []; //q ? changelogs.filter(changelog => changelog) : [];
  response.json({ results })
}

export default searchHandler
