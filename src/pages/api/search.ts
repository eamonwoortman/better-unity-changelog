import type { NextApiHandler } from 'next';
import { ChangelogDatabase } from '../../services/changelogdb';

const searchHandler: NextApiHandler = async (req, res) => {
    const searchQuery : string | string[] = req.query.version;
    if (searchQuery) {
      const result = await ChangelogDatabase.searchVersionAc(searchQuery);
      return res.send(result);
    }
    res.send([]);
}

export default searchHandler
