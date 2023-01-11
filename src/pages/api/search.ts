import type { NextApiHandler } from 'next';
import { ChangelogService } from '../../services/changelog';

const searchHandler: NextApiHandler = async (req, res) => {
    const searchQuery : string | string[] = req.query.version;
    if (searchQuery) {
      const result = await ChangelogService.searchVersionAc(searchQuery);
      return res.send(result);
    }
    res.send([]);
}

export default searchHandler
