import type { NextApiHandler } from 'next'
import { ChangelogDatabase } from '../../services/changelogdb'

const versionHandler: NextApiHandler = async (req, res) => {
  const searchQuery : string = req.query.q as string
  const result = await ChangelogDatabase.searchVersionAc(searchQuery)

  return res.send(result)
}

export default versionHandler
