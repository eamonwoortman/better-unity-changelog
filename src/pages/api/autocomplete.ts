import type { NextApiHandler } from 'next'
import { ChangelogDatabase } from '../../services/changelogdb'

const autocompleteHandler: NextApiHandler = async (req, res) => {
  const searchQuery : string = req.query.version as string
  const result = await ChangelogDatabase.searchVersionAc(searchQuery)

  return res.send(result)
}

export default autocompleteHandler
